export function styleObjectToString(styles) {
	return Object.entries(styles)
		.map(([key, value]) => {
			return `${key}: ${value};`;
		})
		.join('');
}
