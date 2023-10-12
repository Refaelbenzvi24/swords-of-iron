import Head from "next/head";
import {LinkButton, theme, Typography} from "@acme/ui";
import {ReactElement} from "react";
import MainLayout from "~/layouts/MainLayout";
import _ from "lodash"
import IconTwemojiFlagSouthAfrica from "~icons/twemoji/flag-south-africa";
import IconTwemojiFlagAlbania from "~icons/twemoji/flag-albania";
import IconOouiBoldArabDad from "~icons/ooui/bold-arab-dad";
import IconTwemojiFlagAzerbaijan from "~icons/twemoji/flag-azerbaijan";
import IconTwemojiFlagCongoBrazzaville from "~icons/twemoji/flag-congo-brazzaville";
import IconTwemojiFlagBulgaria from "~icons/twemoji/flag-bulgaria";
import IconTwemojiFlagChina from "~icons/twemoji/flag-china";
import IconTwemojiFlagCroatia from "~icons/twemoji/flag-croatia";
import IconTwemojiFlagCzechia from "~icons/twemoji/flag-czechia";
import IconTwemojiFlagDenmark from "~icons/twemoji/flag-denmark";
import IconTwemojiFlagNetherlands from "~icons/twemoji/flag-netherlands";
import IconTwemojiFlagForFlagUnitedStates from "~icons/twemoji/flag-for-flag-united-states";
import IconTwemojiFlagEstonia from "~icons/twemoji/flag-estonia";
import IconTwemojiFlagPhilippines from "~icons/twemoji/flag-philippines";
import IconTwemojiFlagFinland from "~icons/twemoji/flag-finland";
import IconTwemojiFlagFrance from "~icons/twemoji/flag-france";
import IconTwemojiFlagGeorgia from "~icons/twemoji/flag-georgia";
import IconTwemojiFlagGermany from "~icons/twemoji/flag-germany";
import IconTwemojiFlagIndia from "~icons/twemoji/flag-india";
import IconTwemojiFlagHungary from "~icons/twemoji/flag-hungary";
import IconTwemojiFlagIndonesia from "~icons/twemoji/flag-indonesia";
import IconTwemojiFlagIreland from "~icons/twemoji/flag-ireland";
import IconTwemojiFlagItaly from "~icons/twemoji/flag-italy";
import IconTwemojiFlagJapan from "~icons/twemoji/flag-japan";
import TwemojiFlagSouthKorea from "~icons/twemoji/flag-south-korea";
import IconTwemojiFlagLatvia from "~icons/twemoji/flag-latvia";
import IconTwemojiFlagGreek from "~icons/twemoji/flag-greece";
import IconTwemojiFlagRomania from "~icons/twemoji/flag-romania";
import IconTwemojiFlagRussia from "~icons/twemoji/flag-russia";
import IconTwemojiFlagSpain from "~icons/twemoji/flag-spain";
import IconTwemojiFlagSwedia from "~icons/twemoji/flag-sweden";
import IconTwemojiFlagTurkey from "~icons/twemoji/flag-turkey";
import IconTwemojiFlagUkraine from "~icons/twemoji/flag-ukraine";
import IconTwemojiFlagVitname from "~icons/twemoji/flag-vietnam";
import IconTwemojiFlagLithuania from "~icons/twemoji/flag-lithuania";
import IconTwemojiFlagMalaysia from "~icons/twemoji/flag-malaysia";
import IconTwemojiFlagMongolia from "~icons/twemoji/flag-mongolia";
import TwemojiFlagNorway from "~icons/twemoji/flag-norway";
import IconTwemojiFlagIran from "~icons/twemoji/flag-iran";
import IconTwemojiFlagPoland from "~icons/twemoji/flag-poland";
import IconTwemojiFlagPortugal from "~icons/twemoji/flag-portugal";
import IconTwemojiFlagThailand from "~icons/twemoji/flag-thailand";
import IconTwemojiFlagSlovenia from "~icons/twemoji/flag-slovenia";


