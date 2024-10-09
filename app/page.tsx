import CarouselWithAutoplay from "@/components/CarouselWithAutoplay";
import { CarouselItem } from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getProducts() {
  const products = await prisma.products.findMany();
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-center items-center lg:gap-24">
          <CarouselWithAutoplay>
            {products.flatMap((product) =>
              product.images.map((img, index) => (
                <CarouselItem key={`${product.id}-${index}`}>
                  <img
                    src={img}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-[500px] object-cover rounded-lg"
                    style={{ aspectRatio: "1200/500", objectFit: "cover" }}
                  />
                </CarouselItem>
              ))
            )}
          </CarouselWithAutoplay>
          <div className="w-full md:w-1/3 my-12">
            <div className="p-6 border-4 border-double border-primary bg-muted/20 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                趣味で小物を作っています。 本も好きで出品しています。
                <br />
                商品の説明（素材など）が必要な方はお問い合わせください。
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center my-12">
          <h2 className="text-4xl font-bold">ITEM</h2>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg overflow-hidden shadow-lg group"
            >
              <Link href={`/products/${product.id}`} prefetch={false}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  width="300"
                  height="300"
                  className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">
                      ¥ {product.price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
