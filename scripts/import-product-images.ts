import path from "node:path";

import {
  loadEnvConfig,
} from "@next/env";

loadEnvConfig(
  process.cwd(),
);

async function main(): Promise<void> {
  /*
   * Import this only after .env.local has been loaded,
   * because the media service imports supabaseAdmin.
   */
  const {
    ProductImageImporter,
  } = await import(
    "@/knowledge/media/ProductImageImporter"
  );

  const directory =
    path.resolve(
      process.cwd(),
      "media-import",
    );

  const importer =
    new ProductImageImporter();

  console.log(
    `Importing product images from ${directory}`,
  );

  await importer.importDirectory(
    directory,
  );

  console.log(
    "Product image import complete.",
  );
}

main().catch(
  (error: unknown) => {
    console.error(
      "Product image import failed:",
      error,
    );

    process.exitCode = 1;
  },
);