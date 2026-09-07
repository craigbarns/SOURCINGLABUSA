#!/usr/bin/env node
/**
 * Generates the product visuals through fal.ai and wires them into the site.
 *
 * For every product in src/lib/product-media.json that has no image yet, this
 * submits the product's prompt, waits for the result, saves the file under
 * public/products/, and records the file name back in the manifest. The site
 * then renders the image instead of the drawn figure — no code change needed.
 *
 *   FAL_KEY=... npm run generate:images
 *   npm run generate:images -- --only rigid-box --force
 *
 * The key is read from the environment or from .env.local. Never commit it:
 * .env.* is git-ignored.
 */

import { createWriteStream } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(projectRoot, 'src/lib/product-media.json');
const outputDir = path.join(projectRoot, 'public/products');

const DEFAULT_MODEL = 'fal-ai/flux/dev';
// Override to point at a fal.ai proxy, or at a stub when testing the pipeline.
const QUEUE_BASE = (process.env.FAL_QUEUE_BASE || 'https://queue.fal.run').replace(/\/$/, '');
const POLL_INTERVAL_MS = 3_000;
const POLL_TIMEOUT_MS = 5 * 60 * 1_000;

const EXTENSION_BY_TYPE = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function parseArgs(argv) {
  const args = { only: null, force: false, dryRun: false };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--force') args.force = true;
    else if (value === '--dry-run') args.dryRun = true;
    else if (value === '--only') args.only = argv[++index] ?? null;
    else if (value.startsWith('--only=')) args.only = value.slice('--only='.length);
  }

  return args;
}

/** Reads FAL_KEY from the environment, falling back to .env.local. */
async function readFalKey() {
  if (process.env.FAL_KEY?.trim()) {
    return process.env.FAL_KEY.trim();
  }

  for (const file of ['.env.local', '.env']) {
    try {
      const contents = await readFile(path.join(projectRoot, file), 'utf8');
      const match = contents.match(/^\s*FAL_KEY\s*=\s*(.+)\s*$/m);

      if (match) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    } catch {
      // The file is optional.
    }
  }

  return null;
}

async function falRequest(url, key, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Key ${key}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(
      `fal.ai responded ${response.status} for ${new URL(url).pathname}` +
        (detail ? `: ${detail.slice(0, 400)}` : ''),
    );
  }

  return response.json();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateImage({ key, model, prompt }) {
  const submission = await falRequest(`${QUEUE_BASE}/${model}`, key, {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_4_3',
      num_images: 1,
      enable_safety_checker: true,
    }),
  });

  const statusUrl = submission.status_url;
  const responseUrl = submission.response_url;

  if (!statusUrl || !responseUrl) {
    throw new Error('fal.ai did not return a queue status URL.');
  }

  const deadline = Date.now() + POLL_TIMEOUT_MS;

  for (;;) {
    if (Date.now() > deadline) {
      throw new Error('Timed out waiting for fal.ai to finish the image.');
    }

    await sleep(POLL_INTERVAL_MS);
    const status = await falRequest(statusUrl, key);

    if (status.status === 'COMPLETED') break;

    if (status.status && !['IN_QUEUE', 'IN_PROGRESS'].includes(status.status)) {
      throw new Error(`fal.ai reported status ${status.status}.`);
    }
  }

  const result = await falRequest(responseUrl, key);
  const image = result.images?.[0];

  if (!image?.url) {
    throw new Error('fal.ai returned no image URL.');
  }

  return image;
}

async function downloadImage(image, destinationBase) {
  const response = await fetch(image.url);

  if (!response.ok || !response.body) {
    throw new Error(`Could not download the generated image (${response.status}).`);
  }

  const contentType =
    image.content_type ?? response.headers.get('content-type') ?? 'image/jpeg';
  const extension = EXTENSION_BY_TYPE[contentType.split(';')[0].trim()] ?? 'jpg';
  const fileName = `${destinationBase}.${extension}`;

  await pipeline(
    Readable.fromWeb(response.body),
    createWriteStream(path.join(outputDir, fileName)),
  );

  return fileName;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const model = process.env.FAL_IMAGE_MODEL?.trim() || DEFAULT_MODEL;

  const targets = manifest.products.filter((product) => {
    if (args.only && product.id !== args.only) return false;
    return args.force || !product.file;
  });

  if (targets.length === 0) {
    console.log('Nothing to generate. Use --force to regenerate existing images.');
    return;
  }

  console.log(`Model: ${model}`);
  console.log(`Products to generate: ${targets.map((p) => p.id).join(', ')}\n`);

  if (args.dryRun) {
    for (const product of targets) {
      console.log(`── ${product.id}\n${product.prompt}\n`);
    }
    return;
  }

  const key = await readFalKey();

  if (!key) {
    console.error(
      'No FAL_KEY found. Set it in the environment or add FAL_KEY=... to .env.local.',
    );
    process.exitCode = 1;
    return;
  }

  await mkdir(outputDir, { recursive: true });

  let generated = 0;

  for (const product of targets) {
    process.stdout.write(`${product.id} … `);

    try {
      const image = await generateImage({ key, model, prompt: product.prompt });
      const fileName = await downloadImage(image, product.id);
      product.file = fileName;
      generated += 1;
      console.log(`saved public/products/${fileName}`);
    } catch (error) {
      console.log(`failed — ${error.message}`);
    }
  }

  if (generated > 0) {
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    console.log(`\nManifest updated. ${generated} image(s) are now live on the site.`);
    console.log('Review them, then commit public/products/ and the manifest.');
  } else {
    console.log('\nNo image was generated, so the manifest is unchanged.');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
