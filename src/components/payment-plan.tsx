import type { PaymentPlanInstallment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

// Assuming AUD as currency since it's not provided in the new model
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
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
  installments: PaymentPlanInstallment[];
  duration: string;
  period: string;
  totalAmount: number;
}

export default function PaymentPlan({ installments, duration, period, totalAmount }: PaymentPlanProps) {
  return (
    <div className="space-y-8">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-[#0B0F3A] text-white p-6 space-y-4">
          <div className="flex justify-between">
            <span>Total study plan duration</span>
            <span>{duration}</span>
          </div>
          <div className="flex justify-between">
            <span>Dates</span>
            <span>{period}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </div>
      
      <div className='space-y-6'>
        {installments.map((installment, index) => {
          const installmentTotal = installment.payments.reduce((total, item) => total + item.price, 0);
          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className='bg-muted'>
                <CardTitle className='text-base flex justify-between'>
                  <span>Due date</span>
                  <span>{installment.dueDate}</span>
                </CardTitle>
                {installment.description && (
                  <CardDescription>{installment.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-1 mt-2">
                    {installment.payments.map((item, pIndex) => (
                        <PlanRow key={pIndex} label={item.description} value={formatCurrency(item.price)} />
                    ))}
                    <div className="pt-2">
                        <PlanRow 
                          label={installment.firstPayment ? "Total first payment" : "Installment Total"} 
                          value={formatCurrency(installmentTotal)} 
                          isBold={true} 
                        />
                    </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
