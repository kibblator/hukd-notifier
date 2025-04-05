import { EnvVars } from "../types/envTypes";

const defaultCleanupCron = "0 0 * * *";
const defaultDealScheduleCron = "0 * * * *";

export const getEnv = (): EnvVars => {
  if (!process.env.RSS_FEED_URL) {
    throw new Error("Missing required env: RSS_FEED_URL");
  }

  if (!process.env.TELEGRAM_CHAT_ID) {
    throw new Error("Missing required env: TELEGRAM_CHAT_ID");
  }

  if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("Missing required env: TELEGRAM_BOT_TOKEN");
  }

  return {
    RSS_FEED_URL: process.env.RSS_FEED_URL,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    CLEANUP_CRON: process.env.CLEANUP_CRON || defaultCleanupCron,
    DEAL_SCHEDULE_CRON:
      process.env.DEAL_SCHEDULE_CRON || defaultDealScheduleCron,
  };
};
