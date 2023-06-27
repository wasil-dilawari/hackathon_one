export const product = {
  name: "products",
  type: "document",
  title: "Products",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Product Title",
    },
    {
      name: "detail",
      type: "text",
      title: "Product Detail",
    },
    {
      name: "care",
      type: "text",
      title: "Product Care",
    },
    {
      name: "category",
      type: "string",
      title: "Product Category",
    },
    {
      name: "sub_category",
      type: "string",
      title: "Sub-Catoegory",
    },
    {
      name: "price",
      type: "number",
      title: "Product Price",
    },
    {
      name: "image",
      type: "image",
      title: "Primary Image",
    },

    {
      name: "add_images",
      title: "Additional Images",
      type: "array",
      of: [
        {
          name: "add_img",
          title: "Image",
          type: "image",
        },
      ],
    },
  ],
};
