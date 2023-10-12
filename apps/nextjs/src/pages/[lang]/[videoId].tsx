import {useRouter} from "next/router";
import Head from "next/head";

const Page = () => {
	const {query} = useRouter()

	return (
		<>
			<Head>
				<title>Swords Of Iron | Admin</title>
				<meta name="description" content="Swords Of Iron"/>
			</Head>

			<main className="p-10 flex flex-col h-full w-full justify-center items-center">
					<iframe className="w-full h-full" src={`https://drive.google.com/file/d/${query.videoId}/preview`} allowFullScreen={true}/>
			</main>
		</>
	)
}

export default Page
