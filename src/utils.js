const getFromToken = (token, data) => {
	if (token) {
		try {
			return JSON.parse(atob(token.split('.')[1]))[data];
		} catch (error) {
			// ignore
		}
	}
	return null;
};

export default getFromToken;
