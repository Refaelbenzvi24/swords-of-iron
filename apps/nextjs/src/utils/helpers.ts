export function debounce<Params extends any[]>(
	func: (...args: Params) => any,
	timeout: number,
): (...args: Params) => void {
	let timer: NodeJS.Timeout

	return (...args: Params) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func(...args)
		}, timeout)
	}
}

interface Omit {
	<T extends object, K extends [...(keyof T)[]]>
	(obj: T, ...keys: K): {
		[K2 in Exclude<keyof T, K[number]>]: T[K2]
	}
}

export const omit: Omit = (obj, ...keys) => {
	const ret = {} as {
		[K in keyof typeof obj]: (typeof obj)[K]
	};
	let key: keyof typeof obj;
	for (key in obj) {
		if (!(keys.includes(key))) {
			ret[key] = obj[key];
		}
	}
	return ret;
};
