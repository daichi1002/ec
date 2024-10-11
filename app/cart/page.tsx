// components/CartPage.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { loadStripe } from "@stripe/stripe-js";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const { toast } = useToast();
  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  const handleRemoveFromCart = (itemId: number, itemName: string) => {
    removeFromCart(itemId);
    toast({
      title: "商品がカートから削除されました",
      description: `${itemName} をカートから削除しました。`,
    });
  };

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    const stripe = await stripePromise;

    if (!stripe) {
      toast({
        title: "エラー",
        description: "Stripeの読み込みに失敗しました。",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId, lineItems } = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
        lineItems: lineItems,
      });

      if (result.error) {
        toast({
          title: "エラー",
          description: result.error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "エラー",
        description: "決済処理中にエラーが発生しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-xl font-bold mb-6">カートに入っている商品</h1>
      {cart.length === 0 ? (
        <div>
          <p>カートは空です。</p>
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            &larr; ショッピングに戻る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cart.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        数量: {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFromCart(item.id, item.name)}
                      className="ml-4"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <p className="text-lg font-semibold">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>注文サマリー</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-4">
                  合計: ¥{total.toLocaleString()}
                </p>
                <form onSubmit={handleCheckout}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full mt-6">
                    決済する
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:underline"
                >
                  &larr; ショッピングを続ける
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
