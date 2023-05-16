import Parser from 'rss-parser';
import { parseString } from 'xml2js';

export async function fetchRssFeed(url) {
  const parser = new Parser({
    customFields: {
      item: ['description'], // Add any other custom fields you want to parse
    },
  });

  try {
    const response = await fetch(url);
    const xml = await response.text();
    const feed = await new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });

    return feed.rss.channel[0].item;
  } catch (error) {
    console.error('Failed to fetch and parse RSS feed:', error);
    return [];
  }
}