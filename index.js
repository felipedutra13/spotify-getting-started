import SpotifyService from "./spotifyService.js";
import dotenv from 'dotenv';

dotenv.config();

const spotifyService = new SpotifyService;

const artistData = await spotifyService.getArtistData();

console.log(artistData);