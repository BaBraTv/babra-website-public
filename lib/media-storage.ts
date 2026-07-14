import { randomUUID } from "crypto";
import { getPrisma } from "./db";

export type MediaUploadInput = {
  folder: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  alt?: string | null;
  uploadedById?: string | null;
};

export type StorageProvider = {
  name: string;
  createUpload(input: MediaUploadInput): Promise<{ url: string; optimizedUrl?: string; storageKey: string }>;
};

const localProvider: StorageProvider = {
  name: "LOCAL",
  async createUpload(input) {
    const storageKey = `${input.folder}/${randomUUID()}-${input.fileName}`.replaceAll("\\", "/");
    return {
      url: `/uploads/${storageKey}`,
      optimizedUrl: `/uploads/${storageKey}`,
      storageKey
    };
  }
};

export function getStorageProvider(): StorageProvider {
  const provider = process.env.MEDIA_STORAGE_PROVIDER || "LOCAL";
  if (provider !== "LOCAL") {
    return {
      name: provider,
      async createUpload(input) {
        const storageKey = `${input.folder}/${randomUUID()}-${input.fileName}`.replaceAll("\\", "/");
        return {
          url: `${process.env.MEDIA_PUBLIC_BASE_URL ?? ""}/${storageKey}`.replace(/([^:]\/)\/+/g, "$1"),
          optimizedUrl: `${process.env.MEDIA_PUBLIC_BASE_URL ?? ""}/${storageKey}`.replace(/([^:]\/)\/+/g, "$1"),
          storageKey
        };
      }
    };
  }
  return localProvider;
}

export async function createMediaAsset(input: MediaUploadInput) {
  const provider = getStorageProvider();
  const upload = await provider.createUpload(input);
  return getPrisma().mediaAsset.create({
    data: {
      folder: input.folder,
      fileName: input.fileName,
      originalName: input.fileName,
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
      url: upload.url,
      optimizedUrl: upload.optimizedUrl,
      storageKey: upload.storageKey,
      alt: input.alt ?? null,
      provider: provider.name,
      uploadedById: input.uploadedById ?? null
    }
  });
}
