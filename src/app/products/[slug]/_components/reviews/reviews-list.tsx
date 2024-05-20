"use client";

import Image from "next/image";
import { getProductReviews, getStoreReviews } from "@/app/actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { PagingData } from "@/types/common";
import { Review, Aggr } from "@/types/review";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SORT_REVIEWS } from "@/lib/constants";
import ReviewItem from "./review-item";

type Props = {
  type: string;
  productId: string;
  dataReviews: PagingData<Review[]> & {
    totalImage: number;
    aggr: Aggr;
  };
};

export default function ReviewsList({ dataReviews, type, productId }: Props) {
  const [listImg, setListImg] = useState<string[]>([]);
  const [listReviews, setListReviews] = useState<Review[]>([]);
  useEffect(() => {
    getListImg("1");
    getListReviews("1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListImg = async (page: string) => {
    if (type.includes("product")) {
      const response = await getProductReviews(productId, page, "6");
      setListImg(response.content.map((review) => review.imageReviewUrl));
    } else {
      const response = await getStoreReviews(page, "6");
      setListImg(response.content.map((review) => review.imageReviewUrl));
    }
  };

  const getListReviews = async (page: string) => {
    if (type.includes("product")) {
      const response = await getProductReviews(productId, page, "5");
      setListReviews(response.content);
    } else {
      const response = await getStoreReviews(page, "5");
      setListReviews(response.content);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <span>Customer photos & videos</span>
        <div className="py-3">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-[626px]"
          >
            <CarouselContent>
              {listImg.map((imgUrl, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                  <div className="w-[96px] h-[96px]">
                    <Image
                      className="w-[96px] h-[96px] object-cover"
                      src={imgUrl}
                      alt={imgUrl}
                      width={0}
                      height={0}
                      sizes="screen"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="py-[5px] px-[11px] flex gap-2 border rounded-[var(--border-radius)] outline-none w-fit">
            Most Recent
            {/* {
                find(SORT_OPTIONS, {
                  value: (searchParams?.sort as SortType) || "newest",
                })?.label
              } */}
            <ChevronDown className="!fill-none" />
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {SORT_REVIEWS.map((option) => (
              <DropdownMenuItem key={option} className="p-0">
                {/* <Link
                    className="px-4 py-2"
                    href={{ query: { ...searchParams, sort: option.value } }}
                  > */}
                {option}
                {/* </Link> */}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {listReviews.map((item) => (
          <ReviewItem key={item.id} review={item} />
        ))}
      </div>
    </div>
  );
}