const Page = () => {
	const languages = [
		{title: "Afrikaans", icon: <IconTwemojiFlagSouthAfrica/>},
		{title: "Albanian", icon: <IconTwemojiFlagAlbania/>},
		{title: "Arabic", icon: <IconOouiBoldArabDad/>},
		{title: "Azerbaijani", icon: <IconTwemojiFlagAzerbaijan/>},
		{title: "Brazillian", icon: <IconTwemojiFlagCongoBrazzaville/>},
		{title: "Bulgarian", icon: <IconTwemojiFlagBulgaria/>},
		{title: "Chinese", icon: <IconTwemojiFlagChina/>},
		{title: "Croatian", icon: <IconTwemojiFlagCroatia/>},
		{title: "Czech", icon: <IconTwemojiFlagCzechia/>},
		{title: "Danish", icon: <IconTwemojiFlagDenmark/>},
		{title: "Dutch", icon: <IconTwemojiFlagNetherlands/>},
		{title: "English", icon: <IconTwemojiFlagForFlagUnitedStates/>},
		{title: "Estonian", icon: <IconTwemojiFlagEstonia/>},
		{title: "Filipino", icon: <IconTwemojiFlagPhilippines/>},
		{title: "Finnish", icon: <IconTwemojiFlagFinland/>},
		{title: "French", icon: <IconTwemojiFlagFrance/>},
		{title: "Georgian", icon: <IconTwemojiFlagGeorgia/>},
		{title: "German", icon: <IconTwemojiFlagGermany/>},
		{title: "Hindi", icon: <IconTwemojiFlagIndia/>},
		{title: "Hungarian", icon: <IconTwemojiFlagHungary/>},
		{title: "Indonesian", icon: <IconTwemojiFlagIndonesia/>},
		{title: "Irish", icon: <IconTwemojiFlagIreland/>},
		{title: "Italian", icon: <IconTwemojiFlagItaly/>},
		{title: "Japanese", icon: <IconTwemojiFlagJapan/>},
		{title: "Korean", icon: <TwemojiFlagSouthKorea/>},
		{title: "Latvian", icon: <IconTwemojiFlagLatvia/>},
		{title: "Lithuanian", icon: <IconTwemojiFlagLithuania/>},
		{title: "Malay", icon: <IconTwemojiFlagMalaysia/>},
		{title: "Modern Greek", icon: <IconTwemojiFlagGreek/>},
		{title: "Mongolian", icon: <IconTwemojiFlagMongolia/>},
		{title: "Norwegian", icon: <TwemojiFlagNorway/>},
		{title: "Persian", icon: <IconTwemojiFlagIran/>},
		{title: "Polish", icon: <IconTwemojiFlagPoland/>},
		{title: "Portuguese", icon: <IconTwemojiFlagPortugal/>},
		{title: "Romanian", icon: <IconTwemojiFlagRomania/>},
		{title: "Russian", icon: <IconTwemojiFlagRussia/>},
		{title: "Slovenian", icon: <IconTwemojiFlagSlovenia/>},
		{title: "Spanish", icon: <IconTwemojiFlagSpain/>},
		{title: "Swedish", icon: <IconTwemojiFlagSwedia/>},
		{title: "Tamil", icon: ''},
		{title: "Thai", icon: <IconTwemojiFlagThailand/>},
		{title: "Turkish", icon: <IconTwemojiFlagTurkey/>},
		{title: "Ukrainian", icon: <IconTwemojiFlagUkraine/>},
		{title: "Viatnamese", icon:<IconTwemojiFlagVitname/>}
	]

	return (
		<>
			<Head>
				<title>Swords Of Iron | Admin</title>
				<meta name="description" content="Swords Of Iron"/>
			</Head>

			<main className="flex h-full justify-center items-center">
				<div className="grid grid-cols-4 gap-5 lg:max-w-[1000px] mx-auto px-6">
					{languages.map((language, index) => (
						<LinkButton className="flex" href={`/${_.lowerCase(language.title)}`} key={_.uniqueId(`${index}-language-`)}>
							<span className="px-1.5 text-xl">{language.icon}</span>
							<Typography className="whitespace-nowrap" variant={'body'} color={theme.colorScheme.light}>
								{language.title}
							</Typography>
						</LinkButton>
					))}
				</div>
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
