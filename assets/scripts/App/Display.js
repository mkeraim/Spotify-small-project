import { API } from './API.js';

export class Display {
	
	constructor() {
		const classDisplay = this;
		
		this.api = new API();
		this.vueJS = new Vue({
			el: "#interface",
			data: {
				artists: [],
				albums: [],
				tracks: [],
				inputChange: "",
			},
			
			methods: {
				emptyArtists() {
					this.artists.splice(0,this.artists.length);
				},
				emptyAlbums() {
					this.albums.splice(0,this.albums.length);
				},
				emptyTracks() {
					this.tracks.splice(0,this.tracks.length);
				},
				addArtist(artist) {
					this.artists.push(artist);
				},
				addAlbum(album) {
					this.albums.push(album);
				},
				addTrack(track) {
					this.tracks.push(track);
				},
				artistListener(artist) {
					classDisplay.displayAlbums(artist.id);
				},
				albumListener(album) {
					classDisplay.displayTracks(album.id);
				}
			},
			
			watch: {
				inputChange(text) {
					classDisplay.displayArtists(text);
				}
			}
		});
		
		// Event Listener
		this.searchArtist();
	}
	
	searchArtist() {
		document.getElementById("button-search").addEventListener("click", () => {
			this.displayArtists();
		});
		
	}
	
	async displayTracks(idAlbum) {
		// get data on API
		const token = await this.api.getToken();
		const res = await this.api.getTracksAlbum(idAlbum, token);
		
		// Erase previous data
		this.vueJS.emptyTracks();
		
		const items = res.data.items;
		
		items.forEach( track => {
			
			this.vueJS.addTrack({ 
				name: track.name,
				discNumber: track.disc_number,
				trackNumber : track.track_number
			});
			
		});
	}
	
	async displayAlbums(idArtist) {
		// get data on API
		const token = await this.api.getToken();
		const res = await this.api.getAlbumsArtist(idArtist, token);
		
		// Erase previous data
		this.vueJS.emptyAlbums();
		
		const items = res.data.items;
		
		items.forEach( album => {
			
			let urlImage = null;
			
			if (album.images <= 0) {
				urlImage = 'assets/img/avatar-anonyme.png';
			}
			else {
				urlImage = album.images[0].url;
			}
			
			this.vueJS.addAlbum({ 
				id : album.id, 
				name: album.name, 
				url : urlImage
			});
			
		});
	}
	
	async displayArtists(artist) {
		// get data on API
		const token = await this.api.getToken();
		const res = await this.api.searchArtist(artist, token);
		
		const items = res.data.artists.items;
		
		// Erase previous data
		this.vueJS.emptyArtists();
		
		items.forEach( artist => {
			
			let urlImage = null;
			if (artist.images <= 0) {
				urlImage = 'assets/img/avatar-anonyme.png';
			}
			else {
				urlImage = artist.images[0].url;
			}
			
			this.vueJS.addArtist({ 
				id : artist.id, 
				name: artist.name, 
				url : urlImage
			});
			
		});
	}
	
}
