"use client";

import { useState, useEffect } from 'react';
import type { User } from '@/types';

interface QuoteHeaderProps {
  quoteCount: number;
  user: User;
}

export default function QuoteHeader({ quoteCount, user }: QuoteHeaderProps) {
  const [creationDate, setCreationDate] = useState('');
  const [selectedUser, setSelectedUser] = useState(user);
  console.log('[QuoteHeader] Fetched user:', user);
  useEffect(() => {
    // This runs only on the client, after hydration
    setCreationDate(new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }));
    setSelectedUser(user);
  }, []);

  const title = `Quotation for ${selectedUser.name}`;

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
      </div>
    </div>
  );
}
