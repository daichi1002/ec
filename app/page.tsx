"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-[#f5f5dc] border-b">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-2 text-2xl font-bold"
            prefetch={false}
          >
            <img src="/dog.png" alt="Logo" className="w-8 h-8" />
            ロンとハニ
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary" prefetch={false}>
              <SearchIcon className="w-6 h-6" />
              <span className="sr-only">Search</span>
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="sr-only">Cart</span>
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              <UserIcon className="w-6 h-6" />
              <span className="sr-only">Account</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-center items-center lg:gap-24">
          <Carousel
            className="w-full md:w-2/3"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <img
                  src="/book.JPG"
                  alt="Product 1"
                  width="1200"
                  height="500"
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                  style={{ aspectRatio: "1200/500", objectFit: "cover" }}
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/lunch_box1.JPG"
                  alt="Product 2"
                  width="1200"
                  height="500"
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                  style={{ aspectRatio: "1200/500", objectFit: "cover" }}
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/lunch_box2.JPG"
                  alt="Product 3"
                  width="1200"
                  height="500"
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                  style={{ aspectRatio: "1200/500", objectFit: "cover" }}
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="/lunch_box3.JPG"
                  alt="Product 4"
                  width="1200"
                  height="500"
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
                  style={{ aspectRatio: "1200/500", objectFit: "cover" }}
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
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
          <div className="bg-card rounded-lg overflow-hidden shadow-lg group">
            <Link href="#" prefetch={false}>
              <img
                src="/book.JPG"
                alt="Product 1"
                width="300"
                height="300"
                className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"
                style={{ aspectRatio: "300/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  アイネクライネナハドムジーク・大人は泣かないと思っていた
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">¥650</span>
                  <Button size="sm" variant="outline">
                    カートに追加
                  </Button>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-card rounded-lg overflow-hidden shadow-lg group">
            <Link href="#" prefetch={false}>
              <img
                src="/lunch_box1.JPG"
                alt="Product 2"
                width="300"
                height="300"
                className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"
                style={{ aspectRatio: "300/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">お弁当袋 Lサイズ</h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">¥700</span>
                  <Button size="sm" variant="outline">
                    カートに追加
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
      <footer className="bg-[#f5f5dc] py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 Handmade Treasures. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Contact
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
