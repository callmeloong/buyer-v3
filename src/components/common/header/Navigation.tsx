import { getThemeMenu } from "@/app/actions";
import { cn } from "@/lib/utils";
import { HeaderConfigObj, HeaderBarSettings } from "@/types/header";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  template_type: string;
  settings: HeaderBarSettings;
};

const Navigation = async ({ template_type, settings }: Props) => {
  const { items } = await getThemeMenu(settings.header_navigation_items.value);

  return (
    <div
      className={cn(
        "flex-1",
        template_type === "bg_header_bar_rich" &&
          "bg-[var(--color-main-menu-background)]"
      )}
    >
      <div
        id={settings.header_navigation_items.id}
        style={{
          justifyContent:
            template_type === "bg_header_bar_rich"
              ? "center"
              : settings.header_content_alignment.value,
        }}
        className={cn(
          "w-full max-w-[926px] m-auto flex flex-1 gap-4 header_rich_menu",
          settings.header_center_logo.value &&
            template_type === "bg_header_bar_rich"
            ? "order-1"
            : "order-2"
        )}
      >
        {items?.map((item: any, idx: number) => (
          <>
            <div key={idx} className="cursor-pointer p-2 group relative">
              <Link
                href={item.link}
                className={cn(
                  "header_nav flex gap-2 items-center group-hover:text-[color:var(--color-primary)] transition-all"
                )}
              >
                {item.name}{" "}
                {!!item.children?.length && (
                  <ChevronDown className="!fill-none group-hover:rotate-180 transition-all" />
                )}
              </Link>
              {!!item.children?.length && (
                <ul className="absolute top-full left-6 bg-[var(--color-main-menu-background)] border py-2 w-full min-w-[250px] truncate invisible group-hover:visible translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  {item.children.map((child: any) => (
                    <li className="px-4 py-2 group/child" key={child.id}>
                      <Link
                        className="px-4 py-2 font-normal group-hover/child:text-[color:var(--color-primary)]"
                        href={child.link}
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
