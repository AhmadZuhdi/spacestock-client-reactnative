export function toQueryString(obj) {
	return Object.keys(obj)
		.reduce((qs, q) => {
			return `${qs}&${q}=${obj[q]}`
		}, '')
}
