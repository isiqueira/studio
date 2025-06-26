'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground uppercase">
            Viver, Estudar e <br />
            Trabalhar na Austrália
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Planejamos o seu intercâmbio, para que possa viver o máximo da cultura Australiana.
          </p>
          <Button
            size="lg"
            className="bg-white text-black border-2 border-black rounded-sm shadow-[4px_4px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            QUERO ESTUDAR
          </Button>
        </div>
        <div>
          <Image
            src="https://placehold.co/600x450.png"
            alt="Study in Australia"
            width={600}
            height={450}
            className="rounded-lg"
            data-ai-hint="kangaroo backpack"
          />
        </div>
      </div>
    </div>
  );
}
