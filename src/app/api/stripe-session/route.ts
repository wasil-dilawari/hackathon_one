import { shoppingItem } from "@/store/slice/cartSlice";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    if (body.length > 0) {
      /* Checkout Sessions from body params. */
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1NUaipJgJ9qlh0JBEcvRuC4x" },
          { shipping_rate: "shr_1NUahvJgJ9qlh0JBmvpBt4EU" },
        ],
        line_items: body.map((item: shoppingItem) => {
          return {
            price_data: {
              currency: "USD",
              product_data: {
                name: `${item.productTitle} [Size:(${item.productVariant})]`,
                images: [item.productImage],
              },
              unit_amount: item.productPrice * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
            quantity: item.productQty,
          };
        }),
        success_url: `${req.headers.get("origin")}/success`,
        cancel_url: `${req.headers.get("origin")}/cart`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);

    return NextResponse.json(err.message);
  }
}
