import IconIcBaselineFacebook from "~icons/ic/baselineFacebook"
import IconIcBaselineWhatsapp from "~icons/ic/baselineWhatsapp"
import IconMdiInstagram from "~icons/mdi/instagram"
import IconIcBaselineTiktok from "~icons/ic/baselineTiktok"
import IconIcOutlineEmail from "~icons/ic/outlineEmail"
import IconMdiLinkedin from "~icons/mdi/linkedin"
import IconMdiTwitter from "~icons/mdi/twitter"
import IconMdiDownload from "~icons/mdi/download"
import clsx from "clsx";

import {ATagButton, Row} from "@acme/ui";
import {type ButtonProps} from "@acme/ui/src/nextjs/components/Buttons/Button";
import {ComponentProps} from "react";

interface SocialLinksProps extends Partial<ComponentProps<typeof Row>> {
	linksProps?: ButtonProps
	facebookLink?: string
	twitterLink?: string
	linkedinLink?: string
	whatsappLink?: string
	instagramLink?: string
	tiktokLink?: string
	emailLink?: string
	downloadLink?: string
}

const SocialLinks = (props: SocialLinksProps) => {
	const {
		className,
		linksProps,
		emailLink,
		facebookLink,
		tiktokLink,
		whatsappLink,
		instagramLink,
		twitterLink,
		linkedinLink,
		downloadLink,
		...restProps
	} = props

	return (
		<Row
			{...restProps}
			className={`space-s-1.5 ${clsx(className)}`}>
			{facebookLink && (
				<ATagButton
					href={facebookLink}
					text
					icon
					size={'24px'}
					aria-label="facebook link"
					{...linksProps}>
					<IconIcBaselineFacebook/>
				</ATagButton>
			)}

			{twitterLink && (
				<ATagButton
					href={twitterLink}
					text
					icon
					size={'24px'}
					aria-label="twitter link"
					{...linksProps}>
					<IconMdiTwitter/>
				</ATagButton>
			)}

			{linkedinLink && (
				<ATagButton
					href={linkedinLink}
					text
					icon
					size={'24px'}
					aria-label="linkedin link"
					{...linksProps}>
					<IconMdiLinkedin/>
				</ATagButton>
			)}

			{whatsappLink && (
				<ATagButton
					href={whatsappLink}
					text
					icon
					size={'24px'}
					aria-label="whatsapp link"
					{...linksProps}>
					<IconIcBaselineWhatsapp/>
				</ATagButton>
			)}

			{instagramLink && (
				<ATagButton
					href={instagramLink}
					text
					icon
					size={'24px'}
					aria-label="instagram link"
					{...linksProps}>
					<IconMdiInstagram/>
				</ATagButton>
			)}

			{tiktokLink && (
				<ATagButton
					href={tiktokLink}
					text
					icon
					size={'24px'}
					aria-label="tiktok link"
					{...linksProps}>
					<IconIcBaselineTiktok/>
				</ATagButton>
			)}

			{emailLink && (
				<ATagButton
					href={emailLink}
					text
					icon
					size={'24px'}
					aria-label="email link"
					{...linksProps}>
					<IconIcOutlineEmail/>
				</ATagButton>
			)}

			{downloadLink && (
				<ATagButton
					href={downloadLink}
					text
					icon
					size={'24px'}
					aria-label="download link"
					{...linksProps}>
					<IconMdiDownload/>
				</ATagButton>
			)}
		</Row>
	)
}

export default SocialLinks
