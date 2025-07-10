import type { Greetings } from '@/types';

interface QuoteInfoBoxProps {
  greetings: Greetings;
  userName: string;
}

export default function QuoteInfoBox({ greetings, userName }: QuoteInfoBoxProps) {
  const greetingText = greetings.greeting.includes('Geórgia') 
    ? greetings.greeting.replace('Geórgia', userName) 
    : `Hi ${userName},`;

  const termsText = greetings.line4.split('here');

  return (
    <div className="bg-muted p-6 rounded-lg text-sm text-foreground/80 space-y-4">
      <div className="space-y-1">
        <p>{greetingText}</p>
        <p>{greetings.line1}</p>
        <p>{greetings.line2}</p>
        {greetings.line3 && <p>{greetings.line3}</p>}
        <p>
          {termsText[0]}
          <a href="#" className="text-primary underline font-semibold">
            here
          </a>
          {termsText[1]}
        </p>
      </div>

      <div className="relative h-0 pb-[56.25%] rounded-lg overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/JRS4GkR39RU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
