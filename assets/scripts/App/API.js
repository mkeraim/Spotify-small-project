const axios = window.axios;

export class API {
	
	connect() {
		// TODO : find a solution to protect credentials
		const clientId = "";
		const clientSecret = "";
		
		// Get token
		const urlToken = "https://accounts.spotify.com/api/token";
		
		//~ axios.get(urlToken, {
			//~ method: 'POST',
			//~ headers: {
				//~ "Authorization": 'Basic ' + btoa(clientId + ':' + clientSecret)
			//~ },
			//~ form: {
				//~ grant_type: 'client_credentials'
			//~ },
			//~ json: true;
		//~ })
		//~ .then(res => {
			//~ console.log(res.);
		//~ })
		//~ .catch(err => {
			//~ console.log(err);
		//~ })
		
		axios({
		method: 'post',
			url: 'https://accounts.spotify.com/api/token',
			data: {
			  grant_type: 'authorization_code',
			},
			headers: { 
			  'Authorization': 'Basic ' + ((clientId + ':' + clientSecret).toString('base64')),
			  'Content-Type': 'application/x-www-form-urlencoded' 
			},
			json: true
		})
		.then((response) => {
			//handle success
			resolve(response);
		})
		.catch((error) => {
			//handle error
			reject(error);
		})
		
	}
}
