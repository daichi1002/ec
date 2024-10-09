"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart(); // useCartからカートの状態を取得
  const { toast } = useToast();
  const [isInCart, setIsInCart] = useState(false); // 商品がカートに追加されているかのフラグ

  // カート内にすでに商品が追加されているかチェック
  useEffect(() => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setIsInCart(true);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
      });
      toast({
        title: "商品がカートに追加されました",
        description: `${product.name} が ${quantity} 個カートに追加されました。`,
      });
      setIsInCart(true); // 商品が追加されたらフラグをtrueに設定
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="quantity" className="font-medium">
          数量:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16 text-center"
          disabled
        />
      </div>
      <Button
        className="w-full bg-custom-beige text-black font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-custom-beige-dark focus:outline-none focus:ring-2 focus:ring-custom-beige focus:ring-opacity-50"
        onClick={handleAddToCart}
        disabled={isInCart} // カートにすでに商品がある場合は無効化
      >
        {isInCart ? "カートに追加済み" : "カートに追加"}
      </Button>
    </>
  );
}
