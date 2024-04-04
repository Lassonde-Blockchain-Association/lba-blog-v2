import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import projectStructure from "./sanity/projectStructure";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
  projectId: "gkx9isc7",

  dataset: "production",

  title: "LBA Blog",

  apiVersion: "2023-05-25",

  basePath: "/admin",

  plugins: [
    deskTool({
      structure: projectStructure,
    }),
    visionTool(),
  ],

  schema: { types: schemas },
});

export default config;
