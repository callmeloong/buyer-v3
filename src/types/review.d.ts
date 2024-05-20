export type Aggr = {
  avg: number;
  rate: Rate;
};

export type Rate = {
  [key: string]: number;
};

export type Review = {
  id: string;
  domain: string;
  productId: string;
  productTitle: string;
  productUrl: string;
  productImageUrl: string;
  imageReviewUrl: string;
  storeChannel: string;
  rating: number;
  title: string;
  author: string;
  email: string;
  body: string;
  country: string;
  city: string;
  createAt: string;
  reply: string;
  repliedAt: number;
  state: string;
};
