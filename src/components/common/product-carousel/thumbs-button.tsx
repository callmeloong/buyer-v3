"use client";
import { cn } from "@/lib/utils";
import { Mockup } from "@/types/product-details";
import React from "react";
import Image from "next/image";

type Props = {
  selected: boolean;
  mockup: Mockup;
  onClick: () => void;
};

export default function Thumb({ selected, mockup, onClick }: Props) {
  return (
    <div
      className={cn(
        "embla-thumbs__slide opacity-50 hover:opacity-100 group",
        selected && "opacity-100"
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "embla-thumbs__slide__number border border-transparent group-hover:border-primary rounded-[var(--border-radius)] w-[88px] aspect-square",
          selected && "border border-primary"
        )}
      >
        <Image
          className="w-full h-full object-contain rounded-[var(--border-radius)]"
          src={mockup.src}
          alt="alt"
          width={0}
          height={0}
          sizes="screen"
        />
      </button>
    </div>
  );
}
