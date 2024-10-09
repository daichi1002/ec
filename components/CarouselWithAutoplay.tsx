"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function CarouselWithAutoplay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      className="w-full md:w-2/3"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
