import Head from "next/head";
import {Card, Row, theme, Typography} from "@acme/ui";
import _ from "lodash";
import {useRouter} from "next/router";
import Image from "next/image";
import {api} from "~/utils/api";
import {getProxySSGHelpers} from "~/utils/ssg"
import {getServerSession} from "@acme/auth";
import {GetServerSideProps} from "next";
import LinkCard from "@acme/ui/src/nextjs/components/Cards/LinkCard";

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

			<main className="flex flex-col h-full justify-center items-center">
				<Row>
					<Typography variant={'body'}>
						Videos: {videos.length}
					</Typography>
				</Row>
				<div
					className="grid grid-cols-1 pt-4 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:max-w-[800px] lg:max-w-[1200px] mx-auto px-6">
					{videos.map((video, index) => (
						<LinkCard maxHeight={'200px'} maxWidth={'300px'} href={`/${query.lang}/${video.id}`}
						          key={_.uniqueId(`${index}-language-`)}>
							<Image src={`https://drive.google.com/thumbnail?sz=w320&id=${video.id}`}
							       className="object-cover"
							       alt={'video'}
							       width={300}
							       height={200}/>
						</LinkCard>
					))}
				</div>
			</main>
		</>
	)
}

export default Page
