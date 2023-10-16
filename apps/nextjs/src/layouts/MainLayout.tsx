import MainLayoutAppBar, {type NavigationItemType} from "~/components/layouts/MainLayout/AppBar";
import {Main} from "@acme/ui";
import {useState, type ReactNode} from "react";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation"
import clsx from "clsx";

interface MainLayoutProps {
	children?: ReactNode
	className?: string
}

const MainLayout = ({children, className}: MainLayoutProps) => {
	const router = useRouter()
	const {t} = useTranslation()

	const navigationOptions = [
		{label: t('common:home'), value: '/'},
		{label: t('common:contact'), value: '/contact'},
	] as const

	const initialNavigation = navigationOptions.filter(navigationItem => navigationItem.value === router.route)[0]

	const [currentNavigation, setCurrentNavigation] = useState<NavigationItemType>(initialNavigation || navigationOptions[0])

	return (
		<div className={`h-full ${clsx(className)}`}>
			<MainLayoutAppBar {...{setCurrentNavigation, navigationOptions, currentNavigation}}/>

			<Main className="justify-center overflow-x-hidden">
				{children}
			</Main>
		</div>
	)
}

export default MainLayout
