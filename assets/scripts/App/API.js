const axios = window.axios;

export class API {
	
	constructor() {
		this.token = null;
	}
	
	async getToken() {
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
				const token = res.data.access_token;
				console.log('Connected to Spotify API');
				return token;
			}
		}
		catch (err) {
			console.error(err);
		}
	}
	
	async searchArtist(query, token) {
		
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
				return res;
			}
		}
		catch (err) {
			console.error(err);
		}
	}
	
	async getAlbumsArtist(idArtist, token) {
		
		try {
			let res = await axios({
				method: 'GET',
				url: `https://api.spotify.com/v1/artists/${idArtist}/albums`,
				params: { limit: 50, offset: 0},
				headers: {
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
				data: "grant_type=client_credentials",
				json: true,
			})
			
			if(res.status == 200) {
				return res;
			}
		}
		catch (err) {
			console.error(err);
		}
	}
	
}
