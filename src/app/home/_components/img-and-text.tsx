import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { ComponentSettingType } from "@/types/comp-settings";
import Image from "next/image";
import Link from "next/link";
import { Property } from "csstype";

type Props = {
  item_text?: any; //ComponentSettingType;
  item_image_url?: any; //ComponentSettingType;
  item_heading?: any; //ComponentSettingType;
  item_description?: any; //ComponentSettingType;
  item_align?: any; //ComponentSettingType;
  item_btn_label?: any; //ComponentSettingType;
  item_btn_link?: any; //ComponentSettingType;
  item_position?: any; //ComponentSettingType;
  item_layout?: any; //ComponentSettingType;
  full_width?: any; //ComponentSettingType;
  item_btn_as_link?: any; //ComponentSettingType;
  item_ratio?: any; //ComponentSettingType;
  template_type: string;
};

function ImgNText({
  item_text,
  item_image_url,
  item_heading,
  item_description,
  item_align,
  item_btn_label,
  item_btn_link,
  item_position,
  item_layout,
  full_width,
  item_btn_as_link,
  item_ratio,
  template_type,
}: Props) {
  return (
    <div
      className={cn(
        !full_width?.value ? "max-w-[1320px] px-3 m-auto" : "2xl:px-20",
        "w-full relative flex mb-block-default"
      )}
    >
      <div
        className={cn(
          "flex",
          item_position?.value === "end" && "order-2",
          template_type.includes("default") && "flex-1"
        )}
      >
        <div
          className={cn(
            template_type.includes("default")
              ? `w-full flex items-center flex-1 ${
                  item_position?.value === "end" ? "pl-12" : "pr-12"
                }`
              : "p-6 absolute -translate-y-1/2 top-1/2 shadow-[0px_4px_24px_0px_#0000001A] w-3/5 bg-white",
            item_position?.value === "end" &&
              (full_width?.value ? "right-20" : "right-0")
          )}
        >
          <div
            className="flex flex-col gap-6 justify-center"
            style={{ alignItems: item_align?.value as string }}
          >
            <h3 className="font-heading font-wHeading">
              {item_heading?.value}
            </h3>
            <div
              className="flex"
              style={{ textAlign: item_align?.value as Property.TextAlign }}
            >
              <div
                className="*:mb-4"
                dangerouslySetInnerHTML={{
                  __html: item_description?.value ?? "",
                }}
              ></div>
            </div>
            <Button className="btn-primary">
              <Link href={(item_btn_link?.value as string) ?? "#"}>
                {item_btn_label?.value}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex-1",
          template_type.includes("default")
            ? item_ratio?.value
            : "max-w-[872px] w-full aspect-[3/2]",
          item_position?.value === "end" && "order-1"
        )}
      >
        <Image
          className="w-full h-full"
          src={(item_image_url?.value as string) ?? ""}
          alt="alt"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
}

export default ImgNText;
