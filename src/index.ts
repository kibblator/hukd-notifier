import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cron from "node-cron";

import { RssService } from "./services/rssService";
import { DealRepo } from "./repositories/dealRepository";
import { TelegramService } from "./services/telegramService";
import { sleep } from "./utils/threadHelper";
import { getEnv } from "./utils/env";

const environment = process.env.NODE_ENV || "development";
const envFileName = `.env.${environment}`;
dotenv.config({ path: envFileName });

const {
  RSS_FEED_URL,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID,
  CLEANUP_CRON,
  DEAL_SCHEDULE_CRON,
} = getEnv();

const app = express();
const port = process.env.PORT || 3000;

const dealsRepo = new DealRepo();
const telegramService = new TelegramService(
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID
);
const rssService = new RssService(RSS_FEED_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (_, res) => {
  try {
    const items = await rssService.getRssFeedItems();

    const existingDeals = dealsRepo.findDealsByGuids(items.map((i) => i.guid));
    const newDeals = items.filter(
      (deal) => !existingDeals.some((f) => f.guid === deal.guid)
    );

    console.log(`New items: ${newDeals.length} items to add`);

    for (var deal of newDeals) {
      dealsRepo.addDeal(deal);
      await telegramService.sendMessage(
        `New deal found!\n<a href="${deal.link}">${deal.title}</a>`
      );
      await sleep(500);
    }

    res.send("Successfully added deals");
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cleanup", async (req, res) => {
  try {
    dealsRepo.deleteDealsOlderThanAMonth();
    res.send("Cleanup complete");
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cron.schedule(CLEANUP_CRON, async () => {
  try {
    const res = await axios.get(`http://localhost:${port}/cleanup`);
    console.log("Scheduled cleanup:", res.data);
  } catch (err) {}
});

cron.schedule(DEAL_SCHEDULE_CRON, async () => {
  try {
    const res = await axios.get(`http://localhost:${port}/`);
    console.log("Scheduled deal alerts:", res.data);
  } catch (err) {}
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
