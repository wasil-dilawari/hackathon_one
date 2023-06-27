import { type SchemaTypeDefinition } from "sanity";
import products from "./schemas/products";
import productType from "./schemas/productType";
import category from "./schemas/category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, productType, category],
};
