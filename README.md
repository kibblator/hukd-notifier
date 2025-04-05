# hukd-notifier

A small containerised node app to alert the user when they have a new deal available in their HUKD RSS Feed

# Docker Run

### Without custom CRON schedules

```
$ docker run -p 3000:3000 --restart=always -d --name hukd-notifier -e RSS_FEED_URL="$RSS_FEED_URL" -e TELEGRAM_BOT_TOKEN="$TELEGRAM_BOT_TOKEN" -e TELEGRAM_CHAT_ID="$TELEGRAM_CHAT_ID" -e TZ="Europe/London" -v /your/host/dir:/usr/src/app/database {{repo name}}
```

By default if you don't set either of the CRON values they will be as follows:
<br>
`CLEANUP_CRON="0 0 * * *"`
<br>
`DEAL_SCHEDULE_CRON="0 * * * *"`

### With custom CRON schedules

```
$ docker run -p 3000:3000 --restart=always -d --name hukd-notifier -e RSS_FEED_URL="$RSS_FEED_URL" -e TELEGRAM_BOT_TOKEN="$TELEGRAM_BOT_TOKEN" -e TELEGRAM_CHAT_ID="$TELEGRAM_CHAT_ID" -e CLEANUP_CRON="0 0 * * *" -e DEAL_SCHEDULE_CRON="0 * * * *" -e TZ="Europe/London" -v /your/host/dir:/usr/src/app/database {{repo name}}
```

## Getting a Telegram Bot token

If you don't know how to get a telegram bot token a guide can be found [here](https://core.telegram.org/bots/tutorial)
As stated in the guide, your token should be something like `4839574812:AAFD39kkdpWt3ywyRZergyOLMaJhac60qc`

## Getting your RSS feed url from HUKD

In order to obtain your RSS feed url, you need to go to https://www.hotukdeals.com/ and click on **_Alerts_** from the top bar and then **_Alerts feed_**.
<br>
There should be a section called `My alerts` and at the bottom will be `My alert RSS feed`. Copy this link and use it for the `RSS_FEED_URL` environment variable

![RSS feed link](docs/rssfeed.png)

## Setting up alerts

In the same area as above you can also setup new alerts using the **_New alert_** box.
<br><br>
Simply type in the keyword of what it is you're looking for and select the desired heat for getting notified. When something is found it'll be added to the RSS feed and therefore notified to you via the application

![Create new alert](docs/newalert.png)
