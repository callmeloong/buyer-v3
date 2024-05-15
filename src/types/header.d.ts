export type HeaderConfig = {
  [key in HeaderConfigKey]: key extends "announcement"
    ? HeaderConfigObj<AnnouncementSettings>
    : key extends "header_bar"
    ? HeaderConfigObj<HeaderBarSettings>
    : never;
};

export type HeaderConfigKey = "announcement" | "header_bar";

export interface HeaderConfigObj<T> {
  heading: string;
  id: string;
  visible: boolean;
  style: string;
  template_type: string;
  settings: T;
}

export interface AnnouncementSettings {
  announcement_content: DataSetting<string>;
  announcement_text_color: DataSetting<string>;
  announcement_background: DataSetting<string>;
}

export interface HeaderBarSettings {
  header_logo_url: DataSetting<string>;
  header_navigation_items: DataSetting<string>;
  header_center_logo: DataSetting<boolean>;
  header_content_alignment: DataSetting<string>;
  full_width: DataSetting<boolean>;
  fixed_header: DataSetting<boolean>;
  header_bg: DataSetting<string>;
  txt_color: DataSetting<string>;
  menu_bg: DataSetting<string>;
}

export interface DataSetting<T> {
  heading?: string;
  value: string;
  id: string;
  label: T;
  data_settings?: DataSetting[] | null;
}

export type NavigationResponse = {
  id: string;
  name: string;
  items: NavigationItem[];
  domain_id: string;
  store_id: string;
};

export type NavigationItem = {
  id: string;
  name: string;
  link: string;
  position: number;
  children?: NavigationItem[];
};
