import { API } from './App/API.js';
import { Display } from './App/Display.js';

class App {

	static async init() {
		const api = new API();
		const display = new Display();
		
		const token = await api.connect();
		
		// Event listener
		document.getElementById("button-search").addEventListener("click", async () => {
			const value = document.getElementById('button-search').value;
			const data = await api.search(value, token);
			console.log(data);
			display.displayArtist(data);
		});
	}
	
}

App.init();
