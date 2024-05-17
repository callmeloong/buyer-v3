export type Aggregation = {
  name: string;
  type: string;
  values: OptionValue[];
};

export type OptionValue = {
  id: string;
  name: string;
  value: string;
  type: string;
  position: number | null;
  count?: number;
};

export type Product = {
  desc: string;
  id: string;
  price: number;
  status: string;
  tags: string;
  title: string;
  uri: string;
  options: Option[];
  created_at: null;
  end_time: null;
  fb_pixel: null;
  gg_pixel: null;
  image_url: string;
  compare_price: number;
  seo_desc: null;
  seo_image_cover: null;
  seo_title: null;
  start_time: null;
  review_total: number;
  review_score: number;
};

export type ProductOption = {
  name: string;
  values: OptionValue[];
  display_name: null;
};
