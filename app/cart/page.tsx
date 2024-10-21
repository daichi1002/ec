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
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  name: z.string().min(2, { message: "名前は2文字以上で入力してください。" }),
  prefectures: z.string().min(2, { message: "都道府県を入力してください。" }),
  address: z
    .string()
    .min(5, { message: "住所は5文字以上で入力してください。" }),
  city: z.string().min(2, { message: "市区町村を入力してください。" }),
  postalCode: z
    .string()
    .regex(/^\d{3}-?\d{4}$/, { message: "正しい郵便番号を入力してください。" }),
  phoneNumber: z.string().min(2, { message: "電話番号を入力してください。" }),
});

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const { toast } = useToast();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      prefectures: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
  });

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

  const handleCheckout = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      toast({
        title: "エラー",
        description: "Stripeの読み込みに失敗しました。",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
          customer: {
            email: values.email,
            name: values.name,
            address: {
              line1: values.address,
              city: values.city,
              postal_code: values.postalCode,
              country: "JP",
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
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
    } finally {
      setIsLoading(false);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <p className="text-lg font-semibold mt-2">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFromCart(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>支払い金額</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-4">
                  合計: ¥{total.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>お届け先情報</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(handleCheckout)}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="name">お名前</Label>
                      <Input id="name" type="text" {...form.register("name")} />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">郵便番号</Label>
                      <Input
                        id="postalCode"
                        type="text"
                        {...form.register("postalCode")}
                      />
                      {form.formState.errors.postalCode && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.postalCode.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="prefectures">都道府県</Label>
                      <Input
                        id="prefectures"
                        type="text"
                        {...form.register("prefectures")}
                      />
                      {form.formState.errors.prefectures && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.prefectures.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">市区町村</Label>
                      <Input id="city" type="text" {...form.register("city")} />
                      {form.formState.errors.city && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address">番地・建物名・部屋番号</Label>
                      <Input
                        id="address"
                        type="text"
                        {...form.register("address")}
                      />
                      {form.formState.errors.address && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.address.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">電話番号</Label>
                      <Input
                        id="phoneNumber"
                        type="text"
                        {...form.register("phoneNumber")}
                      />
                      {form.formState.errors.phoneNumber && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? "処理中..." : "支払い情報の入力"}
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
