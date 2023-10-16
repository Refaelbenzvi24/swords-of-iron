import {
	AppBar,
} from "@acme/ui"
import {useRouter} from "next/router"
import {ComponentProps, useEffect} from "react";
import clsx from "clsx";

export interface NavigationItemType {
	label: string
	value: string
}

interface MainLayoutAppBarProps {
	navigationOptions: NavigationItemType[] | readonly NavigationItemType[]
	currentNavigation: NavigationItemType
	setCurrentNavigation?: (navigation: NavigationItemType | (() => NavigationItemType)) => void
}


const MainLayoutAppBar = (props: MainLayoutAppBarProps & Partial<ComponentProps<typeof AppBar>>) => {
	const {setCurrentNavigation, navigationOptions, currentNavigation, className, ...restProps} = props

	const router = useRouter()

	const navigationOptionsString = JSON.stringify(navigationOptions)

	useEffect(() => {
		const currentNavigation = navigationOptions.filter(nav => nav.value === router.asPath)[0]
		if (currentNavigation && setCurrentNavigation) setCurrentNavigation(() => currentNavigation)
	}, [navigationOptionsString, router.asPath, setCurrentNavigation])


	return (
		<AppBar
			{...restProps}
			className={`justify-between px-16 ${clsx(className)}`}>
		</AppBar>
	)
}

export default MainLayoutAppBar
