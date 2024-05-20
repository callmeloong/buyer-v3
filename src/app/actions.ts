"use server";

import { PagingData, TApiPath } from "@/types/common";
import { Aggr, Review } from "@/types/review";
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

export const getProductDetails = async (uri: string) => {
  const domainInfo = await getDomainInfo();
  const reqHeaders = new Headers();
  reqHeaders.set("X-Store-Domain", domainInfo.store_domain);
  const productDetails = await handleFetching(
    "PRODUCT",
    `/public/products/${uri}`,
    { headers: reqHeaders }
  );

  return productDetails;
};

// export const getProductTabs = async (shortCode: string) => {
//   const domainInfo = await getDomainInfo();
//   const reqHeaders = new Headers();
//   reqHeaders.set("X-Store-Domain", domainInfo.store_domain);
//   const productTabs =
// };

export const getStoreReviews = async (page: string, page_size: string) => {
  const domainInfo = await getDomainInfo();
  const reqHeaders = new Headers();
  reqHeaders.set("X-Store-Domain", domainInfo.store_domain);
  const queryParams = new URLSearchParams({
    domain_name: domainInfo.domain_name,
    page: page,
    page_size: page_size,
    sort: "Most Recent",
    is_image: "true",
  });
  const storeReviews = await handleFetching(
    "ADDON",
    `/apps/product-review?${queryParams}`,
    { headers: reqHeaders }
  );

  return storeReviews as PagingData<Review[]> & {
    totalImage: number;
    aggr: Aggr;
  };
};

export const getProductReviews = async (
  id: string,
  page: string,
  page_size: string
) => {
  const domainInfo = await getDomainInfo();
  const reqHeaders = new Headers();
  reqHeaders.set("X-Store-Domain", domainInfo.store_domain);
  const queryParams = new URLSearchParams({
    domain_name: domainInfo.domain_name,
    page: page,
    page_size: page_size,
    sort: "Most Recent",
    is_image: "true",
  });
  const productReviews = await handleFetching(
    "ADDON",
    `/apps/product-review/${id}?${queryParams}`,
    { headers: reqHeaders }
  );

  return productReviews as PagingData<Review[]> & {
    totalImage: number;
    aggr: Aggr;
  };
};
