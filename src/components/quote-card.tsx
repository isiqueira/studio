"use client";

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Quote } from '@/types';
import { Quote as QuoteIcon } from "lucide-react";
import Image from 'next/image';


interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="relative flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card hover:bg-accent border-border rounded-lg">
          <CardHeader className="p-0 relative h-40 overflow-hidden rounded-t-lg">
            <Image
              src={quote.imageUrl || 'https://placehold.co/400x200.png'}
              alt={quote.source}
              fill
              className="object-cover"
              data-ai-hint={quote.data_ai_hint || 'quote'}
            />
          </CardHeader>
          <Image
            src={quote.sourceImageUrl || 'https://placehold.co/80x80.png'}
            alt={quote.source}
            width={80}
            height={80}
            className="absolute top-40 left-5 transform -translate-y-1/2 border-4 border-card"
            data-ai-hint={quote.sourceImage_data_ai_hint || 'portrait person'}
          />
          <CardContent className="flex-grow p-6 pt-12">
            <QuoteIcon className="h-8 w-8 text-primary/30 mb-4" />
            <p className="text-lg font-body text-card-foreground">
              "{quote.text.length > 100 ? `${quote.text.substring(0, 100)}...` : quote.text}"
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm font-semibold text-card-foreground/70">- {quote.source}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader className="pt-6">
          <QuoteIcon className="h-8 w-8 text-primary/40 mb-4" />
          <DialogTitle className="text-2xl font-body leading-relaxed">"{quote.text}"</DialogTitle>
          <DialogDescription className="text-right text-lg pt-6 !mt-4">
            - {quote.source}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
