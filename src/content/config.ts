import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

export const collections = {
  partners: defineCollection({
    loader: cldAssetsLoader({
      folder: "Partners", // The folder in Cloudinary
    }),
  }),
};
