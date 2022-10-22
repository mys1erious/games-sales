import axios from "axios";


const baseURL = process.env.REACT_APP_BASE_API_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});


axiosInstance.interceptors.response.use(
	response => response,

	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert('A server/network error occurred. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (error.response.status === 401 &&
			originalRequest.url === baseURL + 'auth/token/refresh/'
		) {
			window.location.href = '/signin/';
			return Promise.reject(error);
		}

		if (error.response.data.code === 'token_not_valid' ||
			error.response.data.detail?.includes('Invalid token header') &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');
			if (refreshToken) {
				try {
					axiosInstance.defaults.headers['Authorization'] = null;
					axiosInstance.defaults.headers['Content-Type'] = 'application/json';
					return axiosInstance
						.post('/auth/token/',
							{
								refresh_token: refreshToken,
								grant_type: 'refresh_token',
								client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
								client_secret: process.env.REACT_APP_OAUTH_CLIENT_SECRET
							}).then((response) => {
								localStorage.setItem('access_token', response.data.access_token);
								localStorage.setItem('refresh_token', response.data.refresh_token);

								const authHeader = `${response.data.token_type} ${response.data.access_token}`;
								axiosInstance.defaults.headers['Authorization'] = authHeader;
								originalRequest.headers['Authorization'] = authHeader;

								return axiosInstance(originalRequest);
							}).catch(err => console.log(err)); // Alert
				} catch (e) {
					// Alert
					console.log('Refresh token is expired or invalid.');
					window.location.href = '/signin/';
				}
			} else {
				// Alert
				console.log('Refresh token not available.');
				window.location.href = '/signin/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);


export default axiosInstance;
