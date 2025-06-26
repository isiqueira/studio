import type { QuoteDetails, User } from '@/types';
import { format } from 'date-fns';

interface QuoteInfoBoxProps {
  quote: QuoteDetails;
  user: User;
}

export default function QuoteInfoBox({ quote, user }: QuoteInfoBoxProps) {
  return (
    <div className="bg-muted p-6 rounded-lg text-sm text-foreground/80 space-y-1">
      <p>Hi {user.name},</p>
      <p>
        We prepared this quotation and it's valid until {format(new Date(quote.validUntil), 'EEE, MMM d, yyyy')}.
      </p>
      <p>
        It was created on {format(new Date(quote.createdAt), 'EEE, MMM d, yyyy')}.
      </p>
      <p>
        You can read our Terms&Conditions about your quotation{' '}
        <a href={quote.termsLink} className="text-primary underline font-semibold">
          here
        </a>
        .
      </p>
    </div>
  );
}
