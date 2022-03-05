import { API } from './API.js';

export class Display {
	
	constructor() {
		this.api = new API();
		
		
		// Event Listener
		this.searchArtist();
	}
	
	searchArtist() {
		document.getElementById("button-search").addEventListener("click", () => {
			this.displayArtists();
		});
		
		document.getElementById("input-artist").addEventListener("keyup", () => {
			if (event.keyCode === 13) { // Enter key
				event.preventDefault();
				this.displayArtists();
			}
		});
		
	}
	
	addEventArtist() {
		
		Array.from(document.getElementsByClassName(`elem-list-artist`)).forEach( (element) => {
			
			element.addEventListener("click", () => {
				const idArtist = element.firstElementChild.innerText;
				
				this.displayAlbums(idArtist);
			});
		});
		
	}
	
	async displayAlbums(idArtist) {
		// get data on API
		const token = await this.api.getToken();
		const res = await this.api.getAlbumsArtist(idArtist, token);
		
		const albumsList = document.getElementById('artist-list-albums');
	
		// Erase previous data
		albumsList.innerText = '';
		
		const items = res.data.items;
		
		items.forEach( album => {
			
			let urlImage = null;
			
			if (album.images <= 0) {
				urlImage = 'assets/img/avatar-anonyme.png';
			}
			else {
				urlImage = album.images[0].url;
			}
			
			console.log(album);
			
			albumsList.innerHTML += `
			<div class="elem-list-albums">
				<p style="display: none;">${album.id}</p>
				
				<p> Name : ${album.name} </p>
				
				
				<img class="image-artist-album"
				src=${urlImage}
				alt="album image" />
				
			</div> `;
			
		});
	}
	
	async displayArtists() {
		// get data on API
		const token = await this.api.getToken();
		const value = document.getElementById('input-artist').value;
		const res = await this.api.searchArtist(value, token);
		
		const items = res.data.artists.items;
		
		const artistsList = document.getElementById('artist-list');
		
		// Erase previous data
		artistsList.innerText = '';
		
		items.forEach( artist => {
			
			let urlImage = null;
			if (artist.images <= 0) {
				urlImage = 'assets/img/avatar-anonyme.png';
			}
			else {
				urlImage = artist.images[0].url;
			}
			
			artistsList.innerHTML += `
			<div class="elem-list-artist">
				<p style="display: none;">${artist.id}</p>
				<p> Name : ${artist.name} </p>
				
				
				<img class="image-artist-album"
				src=${urlImage}
				alt="artist image" />
				
			</div> `;
		});
		
		this.addEventArtist();
	}
	
}