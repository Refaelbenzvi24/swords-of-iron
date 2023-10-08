import { CronJob } from 'cron'
import { Producer } from '@acme/message-broker'

import { getCronIntervalString, getIntervalInSec } from "./scheduling/scheduling"
import { messageBrokerConnectionParams } from "./vars"

export const publishScrapingMessage = async (interval: number) => {
	console.log(`sending message for scrape with interval ${interval}...`);
	const producer = new Producer("scraper");
	await producer.initializeProducer(messageBrokerConnectionParams);
	producer.sendMessage({ payload: "interval_scrape" });
};

export const initialJob = async () => {
	console.log("sending initial message...");
	const intervalInMili = getIntervalInSec({ minutes: 5 });
	await publishScrapingMessage(intervalInMili);
};

export const cronJobsInitializer = () => {
	const intervalInMili = getIntervalInSec({ minutes: 5 });
	const cronInterval   = getCronIntervalString({ minutes: 5 });

	const job = new CronJob(cronInterval, () => {
		console.log("sending intervaled message...");
		void (async () => await publishScrapingMessage(intervalInMili))();
	})
	job.start()
}

export const serviceInitializer = () => {
	void (() => initialJob())()
	cronJobsInitializer()
}

serviceInitializer()
