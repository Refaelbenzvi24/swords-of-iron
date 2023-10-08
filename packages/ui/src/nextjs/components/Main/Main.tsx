import {useEffect} from 'react'

import {css} from "@emotion/css"
import styled from "@emotion/styled"
import clsx from "clsx"
import {motion, type HTMLMotionProps} from "framer-motion"

import Backdrop, {type BackdropProps} from "../Backdrop/Backdrop"
import theme from "../../Utils/theme"
import {marginTransition} from "../../Utils/transitions"
import useDimensions from "../../hooks/useDimensions"
import {useMain} from "../../index"
import tw from "twin.macro"
import {CssUnit} from "../../Utils/utils";

const MainDiv = styled(motion.div)(() => [
	tw`h-full`
])

interface MainProps {
	dark?: boolean
	backdropProps?: BackdropProps & HTMLMotionProps<"div">
}


const Main = (props: MainProps & HTMLMotionProps<'div'>) => {
	const {sideBarState: sideBar, sideBarOpts, overlayState, setSideBarState, setOverlayState} = useMain()
	
	const {windowWidth} = useDimensions()
	
	const {children, className, dark, backdropProps, ...restProps} = props
	const {shrinkPoint} = sideBarOpts
	
	const initializeOverlayState = () => {
		const overlaysRoot = document.querySelector('#portals-root')
		if (overlaysRoot?.childNodes && overlaysRoot.childNodes.length > 0) return setOverlayState(true)
		
		setOverlayState(false)
	}
	
	useEffect(() => {
		initializeOverlayState()
	}, [])
	
	const overlayAction = () => {
		if (sideBar) {
			setSideBarState(false)
			setOverlayState(false)
		}
	}
	
	const shouldApplyMargins = () => windowWidth ? !!(shrinkPoint && sideBar && windowWidth > shrinkPoint) : false
	
	return (
		<MainDiv {...restProps}
		         className={`${css`
               min-height: 100%;
               width: 100%;

               ${[
                 theme.transitions([marginTransition()]),
                 theme.utils.conditionalMargins(shouldApplyMargins(), `${sideBarOpts.width}px` as CssUnit, 'ltr')
               ]}
		         `} ${clsx(className)}`}
		         id="main">
			<>
				{sideBar && !shouldApplyMargins() ? (
					<Backdrop {...{dark}}
					          active={overlayState}
					          id="overlay-background"
					          role="presentation"
					          {...backdropProps}
					          onClick={(event) => {
						          overlayAction()
						          !!backdropProps?.onClick && backdropProps?.onClick(event)
					          }}/>
				) : null}
				{children}
			</>
		</MainDiv>
	)
}

Main.defaultProps = {
	dark: undefined,
}

export default Main
