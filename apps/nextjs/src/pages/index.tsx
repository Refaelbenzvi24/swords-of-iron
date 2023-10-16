import Head from "next/head";
import {selectColors, Select, theme, Typography, selectComponents} from "@acme/ui";
import {ReactElement, useState} from "react";
import MainLayout from "~/layouts/MainLayout";
import {css} from "@emotion/css";
import Link from "next/link";
import languages from "../components/languages";

const Page = () => {
	const [languageHasBeenSelected, setLanguageHasBeenSelected] = useState(false)

	return (
		<>
			<Head>
				<title>Swords Of Iron | Admin</title>
				<meta name="description" content="Swords Of Iron"/>
			</Head>

			<main className={`flex space-y-20 flex-col h-full w-full justify-center items-center`}>
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
				        onChange={() => setLanguageHasBeenSelected(true)}
				        isLoading={languageHasBeenSelected}
				        isDisabled={languageHasBeenSelected}
				        isSearchable
				        closeMenuOnSelect={false}
				        components={{
					        Option: ({data, ...props}) => (
						        <selectComponents.Option {...props} data={data}>
							        <Link href={`/${_.lowerCase(data.value)}`} className="flex flex-row">
								        {data.icon}
								        <Typography className="ml-2"
								                    color={theme.colorScheme.light}
								                    darkColor={theme.colorScheme.light}
								                    variant={'body'}>
									        {data.label}
								        </Typography>
							        </Link>
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
			</main>
		</>
	)
}

Page.getLayout = (page: ReactElement) => {
	const pageBackground = css`
      background-image: url('./HomePageBackground.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
	`
	return (
		<MainLayout className={`${pageBackground}`}>
			{page}
		</MainLayout>
	)
}

export default Page
