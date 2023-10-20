import Head from "next/head";
import {
	selectColors,
	Select,
	theme,
	Typography,
	selectComponents,
	Main,
	AppBar,
	Row,
	Tooltip,
	ThemeToggle, useIsDark, Button
} from "@acme/ui";
import {useRef, useState} from "react";
import {css} from "@emotion/css";
import languages from "../components/languages";
import {type SelectOption} from "@acme/ui/src/nextjs/components/Form/Select/Select";
import Videos from "~/components/Home/Videos";
import tw from "twin.macro";
import IconCarbonHome from "~icons/carbon/home";

const pageBackground = css`
  background-image: url('./HomePageBackground.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const Page = () => {
	const [selectedLanguage, setSelectedLanguage] = useState('')

	const videosElementRef = useRef<HTMLDivElement>(null)

	const isDark = useIsDark()

	const handleLanguageChange = async (language: string) => {
		setSelectedLanguage(language.toLowerCase())
		if (videosElementRef.current) {
			const videosElementTop = videosElementRef.current.getBoundingClientRect().top
			const interval = setInterval(() => {
				if (videosElementRef.current && videosElementRef.current.getBoundingClientRect().width > 200) {
					window.scrollTo({
						top: videosElementTop
					})
					clearInterval(interval)
				}
			}, 400)
		}
	}

	return (
		<>
			<Head>
				<title>Never again is now</title>
				<meta name="description" content="Never again is now"/>
			</Head>

			<main className={`flex h-full w-full ${pageBackground}`}>
				<AppBar className={`justify-between min-[800px]:px-40 px-10`}
				        backgroundColor={'#F2F2F2'}
				        darkBackgroundColor={'#24235E'}>
					<Row className="space-x-2">
						<Row className="space-x-4">
							<Tooltip tooltip={'Home'}
							         bgColorDark={'#01002B'}
							         placement="bottom-center">
								<Button
									onClick={() => window.scrollTo({top: 0})}
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
								</Button>
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
					<div className={`flex flex-col space-y-20 min-h-full w-full justify-center items-center`}>
						<Typography className="text-center"
						            color={theme.colorScheme.light}
						            darkColor={theme.colorScheme.light}
						            variant={'h1'}>
							Never again is now
						</Typography>

						<Select className="w-80"
						        placeholder="Select Language"
						        dark
						        colorsDark={{
							        menu: {
								        menuBackgroundColor: '#D9D9D988',
							        },
							        placeholder: {
								        placeholderTextColor: theme.colorScheme.light
							        },
							        control: {
								        ...selectColors.defaultColorsDark.control,
								        opacity: 0.4,
								        inputBackgroundColor: '#D9D9D988',
							        },
							        loadingIndicator: {
								        loadingIndicatorColor: theme.colorScheme.light
							        },
							        dropdownIndicator: {
								        dropdownIndicatorColor: theme.colorScheme.light
							        }
						        }}
						        onChange={(selected) => handleLanguageChange((selected as SelectOption).value)}
						        isSearchable
						        closeMenuOnSelect={false}
						        components={{
							        Option: ({data, ...props}) => (
								        <selectComponents.Option {...props} data={data}>
									        <div className="flex flex-row">
										        {data.icon}
										        <Typography className="ml-2"
										                    color={theme.colorScheme.light}
										                    darkColor={theme.colorScheme.light}
										                    variant={'body'}>
											        {data.label}
										        </Typography>
									        </div>
								        </selectComponents.Option>
							        ),
							        SingleValue: ({data, ...props}) => (
								        <selectComponents.SingleValue {...props} data={data}>
									        <div className="flex flex-row">
										        {data.icon}
										        <Typography className="ml-2"
										                    color={theme.colorScheme.light}
										                    darkColor={theme.colorScheme.light}
										                    variant={'body'}>
											        {data.label}
										        </Typography>
									        </div>
								        </selectComponents.SingleValue>
							        )
						        }}
						        options={languages}/>
					</div>

						<Videos ref={videosElementRef} className="videos-element-wrapper" language={selectedLanguage}/>
				</Main>
			</main>
		</>
	)
}

export default Page
