import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getProduct(id: number) {
  const product = await prisma.products.findUnique({
    where: { id: id },
  });
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const product = await getProduct(id);

  if (!product) {
    return <div>商品が見つかりません。</div>;
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <Link href="/" className="text-primary hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <img
                  src={img}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-[500px] object-cover rounded-lg"
                  style={{ aspectRatio: "1200/500", objectFit: "cover" }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-medium text-primary mb-4">
            ¥{product.price}
          </p>
          <p className="mb-3 text-sm">
            ※こちらの価格には消費税と送料が含まれています。
          </p>
          <p className="mb-6 text-sm">
            ※当店は複数のオンラインショップと共有在庫となりますため、ご購入いただいたアイテムでも在庫の確保が出来ない場合がございます。その場合はキャンセル処理をさせていただきます。ご了承の上ご注文いただきますようお願い申し上げます。
          </p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">商品詳細</h2>
            {product.detail?.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="font-medium">
              数量:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              defaultValue={1}
              className="border rounded px-2 py-1 w-16 text-center"
            />
          </div>
          <Button className="w-full bg-custom-beige text-black font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-custom-beige-dark focus:outline-none focus:ring-2 focus:ring-custom-beige focus:ring-opacity-50">
            カートに追加
          </Button>
        </div>
      </div>
    </div>
  );
}
