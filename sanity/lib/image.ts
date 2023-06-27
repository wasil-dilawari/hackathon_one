import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

// import { dataset, projectId } from '../env'

// const imageBuilder = createImageUrlBuilder({
//   projectId: projectId || '',
//   dataset: dataset || '',
// })

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: Image) => {
  // return imageBuilder?.image(source).auto("format").fit("max");
  return imageBuilder?.image(source);
};
