import { shoppingItem } from "@/store/slice/cartSlice";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  // console.log(body);
  try {
    if (body.length > 0) {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     price: "{{PRICE_ID}}",
        //     quantity: 1,
        //   },
        // ],
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
      // res.redirect(303, session.url);
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);

    return NextResponse.json(err.message);
    // res.status(err.statusCode || 500).json(err.message);
  }
}
