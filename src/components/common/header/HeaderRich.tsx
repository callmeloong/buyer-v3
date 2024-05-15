import React from "react";
import Navigation from "./Navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { HeaderBarSettings, HeaderConfigObj } from "@/types/header";
import Link from "next/link";
import InputSearch from "./InputSearch";

const HeaderRich = async ({
  template_type,
  settings,
  id,
}: HeaderConfigObj<HeaderBarSettings>) => {
  return (
    <header
      className={cn(
        "z-20 header hidden lg:flex justify-center",
        settings.fixed_header.value && "sticky top-0"
      )}
    >
      <div
        className={cn(
          "w-full",
          template_type,
          !settings.full_width.value && "max-w-[1320px] px-3",
          settings.header_center_logo.value && "centered_logo"
        )}
      >
        <div
          className={cn(
            "header_main",
            settings.full_width.value && "padding_content"
          )}
        >
          <div className="header_brand">
            <Link
              className={cn(
                "header_logo_url",
                settings.header_center_logo.value && "block w-fit mx-auto"
              )}
              href="/"
            >
              <Image
                src={settings.header_logo_url.value || ""}
                alt={settings.header_logo_url.heading || "logo"}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "100%" }}
              />
            </Link>
          </div>
          <InputSearch />
          <div className="flex flex-1 justify-end order-3 gap-4 header_icons">
            <User className="hover:text-[color:var(--color-primary)] transition-all cursor-pointer" />

            <Link href="/cart">
              <ShoppingCart className="hover:text-[color:var(--color-primary)] transition-all cursor-pointer fill-none w-6 h-6" />
            </Link>
          </div>
        </div>
        <Navigation {...{ template_type, settings }} />
      </div>
    </header>
  );
};

export default HeaderRich;
