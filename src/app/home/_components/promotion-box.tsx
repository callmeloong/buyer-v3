import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = { compConfig: any; themeSetting: any };

const PromotionBox = ({ compConfig, themeSetting }: Props) => {
  const { settings, children_items, template_type } = compConfig;
  return (
    <div
      className={cn(
        !settings.full_width.value ? "max-w-[1320px] px-3 m-auto" : "px-20",
        "w-full relative flex gap-6 items-center justify-around bg-[var(--color-promotion-background)] promotion_dynamic mb-block-default"
      )}
    >
      <div className="flex flex-1">
        {children_items.map((item: any) => (
          <div
            key={item.id}
            className={cn(
              "flex gap-4 flex-1 promotion-block relative",
              template_type === "promotion_box"
                ? "flex-col items-center p-4"
                : "flex-row items-center"
            )}
          >
            {/* <div className="h-full"> */}
            <Image
              src={item.settings.box_icon.value}
              alt={item.settings.box_alt_text.value}
              width={40}
              height={40}
              sizes="screen"
            />
            {/* </div> */}
            <div className="flex flex-col items-center">
              {item.settings.box_heading.value && (
                <span className="component_heading promotion_heading font-heading">
                  {item.settings.box_heading.value}
                </span>
              )}
              <div
                className={
                  (cn("flex"),
                  template_type === "promotion_box"
                    ? "flex-col items-center justify-center text-center"
                    : "")
                }
                dangerouslySetInnerHTML={{
                  __html: item.settings.box_desc.value,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionBox;
