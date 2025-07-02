
"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Quotation, Course } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const CourseSection = ({ course, educationGroupLogo }: { course: Course, educationGroupLogo?: string }) => {
  const total = course.prices.reduce((acc, p) => acc + p.price, 0);
  const schoolName = course.school.name;
  const cityName = course.location;
  const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  let startDate, endDate, durationWeeks;
  if (course.period && course.period.includes(' - ')) {
    const [startDateStr, endDateStr] = course.period.split(' - ');
    startDate = new Date(startDateStr.trim());
    endDate = new Date(endDateStr.trim());
    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      durationWeeks = Math.round(diffDays / 7);
    } else {
        startDate = undefined;
        endDate = undefined;
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-foreground mb-4">
        {course.name}
      </h4>
      
      <div className="flex items-center gap-4">
        <Image
          src={educationGroupLogo || transparentPixel}
          alt={`${schoolName || 'School'} logo`}
          width={48}
          height={48}
          className="w-12 h-12 rounded-md object-contain"
        />
        <div className="flex-1 space-y-1.5">
          {schoolName && (
            <p className="text-sm font-medium text-foreground">{schoolName}</p>
          )}
          {cityName && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{cityName}</span>
            </div>
          )}
          {startDate && endDate && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <CalendarDays className="w-3 h-3" />
              <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
            </div>
          )}
          {durationWeeks !== undefined && (
             <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                <span>{durationWeeks} weeks duration</span>
            </div>
          )}
        </div>
      </div>
      
      <SectionTitle>Valores</SectionTitle>
      
      <div className="space-y-[7px]">
        {course.prices.map((price, priceIndex) => {
          if (price.price <= 0) return null;
          return (
            <div key={priceIndex} className="flex justify-between items-center text-sm">
              <span className="text-foreground/80">{price.description}</span>
              <span className="font-medium text-foreground">{formatCurrency(price.price)}</span>
            </div>
          );
        })}
      </div>
      
      <Separator className="my-3" />
      
      <div className="flex justify-between items-center font-bold">
        <p className="text-foreground">Subtotal</p>
        <p className="text-lg text-foreground">{formatCurrency(total)}</p>
      </div>
    </div>
  );
};


export default function QuoteCard({ quotation }: QuoteCardProps) {
  const { quote } = quotation;

  return (
    <Link href={`/quote/${quote.id}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden border-2 rounded-lg bg-card hover:shadow-lg hover:border-[#0c0f3a] transition-all duration-200">
        <CardContent className="p-0 flex-grow">
          <Section>
            <div className="space-y-8">
              {quote.courses.map((course, courseIndex) => (
                <CourseSection
                  key={courseIndex}
                  course={course}
                  educationGroupLogo={quote.courses[courseIndex]?.school?.logo}
                />
              ))}
            </div>
          </Section>

          {quote.extras.length > 0 && (
            <>
              <Separator />
              <Section>
                <h3 className="text-sm font-semibold text-[#61657e] mb-4">Taxas</h3>
                <div className="flex flex-col">
                  {quote.extras.map((extra, extraIndex) => (
                    <React.Fragment key={extraIndex}>
                      <div className="flex justify-between items-start text-sm">
                        <div>
                          <p className="text-foreground">{extra.name}</p>
                          <p className="text-muted-foreground text-xs">{extra.period}</p>
                        </div>
                        <p className="font-medium text-foreground whitespace-nowrap">{formatCurrency(extra.price)}</p>
                      </div>
                      {extraIndex < quote.extras.length - 1 && <Separator className="my-3" />}
                    </React.Fragment>
                  ))}
                </div>
              </Section>
            </>
          )}
        </CardContent>

        <CardFooter className="p-0">
          <div className="w-full">
            <div className="p-4 sm:p-6 bg-muted mt-auto">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Total (AUD)</p>
                    <p className="text-lg font-bold text-foreground">
                      {formatCurrency(quote.totalAmount, "AUD")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      First Payment (AUD)
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(
                        quote.firstPaymentAmount,
                        "AUD"
                      )}
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-[#0c0f3a] hover:bg-[#0c0f3a]/90">See Full Study and Payment Plan</Button>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
