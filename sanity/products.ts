export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "productType",
      title: "Product Type",
      type: "reference",
      to: { type: "productType" },
    },
    {
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["S", "M", "L", "XL"],
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Product Details",
      type: "text",
    },
    {
      name: "careInstructions",
      title: "Care Instructions",
      type: "text",
      options: {
        inputMode: "textarea",
      },
    },
    {
      name: "primaryImage",
      title: "Primary Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "additionalimages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
