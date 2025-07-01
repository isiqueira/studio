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
          <QuoteInfoBox greetings={quote.greetings} userName={user.name} />

          <div className="relative h-0 pb-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/WH_S_j54v1s"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
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

          <QuoteSection title="Payment Plan">
            <PaymentPlan 
              installments={quote.paymentPlan}
              duration={quote.duration}
              period={quote.period}
              totalAmount={quote.totalAmount}
            />
          </QuoteSection>
        </div>
      </div>
    </div>
  );
}
