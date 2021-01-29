import xml2js from "https://dev.jspm.io/xml2js";
import { v4 } from "https://deno.land/std@0.84.0/uuid/mod.ts";

type news = {
  rss: {
    channel: [
      {
        item: [
          {
            title: string[];
            description: string[];
            link: string[];
            pubDate: Date[];
          }
        ];
      }
    ];
  };
};

export type newsItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: Date;
  image: string;
};

export async function getNewsItems() {
  const newsItems: newsItem[] = [];

  try {
    const data = await fetch(
      "https://www.dr.dk/nyheder/service/feeds/allenyheder/"
    ).then((response) => response.text());
    const result: news = await xml2js.parseStringPromise(data);
    if (result?.rss?.channel && Array.isArray(result?.rss?.channel)) {
      const items = result.rss.channel[0]?.item;
      if (items && Array.isArray(items)) {
        for (const news of items) {
          const { title, description, link, pubDate } = news;
          let image;
          try {
            image = news["DR:XmlImageArticle"][0]["DR:ImageUri620x349"][0];
          } catch {
            image = "";
          }

          const id = v4.generate();
          newsItems.push({
            id,
            title: title[0],
            description: description[0],
            link: link[0],
            pubDate: pubDate[0],
            image,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return newsItems;
}
