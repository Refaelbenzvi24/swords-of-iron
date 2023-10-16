import Head from "next/head";
import {AppBar, Card, Main, Row, theme, ThemeToggle, Tooltip, Typography, useIsDark} from "@acme/ui";
import {useRouter} from "next/router";
import Image from "next/image";
import {api} from "~/utils/api";
import {getProxySSGHelpers} from "~/utils/ssg"
import {GetServerSideProps} from "next";
import Logo from "../../assets/logo.png"
import LazyLoad from "react-lazyload";

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
	const isDark = useIsDark()
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
				<AppBar className={`justify-between min-[800px]:px-40 px-10`}
				        backgroundColor={'#F2F2F2'}
				        darkBackgroundColor={'#24235E'}>
					<Row className="space-x-2">
						<Row className="ltr:pl-2 rtl:pr-2">
							<Tooltip tooltip={'Theme'}
							         bgColorDark={'#01002B'}
							         placement="bottom-center">
								<div className="flex flex-row justify-center items-center">
									<ThemeToggle className="flex flex-row justify-center items-center space-x-2"
									             colorsForStates={theme.colorSchemeByState.header1}
									             colorsForStatesDark={theme.colorSchemeByState.light}>
										<Typography variant={'body'}>
											{isDark ? 'Dark mode' : 'Light mode'}
										</Typography>
									</ThemeToggle>
								</div>
							</Tooltip>
						</Row>
					</Row>
					<Row className="py-4">
						<Typography variant={'body'}>
							Videos: {videos.length}
						</Typography>
					</Row>
				</AppBar>

				<Main className="justify-center overflow-x-hidden">
					<Card className="p-6 pt-[240px] w-full rounded-t-[450px]"
					      bgColorDark={'#01002B'}
					      noPadding>
						<div
							className="grid grid-cols-1 gap-10 min-[0px]:grid-cols-1 min-[1000px]:grid-cols-2 min-[1450px]:grid-cols-3 mx-auto px-6">
							{videos.map((video) => (
								<Card className="relative overflow-hidden rounded-xl"
								      noPadding
								      bgColor={'#D9D9D9'}
								      bgColorDark={'#D9D9D9'}
								      max-width={'388px'}
								      max-height={'568px'}
								      key={video.googleDriveId}>
									<LazyLoad>
										<video className="max-w-[388px] min-w-[388px] min-h-[568px] max-h-[568px]"
										       width="388px"
										       height="568px"
										       preload="auto"
										       poster={`https://drive.google.com/thumbnail?sz=w320&id=${video.googleDriveId}`}
										       controls>
											<source
												src={`https://drive.google.com/uc?export=download&id=${video.googleDriveId}`}
												type='video/mp4'/>
										</video>
									</LazyLoad>
								</Card>
							))}
						</div>
					</Card>

					<Card className="flex justify-center items-center h-[384px]" bgColor={'#010040'}
					      bgColorDark={'#010040'}>
						<Image src={Logo} alt={''} height={307} width={281}/>
					</Card>
				</Main>
			</main>
		</>
	)
}

export default Page
