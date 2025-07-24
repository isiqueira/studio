
"use client";

import type { Course } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './image-modal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from './ui/card';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const courseTotal = course.prices.reduce((total, item) => total + item.price, 0);
  const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-6 items-start">
        <Image src={course.logo || transparentPixel} alt={`${course.name} logo`} width={100} height={100} className="w-24 h-auto mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
          {course.school?.name && <p className="text-md font-semibold text-muted-foreground">{course.school.name}</p>}
          <p className="text-sm text-muted-foreground">{course.location}</p>
          <p className="text-sm text-muted-foreground">{course.period}</p>
        </div>
      </div>
      
      <div className="pl-[124px] space-y-6">
        {course.school?.videoUrl && (
            <div className="relative h-0 pb-[56.25%] rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={course.school.videoUrl}
                title={`${course.school.name || course.name} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
        )}

        {course.school?.images && course.school.images.length > 0 && (
          <Carousel className="w-full">
            <CarouselContent>
              {course.school.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 flex items-center justify-center relative aspect-video">
                         <button onClick={() => handleImageClick(src)} className="block w-full h-full">
                            <Image
                              src={src}
                              alt={`School image ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover hover:opacity-80 transition-opacity"
                              data-ai-hint="campus students"
                            />
                         </button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        )}
        
        <div className="space-y-2">
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
      <ImageModal isOpen={!!selectedImage} onClose={handleCloseModal} imageUrl={selectedImage} />
    </div>
  );
}
