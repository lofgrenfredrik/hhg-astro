import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

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
      folder: "Events/Test", // The folder in Cloudinary
    }),
  }),
};
