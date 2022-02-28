import { API } from './App/API.js';


class App {
	

	

	
	static init() {
		const api = new API();
		api.connect();
	}
	
	
}

App.init();
