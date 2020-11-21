export function toQueryString(obj, removeEmpty) {
	return Object.keys(obj)
		.reduce((qs, q) => {

			if (removeEmpty && !obj[q]) {
				return qs
			}

			return `${qs}&${q}=${obj[q]}`
		}, '')
}
