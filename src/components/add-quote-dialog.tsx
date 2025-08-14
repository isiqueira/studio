"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useState } from 'react';

// Local type definition to prevent build errors after refactor. This component is not currently used.
type Quote = {
  id: string;
  text: string;
  source: { name: string };
}

const quoteSchema = z.object({
  text: z.string().min(10, 'Quote must be at least 10 characters long.').max(500, 'Quote must be 500 characters or less.'),
  sourceName: z.string().min(2, 'Source must be at least 2 characters long.').max(100, 'Source must be 100 characters or less.'),
});

interface AddQuoteDialogProps {
  addQuote: (quote: Omit<Quote, 'id'>) => void;
}

export default function AddQuoteDialog({ addQuote }: AddQuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      text: '',
      sourceName: '',
    },
  });

  function onSubmit(values: z.infer<typeof quoteSchema>) {
    addQuote({ text: values.text, source: { name: values.sourceName } });
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="mr-2 h-5 w-5" />
          Add Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Add a New Quote</DialogTitle>
          <DialogDescription>Share a new quote that inspires you. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quote</FormLabel>
                  <FormControl>
                    <Textarea placeholder="The journey of a thousand miles begins with a single step." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sourceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source (Author)</FormLabel>
                  <FormControl>
                    <Input placeholder="Lao Tzu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="submit">Save quote</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
