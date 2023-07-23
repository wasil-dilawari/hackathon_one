import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import { v4 } from "uuid";
import { cookies } from "next/headers";
import { sql, eq, and } from "drizzle-orm";

export async function GET() {
  // const uid = v4();
  // const setCookies = cookies();
  // const user_id = cookies().get("user_id");
  let user_id = cookies().get("user_id")?.value as string;

  if (!user_id) {
    user_id = "";
  } else {
    try {
      const res = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, user_id))
        .orderBy(sql`${cartTable.id} asc`);
      return NextResponse.json(res);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Something went wrong!" });
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const uid = v4();
  const setCookies = cookies();
  const user_id = cookies().get("user_id");

  if (!user_id) {
    setCookies.set("user_id", uid);
  }
  try {
    const createdAt = new Date();

    const res = await db
      .insert(cartTable)
      .values({
        user_id: cookies().get("user_id")?.value as string,
        product_id: body.product_id,
        product_variant: body.product_variant,
        product_qty: body.product_qty,
        product_title: body.product_title,
        product_type: body.product_type,
        product_price: body.product_price,
        product_image: body.product_image,
        createdAt: createdAt,
      })
      .returning();
    return NextResponse.json({ res });
  } catch (error) {}
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  try {
    const { product_id, product_variant, product_qty } = body;
    const user_id = cookies().get("user_id")?.value as string;

    const updatedItem = await db
      .update(cartTable)
      .set({
        product_qty: product_qty,
      })
      .where(
        and(
          eq(cartTable.user_id, user_id),
          eq(cartTable.product_id, product_id),
          eq(cartTable.product_variant, product_variant)
        )
      )
      .returning();

    return NextResponse.json({ updatedItem });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    const { product_id, product_variant } = body;
    const user_id = cookies().get("user_id")?.value as string;

    if (product_id === "xxxxdeleteallproductsforthisuserxxxx") {
      const deletedItem = await db
        .delete(cartTable)
        .where(eq(cartTable.user_id, user_id))
        .returning();
      return NextResponse.json({ deletedItem });
    } else {
      const deletedItem = await db
        .delete(cartTable)
        .where(
          and(
            eq(cartTable.user_id, user_id),
            eq(cartTable.product_id, product_id),
            eq(cartTable.product_variant, product_variant)
          )
        )
        .returning();
      return NextResponse.json({ deletedItem });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong!" });
  }
}
