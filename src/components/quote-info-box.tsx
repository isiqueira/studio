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
    <div className="bg-muted p-6 rounded-lg text-sm text-foreground/80 space-y-1">
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
  );
}
