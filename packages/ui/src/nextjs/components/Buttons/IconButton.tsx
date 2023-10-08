import styled from "@emotion/styled"
import {motion, type HTMLMotionProps} from "framer-motion"
import tw, {css} from "twin.macro"

import theme from "../../Utils/theme"


export interface IconButtonProps extends HTMLMotionProps<"button"> {
	dark?: boolean
	size?: number
	color?: string
}

const IconButton = styled(motion.button)(({color, dark, size}: IconButtonProps) => [
	tw`flex cursor-pointer text-xl opacity-80 hover:opacity-100 border-none active:opacity-70`,
	css`
    background-color: transparent;
    color: ${color || theme.colors.dark_200};
    transition: all 100ms linear;

    &:hover {
      color: ${theme.colors.gray_700};
    }

    &:active {
      color: ${theme.colors.gray_500};
    }
	`,
	
	size && css`
    font-size: ${size}px;
	`,
	
	
	(props) => (dark || props.theme.isDark) && css`
    color: ${color || theme.colors.white};

    &:hover {
      color: ${theme.colors.gray_100};
    }

    &:active {
      color: ${theme.colors.gray_300};
    }
	`,
])

IconButton.defaultProps = {
	size: 24,
}


export default IconButton
