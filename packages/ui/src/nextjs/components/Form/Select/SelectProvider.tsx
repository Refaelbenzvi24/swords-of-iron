import { SelectContext } from "./SelectContext"
import { type ReactElement } from "react"
import { defaultColors, defaultColorsDark, type SelectColors } from "./SelectColors"
import _ from "lodash";

interface SelectProviderOptions {
	children: ReactElement
	dark: boolean
	colors?: SelectColors
	colorsDark?: SelectColors
}

const SelectProvider = ({ children, dark, colors = defaultColors, colorsDark = defaultColorsDark }: SelectProviderOptions) => {

	return (
		<SelectContext.Provider value={{
			theme: {
				isDark:     dark,
				colors:     _.assign({}, defaultColors, colors),
				colorsDark: _.assign({}, defaultColorsDark, colorsDark)
			}
		}}>
			{children}
		</SelectContext.Provider>
	)
}

export default SelectProvider
