"use client";

import Image from "next/image";
import { useState } from "react";

type HotelGalleryImage = {
  src: string;
  alt: string;
};

type HotelGalleryProps = {
  images: HotelGalleryImage[];
};

export function HotelGallery({ images }: HotelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<HotelGalleryImage | null>(
    null,
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="group relative h-80 overflow-hidden rounded-[2rem] shadow-xl shadow-[#6B3A00]/10 outline-none"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

            <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-[#7A0909] shadow-lg transition group-hover:bg-[#F6D77A]">
              Ver foto
            </span>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-black text-[#7A0909] transition hover:bg-[#F6D77A]"
          >
            Fechar
          </button>

          <div className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-black">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}