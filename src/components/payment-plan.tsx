import type { PaymentPlanDetails } from '@/types';
import { format } from 'date-fns';

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const PlanRow = ({ label, value, isBold = false }: { label: string; value: string; isBold?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className={`text-sm ${isBold ? 'font-bold text-foreground' : 'text-foreground/80'}`}>{label}</span>
      <span className={`text-sm ${isBold ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>{value}</span>
    </div>
);

interface PaymentPlanProps {
  paymentPlan: PaymentPlanDetails;
}

export default function PaymentPlan({ paymentPlan }: PaymentPlanProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-[#0B0F3A] text-white p-6 space-y-4">
        <div className="flex justify-between">
          <span>Total study plan duration</span>
          <span>{paymentPlan.duration}</span>
        </div>
        <div className="flex justify-between">
          <span>Dates</span>
          <span>Start Date: {format(new Date(paymentPlan.startDate), 'dd/MM/yyyy')} - End Date: {format(new Date(paymentPlan.endDate), 'dd/MM/yyyy')}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>{formatCurrency(paymentPlan.totalAmount, paymentPlan.currency)}</span>
        </div>
      </div>
      <div className="bg-white p-6">
        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
            <span className="text-sm font-semibold text-foreground">Due date</span>
            <span className="text-sm font-semibold text-foreground">{format(new Date(paymentPlan.dueDate), 'dd/MM/yyyy')}</span>
        </div>
        <div className="space-y-1 mt-2">
            {paymentPlan.items.map((item, index) => (
                <PlanRow key={index} label={item.description} value={formatCurrency(item.amount, item.currency)} />
            ))}
            <div className="pt-2">
                 <PlanRow label="Total first payment" value={formatCurrency(paymentPlan.totalFirstPayment, paymentPlan.currency)} isBold={true} />
            </div>
        </div>
      </div>
    </div>
  );
}
