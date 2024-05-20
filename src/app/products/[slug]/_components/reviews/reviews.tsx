"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ratings } from "@/components/common/rating/rating";
import { PagingData } from "@/types/common";
import { Aggr, Review } from "@/types/review";
import { REVIEWS_TAB } from "@/lib/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ReviewsList from "./reviews-list";

type Props = {
  productId: string;
  initialProductReviews: PagingData<Review[]> & {
    totalImage: number;
    aggr: Aggr;
  };
  initialStoreReviews: PagingData<Review[]> & {
    totalImage: number;
    aggr: Aggr;
  };
};

export default function Reviews({
  initialProductReviews,
  initialStoreReviews,
  productId,
}: Props) {
  const [tabSelected, setTabSelected] = useState<string>("product-reviews");
  const reviewsStarList = Array.from({ length: 5 }, (_, i) => ({
    star: i + 1,
    reviews: initialStoreReviews.aggr.rate[`n_${i + 1}`] ?? 0,
    width:
      ((initialStoreReviews.aggr.rate[`n_${i + 1}`] ?? 0) /
        initialStoreReviews.total) *
      100,
  })).reverse();
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[43px] items-center">
          <h3 className="font-bold">Reviews</h3>
          <div className="flex justify-between items-center w-full">
            <div>
              <Ratings
                variant="primary"
                rating={initialStoreReviews.aggr.avg}
              />
              <span>Based on {initialStoreReviews.total} reviews</span>
            </div>
            <div className="w-[1px] h-[99px] bg-[#ECEFF1]"></div>
            <div>
              {reviewsStarList.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-center">
                  <Ratings variant="primary" rating={item.star} />
                  <div className="w-[116px] h-[14px] bg-[#ECEFF1] relative">
                    <div
                      style={{ width: `${item.width}%` }}
                      className="bg-[var(--color-primary)] h-full"
                    ></div>
                  </div>
                  <span className="text-xs">{item.reviews}</span>
                </div>
              ))}
            </div>
            <div className="w-[1px] h-[99px] bg-[#ECEFF1]"></div>
            <button className="bg-[var(--color-primary)] rounded-[var(--border-radius)] px-4 py-2 h-10 text-white">
              Write a review
            </button>
          </div>
        </div>
      </div>

      <Tabs value={tabSelected} onValueChange={setTabSelected}>
        <TabsList className="h-[50px] border-b border-[#E5E5E5] w-full rounded-b-none bg-white rounded-t-xl p-0 flex justify-start gap-[20px]">
          {REVIEWS_TAB.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="h-full text-lg p-0 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[var(--body-text-color)] data-[state=active]:text-[var(--body-text-color)] hover:border-b-[2px] hover:border-b-[var(--body-text-color)] hover:text-[var(--body-text-color)] text-[#D9D9D9]"
              value={tab.value}
            >
              {tab.name}{" "}
              {`(${
                tab.value.includes("product")
                  ? initialProductReviews.total
                  : initialStoreReviews.total
              })`}
            </TabsTrigger>
          ))}
        </TabsList>
        {REVIEWS_TAB.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-5">
            <ReviewsList
              type={tab.value}
              productId={productId}
              dataReviews={
                tab.value.includes("product")
                  ? initialProductReviews
                  : initialStoreReviews
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
