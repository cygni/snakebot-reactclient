import axios from "axios";

export type game = {
    gameDate: string,
    gameId: string,
    players: string[],
}

export default {
    async searchForGames(snakeName: string): Promise<game[]> {
        const resp = await axios.get(`/history/search/${snakeName}`).catch(err => {
            console.error(err);
        });
        return resp ? resp.data.items: [];
    },

    async getGame(gameId: string): Promise<any> {
        const resp = await axios.get(`/history/${gameId}`).catch(err => {
            console.error(err);
        });
        return resp ? resp.data: {};
    },
    
    async getToken(): Promise<string> {
        const resp = await axios.get("http://localhost:8080/login?login=emil&password=lime").catch(err => {
            console.error(err);
        });
        return resp ? resp.data.token: "";
    },
};