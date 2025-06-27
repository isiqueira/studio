
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

const CourseSection = ({ course, logo }: { course: Course; logo?: string }) => {
  const total = course.prices.reduce((acc, p) => acc + p.price, 0);
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3 mb-4">
        {logo && (
          <Image
            src={logo}
            alt={`${course.name} logo`}
            width={48}
            height={48}
            className="w-12 h-12 object-contain rounded-md border p-1 bg-white"
            data-ai-hint="education logo"
          />
        )}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-foreground">{course.name}</h4>
          <p className="text-sm text-muted-foreground">{course.location}</p>
          <p className="text-sm text-muted-foreground">{course.period}</p>
        </div>
      </div>

      <div>
        <SectionTitle>Valores</SectionTitle>
        {course.prices.map(
          (price, priceIndex) =>
            price.price > 0 && (
              <PriceRow
                key={priceIndex}
                label={price.description}
                value={formatCurrency(price.price)}
              />
            )
        )}
        <Separator className="my-2" />
        <PriceRow label="Subtotal" value={formatCurrency(total)} isBold />
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
          {quote.plugAndPlay === 1 && (
            <Badge
              variant="default"
              className="absolute top-4 right-4 bg-green-500 text-white"
            >
              Plug & Play
            </Badge>
          )}
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          <Section>
            {quote.courses.map((course, courseIndex) => (
              <CourseSection
                key={courseIndex}
                course={course}
                logo={course.logo || quote.educationGroupLogo}
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
