import { defineType, defineField } from "sanity";

export default defineType({
  name: "productType",
  title: "Product Type",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});
