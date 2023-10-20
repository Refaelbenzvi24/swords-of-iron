import {
	AppBar,
	Card,
	LinkButton,
	Main,
	Row,
	theme,
	ThemeToggle,
	Tooltip,
	Typography,
	useIsDark
} from "@acme/ui";
import SocialLinks from "~/components/SocialLinks";
import Image from "next/image";
import Logo from "~/assets/logo.png";
import Head from "next/head";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import {css} from "@emotion/css";
import tw from "twin.macro";
import IconCarbonHome from "~icons/carbon/home";
import {getProxySSGHelpers} from "~/utils/ssg"
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const videoId = context.query?.videoId as string
	const ssg = await getProxySSGHelpers(context)

	await ssg.videos.get.useQuery(videoId)

	return {
		props: {
			trpcState: ssg.dehydrate()
		},
	}
}

const Page = () => {
	const isDark = useIsDark()

	const {query} = useRouter()
	const {data: video} = api.videos.get.useQuery((query?.videoId as string) || '')


	if (!video) {
		return (
			<div className="flex h-full w-full justify-center items-center">
				<Typography variant={'h1'}>
					No video found
				</Typography>
			</div>
		)
	}

	return (
		<>
			<Head>
				<title>Never again is now</title>
				<meta name="description" content="Never again is now"/>
			</Head>

			<main className={`flex flex-col`}>
				<AppBar className={`justify-between min-[800px]:px-40 px-10`}
				        backgroundColor={'#F2F2F2'}
				        darkBackgroundColor={'#24235E'}>
					<Row className="space-x-2">
						<Row className="space-x-4">
							<Tooltip tooltip={'Home'}
							         bgColorDark={'#01002B'}
							         placement="bottom-center">
								<LinkButton
									href={'/'}
									text
									noPadding
									colorsForStates={theme.colorSchemeByState.header1}
									colorsForStatesDark={theme.colorSchemeByState.light}
									size={'22px'}
									className={`${css`
                                      ${tw`p-[10px]`};
									`}`}
									aria-label="home"
									id="home-button">
									<IconCarbonHome/>
								</LinkButton>
							</Tooltip>
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
				</AppBar>
				<Main>
					<Card
						className="flex flex-col justify-center items-centerp-6 py-[80px] w-full min-[1450px]:rounded-t-[450px] min-[1000px]:rounded-t-[300px] rounded-t-[150px]"
						bgColorDark={'#01002B'}
						noPadding>
						<div className="flex flex-col items-center">
							<Card className="flex-col rounded-xl"
							      noPadding
							      bgColor={'#D9D9D9'}
							      bgColorDark={'#D9D9D9'}>
								<video poster={`https://drive.google.com/thumbnail?sz=w400&id=${video.googleDriveId}`}
								       width={'400px'}
								       height={'700px'}
								       controls>
									<source
										src={`https://drive.google.com/uc?export=download&id=${video.googleDriveId}`}
										type='video/mp4'/>
								</video>
							</Card>
							<SocialLinks
								className="mt-2"
								downloadLink={`https://drive.google.com/uc?id=${video.googleDriveId}&export=download`}
								facebookLink={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/videos/${video.googleDriveId}`}
								twitterLink={`https://twitter.com/intent/tweet?text=Never again is now!&url=${window.location.origin}/videos/${video.googleDriveId}&hashtags=neverAgainIsNow`}
								linkedinLink={`http://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/videos/${video.googleDriveId}`}
								whatsappLink={`whatsapp://send?text=${window.location.origin}/videos/${video.googleDriveId}`}/>
						</div>
					</Card>

					<Card className="flex justify-center items-center h-[384px]"
					      bgColor={'#010040'}
					      bgColorDark={'#010040'}>
						<Image src={Logo} alt={''} height={307} width={281}/>
					</Card>
				</Main>
			</main>
		</>
	)
}

export default Page
