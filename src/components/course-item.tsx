import type { Course } from '@/types';
import Image from 'next/image';

interface CourseItemProps {
  course: Course;
}

// Assuming AUD as currency since it's not provided in the new model
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
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
  const courseTotal = course.prices.reduce((total, item) => total + item.price, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-6 items-start">
        <Image src={course.logo || 'https://placehold.co/100x100.png'} alt={`${course.name} logo`} width={100} height={100} className="w-24 h-auto mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
          <p className="text-sm text-muted-foreground">{course.location}</p>
          <p className="text-sm text-muted-foreground">{course.period}</p>
        </div>
      </div>
      
      <div className="pl-[124px] space-y-2">
        {course.prices.length > 0 && (
          <div className="border-b border-gray-200 pb-2">
            <span className="text-sm font-semibold text-foreground">Price</span>
          </div>
        )}
        {course.prices.map((price, index) => (
          price.price > 0 && <PriceRow key={index} label={price.description} value={formatCurrency(price.price)} />
        ))}
        {course.prices.length > 0 && (
          <div className="flex justify-between items-center py-2">
              <span className="text-sm font-semibold text-foreground">Course Total</span>
              <span className="text-sm font-bold text-foreground">{formatCurrency(courseTotal)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
