"use server";

import { TApiPath } from "@/types/common";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const handleFetching = async (
  path: TApiPath,
  endpoint: string,
  options?: RequestInit
) => {
  try {
    const url = `${process.env[`API_PATH_${path}`]}${
      endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    }`;
    const res = await fetch(url, { ...options });
    const { data } = await res.json();
    return data;
  } catch (error) {}
};

const getDomainInfo = async () => {
  const host = headers().get("host");
  const reqHeaders = new Headers();
  reqHeaders.set(
    "X-Host",
    !host?.includes("localhost") ? host! : process.env.X_HOST!
  );
  const res = await handleFetching("PRODUCT", "public/domains/info", {
    headers: reqHeaders,
  });
  return res;
};

export const getThemeConfigs = async () => {
  const domainInfo = await getDomainInfo();
  const themeConfigs = await handleFetching(
    "ADDON",
    `/app/themes?store_id=${domainInfo.store_id}`
  );
  return themeConfigs;
};

export const getThemeMenu = async (menuId: string) => {
  const domainInfo = await getDomainInfo();
  const menu = await handleFetching(
    "ADDON",
    `/app/themes/menus/${menuId}?store_id=${domainInfo.store_id}`
  );
  return menu;
};
