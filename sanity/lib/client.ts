import { createClient } from "next-sanity";

// import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion: "2023-06-23",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_ACCESS_TOKEN,
});
