import Header from "@/components/common/header/Header";
import React from "react";
import { getThemeConfigs } from "../actions";

type Props = { children: React.ReactNode };

export default async function HomeLayout({ children }: Props) {
  const themeConfigs = await getThemeConfigs();
  const header = themeConfigs.object_config.header;
  return (
    <div>
      <Header {...header} />
      {children}
    </div>
  );
}
