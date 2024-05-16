"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function InputQuantity({}: Props) {
  const {
    watch,
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useForm<{ quantity: number }>({ defaultValues: { quantity: 1 } });
  return (
    <div className="flex gap-[6px]">
      <Button
        disabled={!watch().quantity}
        variant="ghost"
        className="w-10 h-10 bg-[#F5F5F5] p-0 flex items-center justify-center"
        onClick={() => {
          setValue("quantity", getValues().quantity - 1);
        }}
      >
        <Minus className="w-4" />
      </Button>

      <input
        type="number"
        className="w-[70px] h-10 border outline-none ring-0 text-center text-xl focus:border-[var(--color-primary)]"
        {...register("quantity")}
      />

      <Button
        variant="ghost"
        className="w-10 h-10 bg-[#F5F5F5] p-0 flex items-center justify-center"
        onClick={() => {
          setValue(
            "quantity",
            getValues().quantity ? +getValues().quantity + 1 : 1
          );
        }}
      >
        <Plus className="w-4" />
      </Button>
    </div>
  );
}
