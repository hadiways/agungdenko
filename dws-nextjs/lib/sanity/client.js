import { createClient } from "@sanity/client";

// Strip quotes if they exist in the env value, and default to a valid format if empty
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const projectId = rawProjectId && rawProjectId.trim() !== "" && rawProjectId !== '""'
  ? rawProjectId.replace(/"/g, "")
  : "a1b2c3d4";

const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const dataset = rawDataset && rawDataset.trim() !== "" && rawDataset !== '""'
  ? rawDataset.replace(/"/g, "")
  : "production";

const rawApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const apiVersion = rawApiVersion && rawApiVersion.trim() !== "" && rawApiVersion !== '""'
  ? rawApiVersion.replace(/"/g, "")
  : "2026-07-06";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
