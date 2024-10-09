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
import { Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// カート内の商品の型定義
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // カートの内容を取得（実際にはローカルストレージやAPIから取得します）
  useEffect(() => {
    // ダミーデータを使用
    const dummyCartItems: CartItem[] = [
      {
        id: 1,
        name: "商品A",
        price: 1000,
        quantity: 2,
        image: "/api/placeholder/100/100",
      },
      {
        id: 2,
        name: "商品B",
        price: 1500,
        quantity: 1,
        image: "/api/placeholder/100/100",
      },
    ];
    setCartItems(dummyCartItems);
  }, []);

  // 合計金額を計算
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  // 数量を更新
  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // 商品を削除
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // 決済処理（ダミー）
  const handleCheckout = (event: React.FormEvent) => {
    event.preventDefault();
    alert("決済処理が完了しました！（デモ用）");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-xl font-bold mb-6">カートに入っている商品</h1>
      {cartItems.length === 0 ? (
        <p>カートは空です。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
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
                      <p className="text-sm text-gray-600">
                        ¥{item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2">
                        <Label htmlFor={`quantity-${item.id}`} className="mr-2">
                          数量:
                        </Label>
                        <Input
                          type="number"
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          min="1"
                          className="w-20"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
                      <Label htmlFor="name">お名前</Label>
                      <Input id="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="address">住所</Label>
                      <Input id="address" required />
                    </div>
                    <div>
                      <Label htmlFor="card">クレジットカード番号</Label>
                      <Input id="card" required />
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
