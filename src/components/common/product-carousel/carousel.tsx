"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Thumb from "./thumbs-button";
import "../../../app/styles/embla.css";
import { Mockup } from "@/types/product-details";
import Image from "next/image";
import { cn } from "@/lib/utils";
type Props = {
  slides: Mockup[];
  thumbsPosition: "start" | "below";
  options?: EmblaOptionsType;
};

export default function ProductCarousel({
  slides,
  options,
  thumbsPosition,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div
      className={cn(
        "embla flex gap-6",
        thumbsPosition === "start" ? "flex-row" : "flex-col"
      )}
    >
      <div
        className="embla__viewport w-full max-w-[648px] order-2"
        ref={emblaMainRef}
      >
        <div className="embla__container">
          {slides.map((mockup, index) => (
            <div className="embla__slide" key={index}>
              <div>
                <Image
                  className="w-full h-full object-contain"
                  src={mockup.src ?? "/img-placeholder.png"}
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="screen"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div
            className={cn(
              "flex gap-4",
              thumbsPosition === "start" ? "flex-col" : "flex-row"
            )}
          >
            {slides.map((mockup, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                mockup={mockup}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
