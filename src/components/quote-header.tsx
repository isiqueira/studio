"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { User } from '@/types';

interface QuoteHeaderProps {
  quoteCount: number;
  user: User;
}

export default function QuoteHeader({ quoteCount, user }: QuoteHeaderProps) {
  const [creationDate, setCreationDate] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('pt-br');

  useEffect(() => {
    // This runs only on the client, after hydration
    setCreationDate(new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
  }, []);

  const title = `Quotation for ${user.name}`;

  return (
    <div className="mb-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-4xl md:text-5xl font-headline font-bold text-foreground/90">{title}</h3>
          {creationDate && <p className="text-muted-foreground mt-2">Created at {creationDate}</p>}
        </div>
      </header>
      <div className="flex justify-between items-center">
        <div>
            <p className="text-muted-foreground">{quoteCount} {quoteCount === 1 ? 'Quote' : 'Quotes'}</p>
        </div>
        {/* <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-auto border-foreground">
                {languages[selectedLanguage as keyof typeof languages].flag}
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languages).map(([value, { flag, label }]) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    {flag}
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
        </Select> */}
      </div>
    </div>
  );
}
