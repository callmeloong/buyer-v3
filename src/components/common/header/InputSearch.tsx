"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};

export default function InputSearch({}: Props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<{ keyword: string }>();

  const onSubmit: SubmitHandler<{ keyword: string }> = (values) =>
    router.push(`/search?keyword=${values.keyword}`);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "max-w-[400px] w-full border border-[#dee2e6] rounded-[5px] flex flex-1 search_bar header_search"
        // settings.header_center_logo.value && "order-1"
      )}
    >
      <input
        type="text"
        {...register("keyword")}
        className="w-full rounded-s-[5px] focus:outline-none p-[.375rem_.75rem] leading-6"
        placeholder="What are you looking for?"
      />
      <Button
        type="submit"
        className="border-0 bg-transparent hover:bg-transparent p-[.375rem_.75rem] h-[36px]"
        variant="ghost"
      >
        <Search className="!w-5 !h-5" />
      </Button>
    </form>
  );
}
