
"use client";

import type { Quotation } from '@/types';
import QuoteCard from './quote-card';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from './ui/skeleton';

interface QuoteGalleryProps {
  quotations: Quotation[];
}

const QuoteGallerySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <Skeleton key={i} className="h-[550px] w-full rounded-lg" />
    ))}
  </div>
);

export default function QuoteGallery({ quotations }: QuoteGalleryProps) {
  const isMobile = useIsMobile();
  
  if (quotations.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-headline">No quotations yet.</h2>
        <p className="text-muted-foreground mt-2">There are no quotations to display.</p>
      </div>
    )
  }

  if (isMobile === undefined) {
    return <QuoteGallerySkeleton />;
  }
  
  if (isMobile) {
    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-sm mx-auto"
      >
        <CarouselContent>
          {quotations.map((quotation, index) => (
            <CarouselItem key={quotation.quotationId}>
              <div className="p-1">
                <QuoteCard quotation={quotation} index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotations.map((quotation, index) => (
        <QuoteCard key={quotation.quotationId} quotation={quotation} index={index} />
      ))}
    </div>
  );
}
