import axios from "axios";

export type game = {
    gameDate: string,
    gameId: string,
    players: string[],
}

export default {
    async searchForGames(snakeName: string): Promise<game[]> {
        const resp = await axios.get(`/history/search/${snakeName}`).catch(err => {
            console.log(err);
        });
        return resp ? resp.data.items: [];
    },

    async getGame(gameId: string): Promise<any> {
        const resp = await axios.get(`/history/${gameId}`).catch(err => {
            console.log(err);
        });
        return resp ? resp.data: {};
    }
};