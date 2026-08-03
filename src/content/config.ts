import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { existsSync, readFileSync } from "node:fs";

const requiredCloudinaryEnv = [
  "PUBLIC_CLOUDINARY_CLOUD_NAME",
  "PUBLIC_CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
] as const;

function readDotEnvValue(key: string): string | undefined {
  if (!existsSync(".env")) {
    return undefined;
  }

  const lines = readFileSync(".env", "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) {
      continue;
    }

    const [, foundKey, rawValue] = match;
    if (foundKey !== key) {
      continue;
    }

    const unquoted = rawValue.replace(/^['"]|['"]$/g, "").trim();
    return unquoted;
  }

  return undefined;
}

function getCloudinaryEnvValue(key: (typeof requiredCloudinaryEnv)[number]): string | undefined {
  return process.env[key] ?? readDotEnvValue(key);
}

const invalidCloudinaryEnv = requiredCloudinaryEnv.filter((key) => {
  const value = getCloudinaryEnvValue(key);
  return !value || value.trim() === "" || value.includes("YOUR_");
});

if (invalidCloudinaryEnv.length > 0) {
  throw new Error(
    `Cloudinary configuration is missing or uses placeholder values. Set these environment variables in .env: ${invalidCloudinaryEnv.join(", ")}`,
  );
}

export const collections = {
  partners: defineCollection({
    loader: cldAssetsLoader({
      folder: "Partners", // The folder in Cloudinary
    }),
  }),
  event1: defineCollection({
    loader: cldAssetsLoader({
      folder: "Events/Test2", // The folder in Cloudinary
    }),
  }),
  event2: defineCollection({
    loader: cldAssetsLoader({
      folder: "Events/Test1", // The folder in Cloudinary
    }),
  }),
  event3: defineCollection({
    loader: cldAssetsLoader({
      folder: "Events/Test3", // The folder in Cloudinary
    }),
  }),
};
