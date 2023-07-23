import { InferModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import {
  pgTable,
  varchar,
  integer,
  serial,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const cartTable = pgTable("hackathonone", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id").notNull(),
  product_id: varchar("product_id").notNull(),
  product_variant: varchar("product_variant").notNull(),
  product_qty: integer("product_qty").notNull(),
  product_title: text("product_title"),
  product_type: text("product_type"),
  product_price: integer("product_price").notNull(),
  product_image: text("product_image"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// export const cartTable = pgTable("cart", {
//   id: serial("id").primaryKey(),
//   user_id: varchar("user_id", { length: 255 }).notNull(),
//   product_id: varchar("product_id", { length: 255 }).notNull(),
//   quantity: integer("quantity").notNull(),
// });

export type Cart = InferModel<typeof cartTable>;
export type AddToCart = InferModel<typeof cartTable, "insert">;

export const db = drizzle(sql);
