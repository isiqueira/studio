
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Quotation, Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quotation: Quotation;
  index: number;
}

const formatCurrency = (amount: number, currency: string = "AUD") => {
  return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-AU", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("p-4 sm:p-6", className)}>{children}</div>;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">
    {children}
  </h3>
);

const PriceRow = ({
  label,
  value,
  isBold = false,
}: {
  label: string;
  value: string;
  isBold?: boolean;
}) => (
  <div className="flex justify-between items-center py-2 text-sm">
    <span
      className={cn(isBold ? "font-bold text-foreground" : "text-foreground/80")}
    >
      {label}
    </span>
    <span className={cn("font-medium text-foreground", isBold && "font-bold")}>
      {value}
    </span>
  </div>
);

const CourseSection = ({ course }: { course: Course }) => {
  const total = course.prices.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="mb-6">
      {/* Course Header */}
      <div className="mb-4">
        <h4 className="text-2xl font-semibold text-foreground mb-2">{course.name}</h4>
        <p className="text-muted-foreground flex items-center text-base">
          <span className="mr-2 text-lg" role="img" aria-label="Australia">🇦🇺</span>
          {course.location.split('|').pop()?.trim()}
        </p>
        <div className="mt-4 text-sm text-muted-foreground space-y-0.5">
          <p>{course.location}</p>
          <p>{course.period}</p>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Pricing Section */}
      <div>
        <h5 className="text-xl font-semibold text-foreground mb-3">Valores</h5>
        
        <p className="text-primary font-semibold mb-2">Programas</p>
        
        <div className="space-y-3">
          {course.prices.map((price, priceIndex) => {
            if (price.price <= 0) return null;

            const isPrograma = price.description === 'Programa';
            return (
              <div key={priceIndex} className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">{isPrograma ? course.name : price.description}</p>
                  {isPrograma && <p className="text-sm text-muted-foreground">{course.period}</p>}
                </div>
                <p className="font-semibold text-foreground whitespace-nowrap pl-4">{formatCurrency(price.price)}</p>
              </div>
            );
          })}
        </div>
        
        <Separator className="my-3" />
        
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-bold text-lg text-foreground">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default function QuoteCard({ quotation, index }: QuoteCardProps) {
  const { quote } = quotation;

  return (
    <Link href={`/quote/${quote.id}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden border-2 rounded-lg bg-card hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="p-0 relative h-32 md:h-40">
          <Image
            src={quote.imageHeader || "https://placehold.co/800x200.png"}
            alt="Quote header"
            fill
            className="object-cover"
            data-ai-hint="office building"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-end gap-3">
            <div className="bg-white p-1 rounded-md shadow-md">
              <Image
                src={quote.logo || "https://placehold.co/48x48.png"}
                alt="Quote Logo"
                width={48}
                height={48}
                data-ai-hint="company logo"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {quote.officeCount}
              </h3>
              <p className="text-xs text-white/80 flex items-center gap-1.5">
                <CalendarDays className="w-3 h-3" /> Due:{" "}
                {new Date(quote.dueDate).toLocaleDateString("en-CA")}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          <Section>
            {quote.courses.map((course, courseIndex) => (
              <CourseSection
                key={courseIndex}
                course={course}
              />
            ))}
          </Section>

          {quote.extras.length > 0 && (
            <>
              <Separator />
              <Section>
                <SectionTitle>Taxas</SectionTitle>
                {quote.extras.map((extra, extraIndex) => (
                  <PriceRow
                    key={extraIndex}
                    label={extra.name}
                    value={formatCurrency(extra.price)}
                  />
                ))}
              </Section>
            </>
          )}
        </CardContent>

        <CardFooter className="p-0">
          <div className="w-full">
            {quote.paymentPlan.length > 0 && quote.paymentPlan[0] && (
              <div className="p-4 sm:p-6 bg-muted/50 border-t">
                <p className="text-xs text-muted-foreground">First Payment</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(quote.paymentPlan[0].firstPaymentAmount)}
                </p>
              </div>
            )}
            <div className="p-4 sm:p-6 bg-muted mt-auto">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Total (AUD)</p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(quote.totalAmount, "AUD")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    Total ({quote.converted_currency})
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(
                      quote.converted_value,
                      quote.converted_currency
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
