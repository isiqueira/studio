import { Separator } from './ui/separator';

interface QuoteSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function QuoteSection({ title, children }: QuoteSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <Separator className="bg-border/50" />
      </div>
      {children}
    </section>
  );
}
