import { AnimatePresence, motion } from "framer-motion"
import { css } from "@emotion/css"
import {
	Button,
	Col,
	HamburgerSideBar,
	Navigation,
	Row,
	theme,
	ThemeToggle,
	Tooltip,
	Typography,
	useIsDark,
	useMain
} from "@acme/ui"
import { useState, useEffect, ComponentProps } from "react"
import tw from "twin.macro"
import useTranslation from "next-translate/useTranslation"

import type { NavigationItemType } from "./AppBar"
import Image from "next/image";
import { useRouter } from "next/router"
import SocialLinks from "~/components/SocialLinks";
import clsx from "clsx";
import LanguageSelector from "~/components/LanguageSelector";


export interface MainLayoutMobileAppBarProps {
	navigationOptions: NavigationItemType[] | readonly NavigationItemType[]
	currentNavigation: NavigationItemType
	setCurrentNavigation?: (navigation: NavigationItemType) => void
}

const MainLayoutMobileAppBar = (props: MainLayoutMobileAppBarProps & ComponentProps<typeof Row>) => {
	const router = useRouter ()
	const { t, lang } = useTranslation ()
	const dir = lang === "he" ? "rtl" : "ltr"

	const { navigationOptions, currentNavigation, setCurrentNavigation, className, ...restProps } = props

	const [isHamburgerSideBarOpen, setIsHamburgerSideBarOpen] = useState<boolean> (false)

	const { setAppBarState, setAppBarOpts } = useMain ()
	const isDark = useIsDark ()


	useEffect (() => {
		setAppBarState (() => true)

		return () => {
			setAppBarState (() => false)
		}
	}, [setAppBarState])


	useEffect (() => {
		setAppBarOpts ((prev) => ({
			...prev,
			height: 75,
		}))
	}, [setAppBarOpts])


	return (
		<Row
			{...restProps}
			className={`${css`
              ${tw`absolute w-full items-center h-[75px]`}
              & ~ #main {
                padding-top: 75px;
              }
			`} ${clsx (className)}`}>

			<HamburgerSideBar
				className="overflow-hidden"
				dir={dir}
				isOpen={isHamburgerSideBarOpen}
				bgColor={theme.colorScheme.light}
				bgColorDark={theme.colorScheme.dark}
				onIsOpenChange={setIsHamburgerSideBarOpen}>
				<AnimatePresence>
					{isHamburgerSideBarOpen ? (
						<motion.div
							className="flex flex-col h-full w-full"
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
							}}>
							<Row className="mt-[-34px] mx-[12px] space-x-[18px] rtl:space-x-reverse">
								<Tooltip tooltip={"Theme"}
								         color={theme.colorScheme.overlaysDark}
								         placement="bottom-center">
									<ThemeToggle
										color={theme.colorScheme.secondary}/>
								</Tooltip>

								<Tooltip tooltip={t ("common:language")}
								         color={theme.colorScheme.overlaysDark}
								         placement="bottom-center">
									<LanguageSelector/>
								</Tooltip>
							</Row>

							<div className={css`
                              position: absolute;
                              bottom: -55px;
                              left: -35px;
                              height: 300px;
                              width: 200vw;
                              rotate: 165deg;
                              background-color: ${isDark ? theme.colorScheme.overlaysDark : theme.colorScheme.light2};
							`}/>
						</motion.div>
					) : null}
				</AnimatePresence>
			</HamburgerSideBar>
		</Row>
	)
}

export default MainLayoutMobileAppBar
