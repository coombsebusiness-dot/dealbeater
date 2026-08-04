import {
  readdir,
  stat,
} from "node:fs/promises";

import path from "node:path";

import {
  defaultProductBrain,
} from "@/knowledge/products/defaultProductBrain";

import {
  media,
} from "./ProductMediaRegistry";

const SUPPORTED_IMAGE_EXTENSIONS =
  new Set([
    ".avif",
    ".jpeg",
    ".jpg",
    ".png",
    ".webp",
  ]);

function createSlugFromFilePath(
  filePath: string,
): string {
  return path
    .basename(
      filePath,
      path.extname(
        filePath,
      ),
    )
    .trim()
    .toLowerCase();
}

function isSupportedImage(
  filePath: string,
): boolean {
  return SUPPORTED_IMAGE_EXTENSIONS.has(
    path
      .extname(
        filePath,
      )
      .toLowerCase(),
  );
}

export class ProductImageImporter {
  async importDirectory(
    directory: string,
  ): Promise<void> {
    const entries =
      await readdir(
        directory,
        {
          withFileTypes:
            true,
        },
      );

    for (const entry of entries) {
      const entryPath =
        path.join(
          directory,
          entry.name,
        );

      if (entry.isDirectory()) {
        await this.importDirectory(
          entryPath,
        );

        continue;
      }

      if (
        !entry.isFile() ||
        !isSupportedImage(
          entryPath,
        )
      ) {
        continue;
      }

      await this.importFile(
        entryPath,
      );
    }
  }

  async importFile(
    filePath: string,
  ): Promise<void> {
    const fileStats =
      await stat(
        filePath,
      );

    if (!fileStats.isFile()) {
      throw new Error(
        `"${filePath}" is not a file.`,
      );
    }

    if (
      !isSupportedImage(
        filePath,
      )
    ) {
      throw new Error(
        `Unsupported image file: "${filePath}".`,
      );
    }

    const slug =
      createSlugFromFilePath(
        filePath,
      );

    const product =
      defaultProductBrain
        .findKnowledge(
          slug,
        );

    if (!product) {
      console.warn(
        `Unknown canonical product: ${slug}`,
      );

      return;
    }

    console.log(
      `Importing ${product.fullName}`,
    );

    const image =
      await media.upload({
        productId:
          product.id,

        filePath,

        type:
          "HERO",

        alt:
          `${product.fullName} product image`,

        isPrimary:
          true,

        sortOrder:
          0,
      });

    console.log(
      `Imported ${product.fullName}: ${image.publicUrl}`,
    );
  }
}