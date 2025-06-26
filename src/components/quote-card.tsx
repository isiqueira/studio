
"use client";

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Quotation } from '@/types';
import { CalendarDays } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

interface QuoteCardProps {
  quotation: Quotation;
  index: number;
}

export default function QuoteCard({ quotation, index }: QuoteCardProps) {
  const { quote } = quotation;

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: quote.converted_currency,
  }).format(quote.converted_value);

  return (
    <Link href={`/quote/${quote.id}`} className="block">
      <Card className="relative flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card hover:bg-accent border-2 border-border hover:border-[#0B0F3A] rounded-lg">
        <CardHeader className="p-0 relative h-40 overflow-hidden rounded-t-lg">
          <Image
            src={quote.imageHeader || "https://placehold.co/600x400.png"}
            alt={quote.officeCount}
            fill
            className="object-cover"
            data-ai-hint={'office document'}
          />
          <div className="absolute bottom-2 right-2 bg-card/80 text-card-foreground px-2 py-1 rounded-md text-sm font-semibold">
            Opção {index + 1}
          </div>
        </CardHeader>
        <div className="absolute top-40 left-5 flex items-center gap-4">
          <div className="bg-card border-4 border-card flex items-center justify-center overflow-hidden">
            <Image
              src={quote.logo || 'https://placehold.co/60x60.png'}
              alt="Quotation Logo"
              width={60}
              height={60}
              data-ai-hint="company logo"
            />
          </div>
          <h3 className="text-2xl font-bold text-card-foreground">{quote.officeCount}</h3>
        </div>
        <CardContent className="flex-grow p-6 pt-24">
           <p className="text-lg font-body text-foreground mt-2">
              {formattedValue}
            </p>
        </CardContent>
        <CardFooter>
          <p className="text-sm font-semibold text-card-foreground/70 flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Due: {new Date(quote.dueDate).toLocaleDateString('pt-br', { timeZone: 'UTC' })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
