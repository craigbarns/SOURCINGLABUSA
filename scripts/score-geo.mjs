import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';

const benchmark = JSON.parse(await readFile('docs/geo/benchmark-prompts.json', 'utf8'));
const run = JSON.parse(await readFile(process.argv[2] || 'docs/geo/visibility-runs.json', 'utf8'));
assert.ok(Array.isArray(run.records), 'records must be an array');
const prompts = new Map(benchmark.prompts.map((prompt) => [prompt.id, prompt]));
const ids = new Set();
const platforms = new Map();
let unavailable = 0;
for (const record of run.records) {
  assert.ok(prompts.has(record.promptId), `Unknown prompt: ${record.promptId}`);
  assert.ok(benchmark.platforms.includes(record.platform), `Unknown platform: ${record.platform}`);
  assert.ok(record.sampleId && !ids.has(record.sampleId), 'Each observation needs a unique sampleId');
  ids.add(record.sampleId);
  assert.ok(['completed', 'unavailable'].includes(record.status), 'Invalid observation status');
  if (record.status === 'unavailable') { unavailable++; continue; }
  for (const key of ['brandMentioned', 'recommended']) assert.equal(typeof record[key], 'boolean', `${key} must be boolean`);
  assert.ok(record.evidence && record.observedAt && record.model && record.locale && typeof record.context === 'string', 'Completed tests need evidence, date, model, locale and context');
  assert.ok(Array.isArray(record.citedUrls) && Array.isArray(record.competitors), 'List cited URLs and competitors, including empty lists');
  const citationHosts = record.citedUrls.map((value) => {
    const url = new URL(value);
    assert.ok(['https:', 'http:'].includes(url.protocol), 'Citations must use HTTP(S) URLs');
    return url.hostname;
  });
  const cited = citationHosts.some((host) => ['sourcinglabusa.com', 'www.sourcinglabusa.com'].includes(host));
  assert.ok(!record.recommended || record.brandMentioned, 'A recommendation requires a brand mention');
  const value = 30 * Number(record.brandMentioned) + 50 * Number(cited) + 20 * Number(record.recommended);
  if (!platforms.has(record.platform)) platforms.set(record.platform, new Map());
  const samples = platforms.get(record.platform);
  if (!samples.has(record.promptId)) samples.set(record.promptId, []);
  samples.get(record.promptId).push(value);
}

// Average repeats per prompt first so frequently tested prompts cannot dominate.
const totalWeight = benchmark.prompts.reduce((sum, p) => sum + p.relevanceWeight, 0);
const byPlatform = benchmark.platforms.map((platform) => {
  const samples = platforms.get(platform) || new Map();
  let weighted = 0;
  let testedWeight = 0;
  for (const [id, values] of samples) {
    const weight = prompts.get(id).relevanceWeight;
    weighted += values.reduce((sum, value) => sum + value, 0) / values.length * weight;
    testedWeight += weight;
  }
  return { platform, testedPrompts: samples.size, totalPrompts: prompts.size, weightedCoveragePercent: Math.round(testedWeight / totalWeight * 1000) / 10, visibilityScore: testedWeight ? Math.round(weighted / testedWeight * 10) / 10 : null };
});
const measured = byPlatform.filter((p) => p.visibilityScore !== null);
const result = {
  runId: run.runId,
  status: measured.length ? 'measured_subset' : 'unmeasured',
  formula: '30 points brand mentioned + 50 points own-domain URL cited + 20 points recommended in relevant context; average repetitions per prompt, then relevance-weight prompts; average available platforms equally.',
  visibilityScore: measured.length ? Math.round(measured.reduce((sum, p) => sum + p.visibilityScore, 0) / measured.length * 10) / 10 : null,
  unavailableObservations: unavailable,
  note: 'Unmeasured platforms and prompts are excluded, not scored as zero. Always report coverage. This empirical score is distinct from editorial readiness scores.',
  byPlatform,
};
if (process.argv[3]) await writeFile(process.argv[3], JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
