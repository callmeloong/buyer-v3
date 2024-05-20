import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { ComponentSettingType } from "@/types/comp-settings";
// import { ChildrenItemType } from "@/types/children-item";

type Props = {
  ratio_slides?: any;
  full_width?: any;
  btn_as_text?: any;
  children_items?: any;
};

const HomeSlideShow = async ({
  ratio_slides,
  full_width,
  btn_as_text,
  children_items = [],
}: Props) => {
  return (
    <Carousel
      className={cn(
        !full_width?.value && "max-w-[1320px] px-3 m-auto",
        "w-full relative mb-block-default"
      )}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {children_items.map((item: any, idx: number) => (
          <CarouselItem
            key={idx}
            style={{
              backgroundImage: `url(${item.settings.item_image_url.value})`,
              justifyContent: item.settings.item_position.value,
            }}
            className={cn(
              "w-full relative bg-cover flex items-center",
              item.settings.item_ratio.value
            )}
          >
            <div className="w-full max-w-[1320px] px-3 mx-auto flex flex-col gap-6 p-6">
              <div
                style={{
                  textAlign: item.settings.item_align.value,
                  alignItems: item.settings.item_position.value,
                }}
              >
                <div className="flex flex-col gap-2 content-banner">
                  <h2 className="!mb-5">{item.settings.item_heading.value}</h2>
                  <div
                    className="!text-lg"
                    dangerouslySetInnerHTML={{
                      __html: item.settings.item_description.value,
                    }}
                  ></div>
                </div>
                {item.settings.item_btn_label.value && (
                  <Button
                    style={{ alignSelf: item.settings.item_align.value }}
                    size="lg"
                    variant={item.settings.item_btn_outline.value && "link"}
                    className={cn(
                      "w-fit text-xl hover:no-underline",
                      item.settings.item_btn_outline.value ? "" : ""
                    )}
                  >
                    <Link href={item.settings.item_btn_link.value}>
                      {item.settings.item_btn_label.value}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {children_items.length > 1 && (
        <>
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-16 w-14 h-14" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-16 w-14 h-14" />
        </>
      )}
    </Carousel>
  );
};

export default HomeSlideShow;
