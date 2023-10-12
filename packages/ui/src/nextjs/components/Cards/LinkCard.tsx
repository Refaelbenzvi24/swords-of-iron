import Link from "next/link"
import styled from "@emotion/styled"
import {CardProps, cardPropsArray, CardStyles, cardDefaultProps} from "./Card"
import {shouldForwardProp} from "../../Utils/StyledUtils";


const LinkCard = styled(Link, {
	shouldForwardProp: (props) => shouldForwardProp<CardProps>(
		cardPropsArray
	)(props as keyof CardProps)
})(CardStyles)

LinkCard.defaultProps = {
	...cardDefaultProps
}

export default LinkCard
