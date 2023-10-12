import Head from "next/head";
import {LinkButton,  theme, Typography} from "@acme/ui";
import {ReactElement} from "react";
import MainLayout from "~/layouts/MainLayout";
import _ from "lodash"

const Page = () => {
	const languages = [
		"Afrikaans",
		"Albanian",
		"Arabic",
		"Azerbaijani",
		"Brazillian",
		"Bulgarian",
		"Chinese",
		"Croatian",
		"Czech",
		"Danish",
		"Dutch",
		"English",
		"Estonian",
		"Filipino",
		"Finnish",
		"French",
		"Georgian",
		"German",
		"Hindi",
		"Hungarian",
		"Indonesian",
		"Irish",
		"Italian",
		"Japanese",
		"Korean",
		"Latvian",
		"Lithuanian",
		"Malay",
		"Modern Greek",
		"Mongolian",
		"Norwegian",
		"Persian",
		"Polish",
		"Portuguese",
		"Romanian",
		"Russian",
		"Slovenian",
		"Spanish",
		"Swedish",
		"Tamil",
		"Thai",
		"Turkish",
		"Ukrainian",
		"Viatnamese"
	]

	return (
		<>
			<Head>
				<title>Swords Of Iron | Admin</title>
				<meta name="description" content="Swords Of Iron"/>
			</Head>

			<main className="flex h-full justify-center items-center">
				<div className="grid grid-cols-4 gap-5 lg:max-w-[800px] mx-auto px-6">
					{languages.map((language, index) => (
						<LinkButton href={`/${_.lowerCase(language)}`} key={_.uniqueId(`${index}-language-`)}>
							<Typography variant={'body'} color={theme.colorScheme.light}>
								{language}
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
