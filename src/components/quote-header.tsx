"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface QuoteHeaderProps {
  quoteCount: number;
}

export default function QuoteHeader({ quoteCount }: QuoteHeaderProps) {
  const [creationDate, setCreationDate] = useState('');

  useEffect(() => {
    // This runs only on the client, after hydration
    setCreationDate(new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
  }, []);

  const title = "Orçamento para Italo";

  return (
    <div className="mb-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-4xl md:text-5xl font-headline font-bold text-foreground/90">{title}</h3>
          {creationDate && <p className="text-muted-foreground mt-2">criado em {creationDate}</p>}
        </div>
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
              <SelectItem value="en">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
                    <rect width="20" height="15" fill="#fff"/>
                    <rect width="20" height="1.5" y="0" fill="#b22234"/>
                    <rect width="20" height="1.5" y="3" fill="#b22234"/>
                    <rect width="20" height="1.5" y="6" fill="#b22234"/>
                    <rect width="20" height="1.5" y="9" fill="#b22234"/>
                    <rect width="20" height="1.5" y="12" fill="#b22234"/>
                    <rect width="10" height="9" fill="#3c3b6e"/>
                  </svg>
                  English
                </div>
              </SelectItem>
              <SelectItem value="es">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" className="rounded-sm">
                    <rect width="20" height="15" fill="#c60b1e"/>
                    <rect width="20" height="7.5" y="3.75" fill="#ffc400"/>
                  </svg>
                  Spanish
                </div>
              </SelectItem>
              <SelectItem value="pt-br">
                <div className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" className="rounded-sm">
                    <rect width="20" height="14" fill="#009739"/>
                    <path d="M10 2L18 7L10 12L2 7L10 2Z" fill="#fedd00"/>
                    <circle cx="10" cy="7" r="3.5" fill="#012169"/>
                  </svg>
                  Brazilian Portuguese
                </div>
              </SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}
