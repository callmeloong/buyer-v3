import React from "react";
import Announcement from "./Announcement";
import HeaderMinimal from "./HeaderMinimal";
import HeaderInline from "./HeaderInline";
import HeaderRich from "./HeaderRich";
import {
  AnnouncementSettings,
  HeaderBarSettings,
  HeaderConfig,
  HeaderConfigObj,
} from "@/types/header";
import { getThemeMenu } from "@/app/actions";

const Header = async ({ announcement, header_bar }: HeaderConfig) => {
  const windowSize = { width: 1980 }; //useWindowSize();

  const { template_type, settings, visible, id } = header_bar;

  return (
    <>
      <style>{`
        :root {
          --header-background: ${settings.header_bg.value};
          --color-main-menu-background: ${settings.menu_bg.value};
          --color-main-menu-text: ${settings.txt_color.value};
        }
      `}</style>
      <Announcement {...announcement} />
      {visible && <HeaderMinimal {...header_bar} />}
      {visible && template_type === "bg_header_bar_rich" && (
        <HeaderRich {...header_bar} />
      )}
      {visible && template_type === "bg_header_bar_inline" && <HeaderInline />}
    </>
  );
};

export default Header;
