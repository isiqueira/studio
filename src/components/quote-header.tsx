"use client";

import type { Quote } from '@/types';
import AddQuoteDialog from './add-quote-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface QuoteHeaderProps {
  addQuote: (quote: Omit<Quote, 'id'>) => void;
  quoteCount: number;
}

export default function QuoteHeader({ addQuote, quoteCount }: QuoteHeaderProps) {
  return (
    <div className="mb-12">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground/90">Eloquent Echoes</h1>
        <AddQuoteDialog addQuote={addQuote} />
      </header>
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-foreground/90">Visão Geral</h2>
            <p className="text-muted-foreground">{quoteCount} Opções</p>
        </div>
        <Select defaultValue="pt-br">
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="pt-br">Brazilian Portuguese</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}
