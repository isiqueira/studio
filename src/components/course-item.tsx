import type { Course } from '@/types';
import Image from 'next/image';
import { format } from 'date-fns';

interface CourseItemProps {
  course: Course;
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const PriceRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-sm text-foreground/80">{label}</span>
    <span className="text-sm font-medium text-foreground">{value}</span>
  </div>
);

export default function CourseItem({ course }: CourseItemProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-6 items-start">
        <Image src={course.logo} alt={`${course.name} logo`} width={100} height={100} className="w-24 h-auto mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
          {course.startDate && course.endDate ? (
            <p className="text-sm text-muted-foreground">
              {course.location} - Start Date: {format(new Date(course.startDate), 'dd/MM/yyyy')} - End Date: {format(new Date(course.endDate), 'dd/MM/yyyy')}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">{course.location}</p>
          )}
          {course.terms && (
            <div className="mt-1">
              {course.terms.map((term, index) => (
                <p key={index} className="text-sm text-muted-foreground">{term}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="pl-[124px] space-y-2">
        {course.prices.length > 0 && (
          <div className="border-b border-gray-200 pb-2">
            <span className="text-sm font-semibold text-foreground">Price</span>
          </div>
        )}
        {course.prices.map((price, index) => (
          price.amount > 0 && <PriceRow key={index} label={price.label} value={formatCurrency(price.amount, price.currency)} />
        ))}
        {course.prices.length > 0 && (
            <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-foreground">Course Total</span>
                <span className="text-sm font-bold text-foreground">{formatCurrency(course.total, course.currency)}</span>
            </div>
        )}
         {course.prices.length === 0 && (
            <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-semibold text-foreground">Course Total</span>
                    <span className="text-sm font-bold text-foreground">{formatCurrency(course.total, course.currency)}</span>
                 </div>
            </div>
         )}
      </div>

      {course.included && (
        <div className="pl-[124px] mt-4">
          <div className="bg-[#0B0F3A] text-white p-3 rounded-t-md">
            <h4 className="font-semibold text-sm">What is included in the high school programme</h4>
          </div>
          <div className="bg-muted p-3 rounded-b-md">
            <ul className="list-disc list-inside text-xs text-foreground/80 space-y-1">
              {course.included.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        </div>
      )}

      {course.notIncluded && (
         <div className="pl-[124px] mt-4">
          <div className="bg-[#0B0F3A] text-white p-3 rounded-t-md">
            <h4 className="font-semibold text-sm">What is NOT included in the high school programme</h4>
          </div>
          <div className="bg-muted p-3 rounded-b-md">
             <p className="text-xs text-foreground/80">{course.notIncluded}</p>
          </div>
        </div>
      )}
    </div>
  );
}
