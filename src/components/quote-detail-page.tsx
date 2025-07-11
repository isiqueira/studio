import type { Quotation, User } from '@/types';
import QuoteInfoBox from './quote-info-box';
import QuoteSection from './quote-section';
import CourseItem from './course-item';
import ExtraItem from './extra-item';
import PaymentPlan from './payment-plan';

interface QuoteDetailPageProps {
  quote: Quotation;
  user: User;
}

export default function QuoteDetailPage({ quote, user }: QuoteDetailPageProps) {
  return (
    <div className="bg-white text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-12">
          {quote.greetings && <QuoteInfoBox greetings={quote.greetings} userName={user.name} />}
          
          <QuoteSection title="Courses">
            <div className="space-y-8">
              {quote.courses.map((course, index) => (
                <CourseItem key={index} course={course} />
              ))}
            </div>
          </QuoteSection>

          {quote.extras.length > 0 && (
            <QuoteSection title="Extras">
              <div className="space-y-8">
                {quote.extras.map((extra, index) => (
                  <ExtraItem key={index} extra={extra} />
                ))}
              </div>
            </QuoteSection>
          )}
          
          {quote.paymentPlan && quote.duration && quote.period && (
            <QuoteSection title="Payment Plan">
              <PaymentPlan 
                installments={quote.paymentPlan}
                duration={quote.duration}
                period={quote.period}
                totalAmount={quote.totalAmount}
              />
            </QuoteSection>
          )}
        </div>
      </div>
    </div>
  );
}
