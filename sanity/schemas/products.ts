import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "reference",
      to: { type: "productType" },
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["S", "M", "L", "XL"],
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "details",
      title: "Product Details",
      type: "text",
    }),
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "text",
      // options: {
      //   inputMode: "textarea",
      // },
    }),
    defineField({
      name: "primaryImage",
      title: "Primary Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "additionalimages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured Product",
    }),
  ],
});
