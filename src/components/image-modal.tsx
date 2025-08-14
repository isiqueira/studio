"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

export default function ImageModal({ isOpen, onClose, imageUrl }: ImageModalProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 max-w-4xl bg-transparent shadow-none">
        <Image
          src={imageUrl}
          alt="Enlarged school image"
          width={1200}
          height={800}
          className="rounded-lg object-contain w-full h-auto"
        />
      </DialogContent>
    </Dialog>
  );
}
