export type MediaContent = {
  $: {
    medium: string;
    url: string;
    width: string;
    height: string;
  };
};

export type PepperMerchant = {
  $: {
    name: string;
    price: string;
  };
};

export type AtomLink = {
  $: {
    href: string;
    rel: string;
    type: string;
  };
};

export type Item = {
  category: string;
  "pepper:merchant": PepperMerchant;
  "media:content": MediaContent;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
};

export type Channel = {
  title: string;
  description: string;
  link: string;
  "atom:link": AtomLink;
  item: Item[];
};

export type RSS = {
  $: {
    "xmlns:content": string;
    "xmlns:wfw": string;
    "xmlns:dc": string;
    "xmlns:atom": string;
    "xmlns:sy": string;
    "xmlns:slash": string;
    "xmlns:media": string;
    "xmlns:pepper": string;
    version: string;
  };
  channel: Channel;
};

export type RSSFeed = {
  rss: RSS;
};
