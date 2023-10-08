import {GetServerSideProps} from "next"
import Head from "next/head"
import {Card, Col, Row, Table, TextField, theme, Typography} from "@acme/ui"
import useTranslation from "next-translate/useTranslation"
import {FormEvent, ReactElement, useCallback, useEffect, useMemo, useRef} from "react";
import AdminLayout from "~/layouts/AdminLayout";
import {useRouter} from "next/router"
import IconCarbonSearch from "~icons/carbon/search"
import {api} from "~/utils/api"
import {debounce} from "~/utils/helpers";
import {getProxySSGHelpers} from "~/utils/ssg"
import {getServerSession} from "@acme/auth";
import {omit} from "~/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context)

	if (!session || !session.user) {
		return {
			redirect: {
				permanent: false,
				destination: '/admin/login'
			}
		}
	}
	const ssg = await getProxySSGHelpers(context)


	return {
		props: {
			trpcState: ssg.dehydrate()
		},
	}
}

const Page = () => {
	return (
		<>
			<Head>
				<title>Swords Of Iron | Admin</title>
				<meta name="description" content="Swords Of Iron"/>
			</Head>

			<main className="h-full">
				<Col className="h-full pb-[20px] px-10">
				</Col>
			</main>
		</>
	)
}

Page.getLayout = (page: ReactElement) => (
	<AdminLayout>
		{page}
	</AdminLayout>
)

export default Page
