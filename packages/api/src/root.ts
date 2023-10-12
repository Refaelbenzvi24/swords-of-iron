import {authRouter} from "./router/auth"
import {createTRPCRouter} from "./trpc"
import {videosRouter} from "./router/videos";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	videos: videosRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
