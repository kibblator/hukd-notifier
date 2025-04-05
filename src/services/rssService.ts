import axios from "axios";
import { parseString } from "xml2js";
import { RSSFeed } from "../types/rssTypes";
import { DealItem } from "../types/dealTypes";

export class RssService {
  private rssFeedUrl: string;

  constructor(rssFeedUrl: string) {
    this.rssFeedUrl = rssFeedUrl;
  }

  getRssFeedItems = async (): Promise<DealItem[]> => {
    let rssItems: DealItem[];
    try {
      const feedResponse = await axios.get(this.rssFeedUrl);

      parseString(
        feedResponse.data,
        { explicitArray: false },
        (err, result: RSSFeed) => {
          if (err) {
            console.error(err);
            return;
          }

          if (result.rss.channel.item) {
            rssItems = result.rss.channel.item.map((item) => {
              return {
                title: item.title,
                link: item.link,
                pubDate: new Date(item.pubDate),
                guid: item.guid,
              } as DealItem;
            });
          } else {
            rssItems = [];
          }
        }
      );
      return rssItems;
    } catch (error) {
      console.error(error);
    }
  };
}
