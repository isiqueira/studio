import type { Extra } from '@/types';
import Image from 'next/image';

// Assuming AUD as currency since it's not provided in the new model
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

interface ExtraItemProps {
  extra: Extra;
}

export default function ExtraItem({ extra }: ExtraItemProps) {
  return (
    <div>
      <div className="flex gap-6 items-start">
        <Image src={extra.logo || 'https://placehold.co/100x100.png'} alt={`${extra.name} logo`} width={100} height={100} className="w-24 h-auto" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{extra.name}</h3>
          <p className="text-sm text-muted-foreground">{extra.period}</p>
        </div>
      </div>
      <div className="pl-[124px] mt-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-foreground">Price</span>
            <span className="text-sm font-medium text-foreground">{formatCurrency(extra.price)}</span>
        </div>
      </div>
    </div>
  );
}
