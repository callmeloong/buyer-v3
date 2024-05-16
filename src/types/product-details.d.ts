export type ProductDetails = {
  personalizes: null;
  product_types: ProductType[];
  is_personalize: null;
  variants: Variant[];
  title: string;
  store_channels: StoreChannel[];
  collections: any[];
  vendor: string;
  compare_price: number;
  price: number;
  layers: Layer[];
  options: ProductDetailsOption[];
  is_custom: boolean;
  id: string;
  seo_desc: string;
  uri: string;
  mockup: Mockup;
  seo_title: string;
  tags: string;
  product_type: string;
  user_id: string;
  mockups: Mockup[];
  short_desc: string;
  designs: Design[];
  category: string;
  status: string;
  mockup_id: string;
  desc: string;
};

export type Design = {
  product_type_ids: null;
  src: string;
  printable_width: string;
  created_at: string;
  type: string;
  printable_left: string;
  printable_height: string;
  updated_at: null;
  printable_top: string;
  width: string;
  position: number;
  id: string;
  custom_data: null;
  height: string;
  short_code: string;
};

export type Layer = {
  background_color: null;
  type: string;
  items: Item[];
  short_code: string;
};

export type Item = {
  z_index: number;
  printable_height: string;
  printable_top: string;
  printable_width: string;
  rotation: string;
  type: string;
  opacity: string;
  printable_left: string;
  url: string;
};

export type Mockup = {
  src: string;
  id: string;
  position: number;
  source: Source;
};

export type ProductDetailsOption = {
  values: OptionValue[];
  name: string;
  display_name: string;
};

export type OptionValue = {
  name: string;
  id: string;
  position: number;
  type: Type;
  value: string;
};

export type ProductType = {
  name: string;
  id: string;
  position: number;
  short_code: string;
};

export type StoreChannel = {
  domain_id: string;
  domain_name: string;
  name: string;
  channel: string;
  id: string;
};

export type Variant = {
  cost: string;
  fulfillment_sku: null;
  created_at: string;
  color_value: string;
  mockup: Mockup;
  size_name: string;
  short_code_name: string;
  color_id: string;
  updated_at: string | null;
  price: string;
  compare_price: string;
  name: string;
  size_id: string;
  bgp_mockup_id: string;
  id: string;
  state: State;
  position: number;
  color_name: string;
  sku: string;
  short_code: string;
  mockup_id: string;
};
