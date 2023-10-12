import Head from "next/head";
import {Row, Typography} from "@acme/ui";
import _ from "lodash";
import {useRouter} from "next/router";
import Image from "next/image";
import {api} from "~/utils/api";
import {getProxySSGHelpers} from "~/utils/ssg"
import {GetServerSideProps} from "next";
import LinkCard from "@acme/ui/src/nextjs/components/Cards/LinkCard";
import {ReactElement} from "react";
import MainLayout from "~/layouts/MainLayout";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const search = context.query?.lang as string
	const ssg = await getProxySSGHelpers(context)

	await ssg.videos.all.useQuery({limit: 20, search})

	return {
		props: {
			trpcState: ssg.dehydrate()
		},
	}
}

const Page = () => {
	const {query} = useRouter()

	const {data: videos} = api.videos.all.useQuery(query?.lang as string)

	if (!videos) return null

	return (
		<>
			<Head>
				<title>Swords Of Iron | Admin</title>
				<meta name="description" content="Swords Of Iron"/>
			</Head>

			<main className="flex flex-col items-center">
				<div
					className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:max-w-[800px] lg:max-w-[1200px] mx-auto px-6">
					{videos.map((video) => (
						// <LinkCard href={`/${query.lang}/${video.googleDriveId}`}
						//           noPadding
						//           max-height={'200px'}
						//           max-width={'300px'}
						//           key={video.googleDriveId}>
						// 	<Image src={`https://drive.google.com/thumbnail?sz=w320&id=${video.googleDriveId}`}
						// 	       className="object-cover"
						// 	       alt={'video'}
						// 	       width={400}
						// 	       height={200}
						// 	       sizes="100vw"
						// 	       style={{ width: '100%', height: '200px' }}/>
						// </LinkCard>
						<video class="gdriveVideo" preload="auto" controls>
							<source src={`https://drive.google.com/uc?export=download&id=${query.videoId}`} type='video/mp4'>
						</video>
						
					))}
				</div>

				<Row className="py-4">
					<Typography variant={'body'}>
						Videos: {videos.length}
					</Typography>
				</Row>
			</main>
		</>
	)
}

Page.getLayout = (page: ReactElement) => (
	<MainLayout>
		{page}
	</MainLayout>
)

export default Page
