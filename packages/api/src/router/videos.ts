import ffmpeg from "fluent-ffmpeg";
import {z} from "zod";

import videosJson from "../constants/videos.json";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const videosRouter = createTRPCRouter({
	all: publicProcedure.input(z.string()).query(({  input: lang }) => {
		return videosJson.filter(video => video.language.toLowerCase() === lang?.toLowerCase())
	}),
	get: publicProcedure.input(z.string()).query(({  input: id }) => {
		return videosJson.find(video => video.googleDriveId === id)
	})
});
