# Product images

Files here back the product visuals on the marketing site. Until a product has
an image, the site renders a drawn figure instead — nothing is ever presented
as a photograph of work that cannot be documented.

## Adding your own photographs

1. Drop the file in this folder, ideally 1600×1200 or larger, `.webp` or `.jpg`.
2. Open `src/lib/product-media.json` and set the product's `"file"` to the file
   name (for example `"file": "rigid-box.webp"`).
3. Check that `"alt"` still describes what the photograph actually shows.

That is the whole change: `next/image` handles resizing and format delivery.

## Generating images instead

`npm run generate:images` sends each product's prompt to fal.ai, saves the
result here, and updates the manifest for you. It needs `FAL_KEY` in the
environment or in `.env.local`, and network access to `queue.fal.run` and the
fal.ai media hosts.

    FAL_KEY=... npm run generate:images
    npm run generate:images -- --only rigid-box --force
    npm run generate:images -- --dry-run

Real photographs of your own work are always stronger than generated ones:
a buyer assessing material, print finish, and build quality can tell.
