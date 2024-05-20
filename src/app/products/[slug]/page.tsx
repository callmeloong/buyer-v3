import {
  getProductDetails,
  getProductReviews,
  getStoreReviews,
  getThemeConfigs,
} from "@/app/actions";
import InputQuantity from "@/components/common/input-quantity/InputQuantity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { find } from "lodash";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Ratings } from "@/components/common/rating/rating";
import ProductCarousel from "@/components/common/product-carousel/carousel";
import { PRODUCT_DESCRIPTION_TAB } from "@/lib/constants";
import ShareProduct from "./_components/share";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/common/header/Header";
import Reviews from "./_components/reviews/reviews";

type Props = {};

export default async function Page({
  params,
}: Props & {
  params: { [key: string]: string };
}) {
  const themeConfigs = await getThemeConfigs();
  const productDetails = await getProductDetails(params.slug);
  const storeReviews = await getStoreReviews("1", "5");
  const productReviews = await getProductReviews(productDetails.id, "1", "5");

  const pageConfigs = find(themeConfigs.object_config.pages, {
    page_id: "bg_product",
  });

  const componentSettings = find(pageConfigs.components, {
    id: "config_view_detail_product",
  }).settings;

  const trustBadge = componentSettings.trust_badge.value;

  const positionDesc = componentSettings.position_desc.value;

  const enableShare =
    componentSettings.share_fb.value ||
    componentSettings.share_x.value ||
    componentSettings.share_email.value ||
    componentSettings.share_ptr.value ||
    componentSettings.share_linkedin.value ||
    componentSettings.share_tele.value;

  return (
    <>
      <Header {...themeConfigs.object_config.header} />
      <main className="w-full max-w-[1320px] mx-auto py-20 flex flex-col gap-20">
        <div className="flex w-full gap-6">
          <div
            className={cn(
              "flex gap-6",
              componentSettings.position_thumb_list.value === "start"
                ? "flex-row items-start"
                : "flex-col"
            )}
          >
            <div
              className={cn(
                "flex gap-4",
                componentSettings.position_thumb_list.value === "start"
                  ? "flex-col"
                  : "flex-row order-2"
              )}
            >
              <ProductCarousel
                slides={productDetails.mockups}
                thumbsPosition={componentSettings.position_thumb_list.value}
              />
            </div>
          </div>

          <div className="px-4 flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Link className="after:content-['/'] after:ml-2" href="/">
                  Home
                </Link>
                <span className="text-[var(--color-primary)]">
                  {productDetails.title}
                </span>
              </div>
              <div className="flex gap-3">
                <Ratings rating={4.5} />
                <span>Rated 4.5/5 by 1000+ Happy Customers</span>
              </div>
              <h3 className="font-bold">{productDetails.title}</h3>
              <div className="flex gap-5 items-center">
                <h2 className="font-bold">${productDetails.price}</h2>
                <h2 className="font-bold line-through text-[#BEBEBE]">
                  ${productDetails.compare_price}
                </h2>
                <h4 className="text-[#47312A]">save 10%</h4>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {productDetails.options.map((option: any) => (
                <div key={option.name} className="flex flex-col gap-[10px]">
                  <h4 className="font-bold">{option.display_name}:</h4>
                  <div className="flex flex-row gap-[10px]">
                    {option.values.map((value: any, idx: number) => (
                      <div
                        key={value.id}
                        className={cn(
                          "h-10 px-4 py-2 border rounded-[var(--border-radius)] font-medium",
                          idx === 0 &&
                            "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                        )}
                      >
                        {value.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {/* Personalisation */}
              {/* <div className="flex flex-col gap-[10px]">
              <h4 className="font-bold">Add Your Personalisation:</h4>
              <input
                type="text"
                className="h-10 w-full border outline-none focus:border-[var(--color-primary)] px-[10px] py-2"
                placeholder="Love Chrismas"
              />
            </div> */}
              <div className="flex flex-col gap-[10px]">
                <h4 className="font-bold">Quantity:</h4>
                <div className="flex justify-between">
                  <InputQuantity />
                </div>
              </div>
            </div>

            <div className="flex gap-5 w-full">
              <button className="px-6 py-4 border border-[var(--color-primary)] rounded-[var(--border-radius)] text-[var(--color-primary)] font-bold flex-1">
                Add To Cart
              </button>
              <button className="px-6 py-4 border border-[var(--color-primary)] rounded-[var(--border-radius)] bg-[var(--color-primary)] text-white font-bold flex-1">
                Buy Now
              </button>
            </div>

            {trustBadge && (
              <div
                className="py-7 border-y"
                dangerouslySetInnerHTML={{ __html: trustBadge }}
              ></div>
            )}

            {positionDesc === "right" && (
              <Accordion type="multiple" className="w-full flex flex-col gap-5">
                <AccordionItem value="description">
                  <AccordionTrigger className="font-bold text-base px-5 py-4 border hover:no-underline">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-[#F7F7F7] text-base">
                    <div
                      dangerouslySetInnerHTML={{ __html: productDetails.desc }}
                    ></div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="details">
                  <AccordionTrigger className="font-bold text-base px-5 py-4 border hover:no-underline">
                    Details
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-[#F7F7F7] text-base"></AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping-info">
                  <AccordionTrigger className="font-bold text-base px-5 py-4 border hover:no-underline">
                    Shipping Info
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-[#F7F7F7] text-base">
                    We make every effort to fulfill orders as quickly as
                    possible. For more details about our shipping rates, please
                    visit{" "}
                    <a
                      className="font-bold underline text-blue-500"
                      href="/pages/shipping"
                      target="_blank"
                    >
                      here
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {enableShare && <ShareProduct pageConfigs={componentSettings} />}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {positionDesc === "below" && (
            <Tabs
              defaultValue="description"
              className="w-full border border-[#E5E5E5] rounded-xl"
            >
              <TabsList className="h-[60px] border-b border-[#E5E5E5] w-full rounded-b-none bg-white rounded-t-xl p-0 flex justify-start px-8 gap-[76px]">
                {PRODUCT_DESCRIPTION_TAB.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    className="h-full text-lg p-0 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[var(--color-primary)] data-[state=active]:text-[var(--color-primary)]"
                    value={item.value}
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent
                className="p-10 mt-0"
                value="description"
                dangerouslySetInnerHTML={{ __html: productDetails.desc }}
              ></TabsContent>
              <TabsContent className="p-10 mt-0" value="details"></TabsContent>
              <TabsContent className="p-10 mt-0" value="shipping-info">
                We make every effort to fulfill orders as quickly as possible.
                For more details about our shipping rates, please visit{" "}
                <a
                  className="font-bold underline text-blue-500"
                  href="/pages/shipping"
                  target="_blank"
                >
                  here
                </a>
              </TabsContent>
            </Tabs>
          )}

          <Reviews
            productId={productDetails.id}
            initialProductReviews={productReviews}
            initialStoreReviews={storeReviews}
          />
        </div>
      </main>
    </>
  );
}
