import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import article from "./schemas/article";
import author from "./schemas/author";
import category from "./schemas/category";
import tag from "./schemas/tag";
import chart from "./schemas/chart";
import markdownBlock from "./schemas/markdownBlock";

export default defineConfig({
  name: "default",
  title: "DWS Portal CMS",

  projectId: "wqs3olp2",
  dataset: "production",

  plugins: [structureTool()],

  schema: {
    types: [article, author, category, tag, chart, markdownBlock],
  },
});
