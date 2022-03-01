const axios = window.axios;

export class API {
	
	constructor() {
		this.token = null;
	}
	
	async connect() {
		// Get token
		// TODO : find a solution to protect credentials
		const clientId = '';
		const clientSecret = '';
		
		try {
			let res = await axios({
				method: 'POST',
				url: "https://accounts.spotify.com/api/token",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
				},
				data: "grant_type=client_credentials",
				json: true,
			})
			
			if(res.status == 200){
				console.log(res.status);
				const token = res.data.access_token;
				console.log('Connected to Spotify API');
				return token;
			}
		}
		catch (err) {
			console.error(err);
		}
	}
	
	async search(query, token) {

		if(this.token != null) {
			try {
				let res = await axios({
					method: 'GET',
					url: 'https://api.spotify.com/v1/search',
					params: { limit: 50, offset: 0, q: query, type: "artist" },
					headers: {
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
					data: "grant_type=client_credentials",
					json: true,
				})
				
				if(res.status == 200) {
					console.log(res.status);
					console.log(res);
					return res;
				}
			}
			catch (err) {
				console.error(err);
			}
		}
	}
	
}
