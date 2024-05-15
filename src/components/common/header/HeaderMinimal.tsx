import { cn } from "@/lib/utils";
import { HeaderConfigObj, HeaderBarSettings } from "@/types/header";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import InputSearch from "./InputSearch";

const HeaderMinimal = ({
  template_type,
  settings,
  id,
}: HeaderConfigObj<HeaderBarSettings>) => {
  return (
    <header
      className={cn(
        "z-20 header flex items-center lg:hidden justify-center min-h-[var(--header-height)] max-h-[var(--header-height)] px-3",
        settings.fixed_header.value && "sticky top-0"
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="!w-8 !h-8 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 min-w-[400px] max-w-[400px]">
          <SheetHeader className="p-4">
            <div className="min-h-[var(--header-height)] max-h-[var(--header-height)] flex flex-row items-center">
              <Link
                className={cn(
                  "header_logo_url",
                  settings.header_center_logo.value && "block w-fit"
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
          </SheetHeader>
          <div className="p-4">
            <InputSearch />
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
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
      <div className="flex justify-end order-3 gap-4 header_icons">
        <User className="hover:text-[color:var(--color-primary)] transition-all cursor-pointer" />

        <Link href="/cart">
          <ShoppingCart className="hover:text-[color:var(--color-primary)] transition-all cursor-pointer fill-none w-6 h-6" />
        </Link>
      </div>
    </header>
  );
};

export default HeaderMinimal;
