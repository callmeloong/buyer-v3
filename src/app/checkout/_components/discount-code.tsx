import React from "react";

type Props = {};

export default function DiscountCode({}: Props) {
  return (
    <div className="flex gap-3 h-[50px] items-stretch">
      <input
        type="text"
        className="border border-[#DEDEDE] rounded flex-1 outline-none focus:border-[var(--color-primary)] px-3 py-4"
        placeholder="Discount code"
      />
      <button className="border border-[#EDEDED] rounded-[5px] flex items-center justify-center bg-[#FFFFFF01] shadow-[0px_0px_0px_1px_#D6D6D6_inset] p-4">
        <span className="text-[#666666] font-medium leading-[21px]">Apply</span>
      </button>
    </div>
  );
}
