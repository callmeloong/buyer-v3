import React from "react";
import { getThemeConfigs } from "../actions";
import { find } from "lodash";
import { Metadata } from "next";
import HomeSlideShow from "./_components/home-slide-show";
import CollectionList from "./_components/collection-list";
import RichText from "./_components/rich-text";
import PromotionBox from "./_components/promotion-box";
import ImgNText from "./_components/img-and-text";

type Props = {};

export async function generateMetadata(): Promise<Metadata> {
  const themeConfigs = await getThemeConfigs();
  const pageConfig = find(themeConfigs.object_config.pages, {
    page_id: "bg_home_page",
  });

  return {
    title: pageConfig.page_name,
  };
}

export default async function Page({}: Props) {
  const themeConfigs = await getThemeConfigs();
  const pageConfig = find(themeConfigs.object_config.pages, {
    page_id: "bg_home_page",
  });
  const themeSettings = themeConfigs.object_config.theme_settings;

  const getComponentSettings = (id: string) => {
    return find(pageConfig.components, { id: id }).settings;
  };

  const getChildrenItems = (id: string) => {
    return find(pageConfig.components, { id: id }).children_items;
  };

  return (
    <main className="flex flex-col lg:px-0">
      {pageConfig?.components.map((item: any) => {
        if (!item.visible) return <></>;
        if (item.id.includes("home_slideshow"))
          return (
            <HomeSlideShow
              key={item.id}
              {...getComponentSettings(item.id)}
              children_items={getChildrenItems(item.id)}
            />
          );
        if (item.id.includes("home_collection"))
          return (
            <CollectionList
              key={item.id}
              {...getComponentSettings(item.id)}
              children_items={getChildrenItems(item.id)}
            />
          );
        if (item.id.includes("home_rich_text"))
          return (
            <RichText
              key={item.id}
              {...getComponentSettings(item.id)}
              children_items={getChildrenItems(item.id)}
            />
          );
        if (item.id.includes("home_promotion_box"))
          return (
            <PromotionBox
              key={item.id}
              compConfig={item}
              themeSetting={themeSettings}
            />
          );
        if (item.id.includes("home_image_n_text"))
          return (
            <ImgNText
              key={item.id}
              {...getComponentSettings(item.id)}
              template_type={item.template_type}
            />
          );
      })}
    </main>
  );
}
