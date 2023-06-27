import { type SchemaTypeDefinition } from "sanity";
import products from "./products";
import productType from "./productType";
import category from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, productType, category],
};
