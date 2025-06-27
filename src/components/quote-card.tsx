
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Quotation, Course } from "@/types";
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

const CourseSection = ({ course, educationGroupLogo }: { course: Course, educationGroupLogo?: string }) => {
  const total = course.prices.reduce((acc, p) => acc + p.price, 0);
  const locationParts = course.location.split('|').map(s => s.trim());
  const schoolName = locationParts[0];
  const cityName = locationParts[1];

  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        {educationGroupLogo && (
            <Image
                src={educationGroupLogo}
                alt={`${schoolName} logo`}
                width={40}
                height={40}
                className="rounded-md"
            />
        )}
        <div className="flex-1">
            <h4 className="text-lg font-semibold text-foreground mb-1">
                {course.name}
            </h4>
            {schoolName && (
                <p className="text-sm text-muted-foreground">{schoolName}</p>
            )}
            {cityName && (
                <p className="text-muted-foreground text-sm">
                {cityName}
                </p>
            )}
        </div>
      </div>
      
      <div className="mt-4">
        <SectionTitle>Valores</SectionTitle>
        
        <div className="space-y-3 text-sm">
          {course.prices.map((price, priceIndex) => {
            if (price.price <= 0) return null;

            return (
              <div key={priceIndex} className="flex justify-between items-start">
                <p className="text-foreground">{price.description}</p>
                <p className="font-semibold text-foreground whitespace-nowrap pl-4">{formatCurrency(price.price)}</p>
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
                {new Date(quote.dueDate + "T00:00:00").toLocaleDateString("en-CA")}
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
                educationGroupLogo={quote.educationGroupLogo}
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
