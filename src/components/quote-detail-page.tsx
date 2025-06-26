import type { QuoteDetails, User } from '@/types';
import QuoteInfoBox from './quote-info-box';
import QuoteSection from './quote-section';
import CourseItem from './course-item';
import ExtraItem from './extra-item';
import PaymentPlan from './payment-plan';

interface QuoteDetailPageProps {
  quote: QuoteDetails;
  user: User;
}

export default function QuoteDetailPage({ quote, user }: QuoteDetailPageProps) {
  return (
    <div className="bg-white text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-12">
          <QuoteInfoBox quote={quote} user={user} />
          
          <QuoteSection title="Courses">
            <div className="space-y-8">
              {quote.courses.map((course) => (
                <CourseItem key={course.id} course={course} />
              ))}
            </div>
          </QuoteSection>

          <QuoteSection title="Extras">
            <div className="space-y-8">
              {quote.extras.map((extra) => (
                <ExtraItem key={extra.id} extra={extra} />
              ))}
            </div>
          </QuoteSection>

          <QuoteSection title="Payment Plan">
            <PaymentPlan paymentPlan={quote.paymentPlan} />
          </QuoteSection>
        </div>
      </div>
    </div>
  );
}
