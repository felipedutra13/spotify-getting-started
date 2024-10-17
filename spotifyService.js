const AUTH_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

class SpotifyService {
    async generateAccessToken() {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
        params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

        let accessToken = null;

        try {
            let response = await fetch(AUTH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            });
            response = await response.json();
            accessToken = response.access_token;
        } catch (err) {
            throw new Error("Erro ao obter token do Spotify", err);
        }

        return accessToken;
    }

    async getArtistData() {
        const accessToken = "Bearer " + await this.generateAccessToken();
        if (!accessToken) {
            throw new Error("Nāo foi possível gerar o token de acesso!");
        }

        let response;
        const anyArtistId = "4Z8W4fKeB5YxbusRsdQVPb";

        try {
            response = await fetch(`${API_URL}/artists/${anyArtistId}`, {
                method: 'GET',
                headers: {
                    'Authorization': accessToken,
                }
            });
        } catch (err) {
            throw new Error("Erro ao obter dados do artista do Spotify", err);
        }

        return await response.json();
    }
}

export default SpotifyService;