import {Card, Row, theme, Typography} from "@acme/ui";
import Image from "next/image";
import {api} from "~/utils/api";
import Logo from "../../assets/logo.png"
import LazyLoad from "react-lazyload";
import clsx from "clsx";
import {forwardRef} from "react";
import SocialLinks from "~/components/SocialLinks";

interface VideosProps {
	className?: string
	language?: string
}

const Videos = forwardRef<HTMLDivElement, VideosProps>((({className, language}, ref) => {
	const {data: videos} = api.videos.all.useQuery(language || '')

	return (
		<div ref={ref}>
			{!!videos && !!language && (
				<Card className={`flex flex-col ${clsx(className)}`}
				      bgColor={'#F2F2F2'}
				      bgColorDark={'#24235E'}
				      noPadding>

					<Row className="px-10 mt-24 justify-end w-full">
						<Typography variant={'body'}>
							{videos.length} videos
						</Typography>
					</Row>
					<Card
						className="p-6 min-[1450px]:pt-[240px] min-[1000px]:pt-[140px] pt-[80px] w-full min-[1450px]:rounded-t-[450px] min-[1000px]:rounded-t-[300px] rounded-t-[150px]"
						bgColorDark={'#01002B'}
						noPadding>
						<div
							className="grid grid-cols-1 gap-10 min-[0px]:grid-cols-1 min-[1000px]:grid-cols-2 min-[1450px]:grid-cols-3 mx-auto px-6">
							{videos.map((video) => (
									<div className="flex flex-col items-center" key={video.googleDriveId}>
										<Card className="flex-col rounded-xl"
										      noPadding
										      height={'568px'}
										      width={'388px'}
										      bgColor={'#D9D9D9'}
										      bgColorDark={'#D9D9D9'}
										      >
											<LazyLoad>
												<video
													className="max-w-[388px] min-w-[388px] min-h-[568px] max-h-[568px]"
													width="388px"
													height="568px"
													preload="none"
													poster={`https://drive.google.com/thumbnail?sz=w320&id=${video.googleDriveId}`}
													controls>
													<source
														src={`https://drive.google.com/uc?export=download&id=${video.googleDriveId}`}
														type='video/mp4'/>
												</video>
											</LazyLoad>
										</Card>
										<SocialLinks
											className="mt-2"
											downloadLink={`https://drive.google.com/uc?id=${video.googleDriveId}&export=download`}
											facebookLink={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/videos/${video.googleDriveId}`}
											twitterLink={`https://twitter.com/intent/tweet?text=Never again is now!&url=${window.location.origin}/videos/${video.googleDriveId}&hashtags=neverAgainIsNow`}
											linkedinLink={`http://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/videos/${video.googleDriveId}`}
											whatsappLink={`whatsapp://send?text=${window.location.origin}/videos/${video.googleDriveId}`}/>
									</div>
								))}
						</div>
					</Card>

					<Card className="flex justify-center items-center h-[384px]"
					      bgColor={'#010040'}
					      bgColorDark={'#010040'}>
						<Image src={Logo} alt={''} height={307} width={281}/>
					</Card>
				</Card>
			)}
		</div>
	)
}))

export default Videos
