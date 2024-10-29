import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { items, customer } = await request.json();

    // Retrieve items from the database
    const lineItems = await Promise.all(
      items.map(async (item: { id: number; quantity: number }) => {
        const product = await prisma.products.findUnique({
          where: { id: item.id },
        });

        return {
          price_data: {
            currency: "jpy",
            product_data: {
              name: product!.name,
            },
            unit_amount: product!.price,
          },
          quantity: item.quantity,
        };
      })
    );

    const totalAmount = lineItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get(
        "origin"
      )}/order-complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/cart`,
      customer_email: customer.email,
      locale: "ja",
    });
    // Create pending order in database
    // await prisma.orders.create({
    //   data: {
    //     status: "PENDING",
    //     totalAmount,
    //     orderItems: {
    //       create: items.map((item: { id: number; quantity: number }) => ({
    //         productId: item.id,
    //         quantity: item.quantity,
    //       })),
    //     },
    //   },
    // });

    // TODO
    // 注文確認メール: 決済成功後に、ユーザーに注文確認メールを送信する機能を追加するのも良いでしょう。
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
