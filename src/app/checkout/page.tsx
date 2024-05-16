"use client";
import Image from "next/image";
import DiscountCode from "./_components/discount-code";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full flex">
      <div className="w-full"></div>
      <div className="w-full max-w-[836px] bg-[#F5F5F5] p-[42px] flex flex-col gap-4 min-h-[calc(100vh-80px)]">
        <div className="text-2xl leading-[29px] font-semibold text-[#262626]">
          Order Summary
        </div>
        <div className="flex flex-col gap-[21px] justify-start items-stretch w-full max-w-[381px]">
          {/* map list products in order */}
          <div className="flex flex-row justify-between items-center gap-14">
            <div className="flex gap-[14px]">
              <div className="w-16 h-16 relative bg-[#EDEDED] rounded-[5px]">
                <Image
                  className="w-full h-full object-contain"
                  src={"/img-placeholder.png"}
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="screen"
                />
                <div className="bg-[#1773B0] text-white w-5 h-5 rounded-full flex justify-center items-center absolute top-[1px] right-0 translate-x-1/2 -translate-y-1/2 text-xs leading-5">
                  1
                </div>
              </div>
              <div>
                <div className="leading-[21px] font-medium text-black">
                  Christmas Sweater{" "}
                </div>
                <div className="leading-[18px] text-sm text-[#666666]">
                  Hawaii Shirt / Colorful / M
                </div>
                <div className="leading-[18px] text-sm text-[#666666]">
                  Estimated between: Mar 01 and Mar 15
                </div>
              </div>
            </div>
            <div className="font-medium text-black">$39.95</div>
          </div>
          {/* -------------------- */}
          <DiscountCode />
          <div className="flex flex-col gap-[7px]">
            <div className="flex flex-row justify-between">
              <span className="leading-[21px]">Subtotal</span>
              <span className="leading-[21px]">$39.95</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="leading-[21px]">Shipping</span>
              <span className="leading-[21px] text-[#666666]">Free</span>
            </div>
            <div className="flex flex-row justify-between text-[#000] items-center">
              <span className="leading-[22px] font-medium text-lg">Total</span>
              <div className="flex gap-2 items-end">
                <span className="text-[#666666] text-sm leading-[18px]">
                  USD
                </span>
                <span className="leading-[22px] font-medium text-lg">
                  $39.95
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
