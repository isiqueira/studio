
"use client";

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Quotation } from '@/types';
import { FileText, CalendarDays, Tags, CircleDollarSign } from "lucide-react";
import Image from 'next/image';

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
    <Dialog>
      <DialogTrigger asChild>
        <Card className="relative flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card hover:bg-accent border-border rounded-lg">
          <CardHeader className="p-0 relative h-40 overflow-hidden rounded-t-lg">
            <Image
              src={'https://picsum.photos/400/200?random=1'}
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
                src="https://placehold.co/60x60.png"
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader className="pt-6 text-left">
          <DialogTitle className="text-2xl font-body leading-relaxed flex items-center gap-3">
             <FileText className="h-8 w-8 text-primary/80" />
            {quote.officeCount}
          </DialogTitle>
          <DialogDescription className="text-left !mt-6 space-y-3" asChild>
            <div>
                <div className="flex items-center gap-3 mb-2">
                  <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-lg text-foreground">{formattedValue}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base text-foreground">
                    Due Date: {new Date(quote.dueDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                  </span>
                </div>
                 <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base text-foreground">
                    Created At: {new Date(quote.created_at).toLocaleString('pt-BR')}
                  </span>
                </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
