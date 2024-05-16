import { getProductDetails, getThemeConfigs } from "@/app/actions";
import InputQuantity from "@/components/common/input-quantity/InputQuantity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { find } from "lodash";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Ratings } from "@/components/common/rating/rating";
import ProductCarousel from "@/components/common/product-carousel/carousel";

type Props = {};

export default async function Page({
  params,
}: Props & {
  params: { [key: string]: string };
}) {
  const themeConfigs = await getThemeConfigs();
  const productDetails = await getProductDetails(params.slug);

  const pageConfigs = find(themeConfigs.object_config.pages, {
    page_id: "bg_product",
  });
  const componentSettings = find(pageConfigs.components, {
    id: "config_view_detail_product",
  }).settings;

  console.log(productDetails);

  return (
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
            {/* <div className="w-[88px] aspect-square">
              <Image
                className="w-full h-full object-contain"
                src="/img-placeholder.png"
                alt="alt"
                width={0}
                height={0}
                sizes="screen"
              />
            </div>
            <div className="w-[88px] aspect-square">
              <Image
                className="w-full h-full object-contain"
                src="/img-placeholder.png"
                alt="alt"
                width={0}
                height={0}
                sizes="screen"
              />
            </div>
            <div className="w-[88px] aspect-square">
              <Image
                className="w-full h-full object-contain"
                src="/img-placeholder.png"
                alt="alt"
                width={0}
                height={0}
                sizes="screen"
              />
            </div>
            <div className="w-[88px] aspect-square">
              <Image
                className="w-full h-full object-contain"
                src="/img-placeholder.png"
                alt="alt"
                width={0}
                height={0}
                sizes="screen"
              />
            </div> */}
          </div>
          {/* <div className="w-full max-w-[648px] aspect-square">
            <Image
              className="w-full h-full object-contain"
              src="/img-placeholder.png"
              alt="alt"
              width={0}
              height={0}
              sizes="screen"
            />
          </div> */}
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
            <div className="flex flex-col gap-[10px]">
              <h4 className="font-bold">Add Your Personalisation:</h4>
              <input
                type="text"
                className="h-10 w-full border outline-none focus:border-[var(--color-primary)] px-[10px] py-2"
                placeholder="Love Chrismas"
              />
            </div>
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
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <Tabs
          defaultValue="description"
          className="w-full border border-[#E5E5E5] rounded-xl"
        >
          <TabsList className="h-[60px] border-b border-[#E5E5E5] w-full rounded-b-none bg-white rounded-t-xl p-0 flex justify-start px-8 gap-[76px]">
            <TabsTrigger
              className="h-full text-lg p-0 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[var(--color-primary)] data-[state=active]:text-[var(--color-primary)]"
              value="description"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              className="h-full text-lg p-0 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[var(--color-primary)] data-[state=active]:text-[var(--color-primary)]"
              value="details"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              className="h-full text-lg p-0 rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-b-[var(--color-primary)] data-[state=active]:text-[var(--color-primary)]"
              value="shipping-info"
            >
              Shipping Info
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="p-10 mt-0"
            value="description"
            dangerouslySetInnerHTML={{ __html: productDetails.desc }}
          ></TabsContent>
          <TabsContent className="p-10 mt-0" value="details">
            Change your password here.
          </TabsContent>
          <TabsContent className="p-10 mt-0" value="shipping-info">
            Change your password here.
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[43px] items-center">
            <h3 className="font-bold">Reviews</h3>
            <div className="flex justify-between items-center w-full">
              <div>
                <Ratings variant="yellow" rating={4.5} />
                <span>Based on 1099 reviews</span>
              </div>
              <div className="w-[1px] h-[99px] bg-[#ECEFF1]"></div>
              <div>
                <div className="flex gap-6 items-center">
                  <Ratings variant="yellow" rating={5} />
                  <div className="w-[116px] h-[14px] bg-[#ECEFF1] relative">
                    <div className="w-[calc(1011/1099*100%)] bg-[#EAE33F] h-full"></div>
                  </div>
                  <span className="text-[#263238] text-xs">1011</span>
                </div>
                <div className="flex gap-6">
                  <Ratings variant="yellow" rating={4} />
                  <div className="w-[116px] h-[14px] bg-[#ECEFF1] relative">
                    <div className="w-[calc(73/1099*100%)] bg-[#EAE33F] h-full"></div>
                  </div>
                  <span className="text-[#263238] text-xs">73</span>
                </div>
                <div className="flex gap-6">
                  <Ratings variant="yellow" rating={3} />
                  <div className="w-[116px] h-[14px] bg-[#ECEFF1] relative">
                    <div className="w-[calc(12/1099*100%)] bg-[#EAE33F] h-full"></div>
                  </div>
                  <span className="text-[#263238] text-xs">12</span>
                </div>
                <div className="flex gap-6">
                  <Ratings variant="yellow" rating={2} />
                  <div className="w-[116px] h-[14px] bg-[#ECEFF1] relative">
                    <div className="w-[calc(2/1099*100%)] bg-[#EAE33F] h-full"></div>
                  </div>
                  <span className="text-[#263238] text-xs">2</span>
                </div>
                <div className="flex gap-6">
                  <Ratings variant="yellow" rating={1} />
                  <div className="w-[116px] h-[14px] bg-[#ECEFF1] relative">
                    <div className="w-[calc(1/1099*100%)] bg-[#EAE33F] h-full"></div>
                  </div>
                  <span className="text-[#263238] text-xs">1</span>
                </div>
              </div>
              <div className="w-[1px] h-[99px] bg-[#ECEFF1]"></div>
              <button className="bg-[var(--color-primary)] rounded-[var(--border-radius)] px-4 py-2 h-10 text-white">
                Write a review
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}