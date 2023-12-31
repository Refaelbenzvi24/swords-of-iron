import {css} from "@emotion/css"


export type CssUnit = number | `${'-' | ''}${number}px` | `${'-' | ''}${number}%` | `${'-' | ''}${number}rem`


export const reverseCssUnit = (cssUnit: CssUnit) => {
	if (typeof cssUnit !== "number") {
		const units = cssUnit.match(/[%A-Za-z|]+|[\d-]+/g) as [string, string]
		
		return `${-1 * Number(units[0])}${units[1]}`
	}
	
	return -1 * cssUnit
}

type ConditionalMargins = (condition: boolean, margin: CssUnit, dir?: "ltr" | "rtl") => string

export const conditionalMargins: ConditionalMargins = (condition, margin, dir) => css`
  margin-right: ${(dir === 'rtl' ? (condition ? margin : 0) : 0) || 0};
  margin-left: ${(dir === 'ltr' ? (condition ? margin : 0) : 0) || 0};
`

export const conditionalTranslate = (condition: boolean, translate: CssUnit, dir?: "ltr" | "rtl") => `${condition ? (dir === 'ltr' ? `translateX(${translate})` : `translateX(${reverseCssUnit(translate)})`) : `translateX(0)`}`

export const conditionalRotate = (condition: boolean, rotate: number) => (condition ? `rotate(${rotate}deg)` : '')
