// src/app/success/page.tsx
"use client";

import { LoadingSpinner } from "@/components/layouts/Loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { AlertTriangle, Check, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderCompleteDetail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  //   const totalPrice = cart.reduce(
  //     (sum, item) => sum + item.price * item.quantity,
  //     0
  //   );

  useEffect(() => {
    if (sessionId) {
      // ここで必要に応じてバックエンドAPIを呼び出し、注文の詳細を取得したり
      // データベースを更新したりします。
      // この例では、単純にステータスを'success'に設定しています。
      clearCart();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, [sessionId]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const isSuccess = status === "success";

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {isSuccess ? (
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}
            {isSuccess ? "ご注文ありがとうございます！" : "決済に失敗しました"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <>
              <p className="text-center text-gray-600 mb-4">
                ご注文の確認メールを送信しました。
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">注文番号: #{123}</h3>
                <p className="text-sm text-gray-600">
                  注文日: {new Date().toISOString()}
                </p>
              </div>
              {/* <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-2">注文内容</h3>
                <ul className="space-y-2">
                  {cart?.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>¥{item.price.toLocaleString()}</span>
                    </li>
                  ))}
                  <li className="flex justify-between font-semibold">
                    <span>合計</span>
                    <span>¥{totalPrice?.toLocaleString()}</span>
                  </li>
                </ul>
              </div> */}
            </>
          ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>
                {"決済処理中にエラーが発生しました。もう一度お試しください。"}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {isSuccess ? (
            <Link href="/" className="text-sm text-gray-600 hover:underline">
              &larr; ショッピングに戻る
            </Link>
          ) : (
            <Button className="w-full" variant="outline">
              <RefreshCcw className="mr-2 h-4 w-4" /> 決済をやり直す
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
