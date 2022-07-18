import axios from "axios";
import { Console } from "console";
import SockJS from "sockjs-client";
import Arbitraryconstants from "./constants/Arbitraryconstants";
import MessageTypes, { GameSettings } from "./constants/messageTypes"
import { onSocketMessage } from "./context/messageDispatch";
import { GameData } from "./context/slices/gameDataSlice";

const socket = new SockJS(Arbitraryconstants.SERVER_URL + "/events");
let onConnectQueue: string[] = [];

function sendWhenConnected(msg: string) {
    console.log("Queuing/sending socket message:", JSON.parse(msg));
    if (socket.readyState === 1 && localStorage.getItem("token") !== null) {
        socket.send(msg);
    } else {
        onConnectQueue.push(msg); // if no connection is established, save message in queue
    }
}

export async function getToken(username: string, password: string): Promise<{success: boolean, data: string}> {
    try {
        let resp = await axios.get(`/login?login=${username}&password=${password}`)
        return {success: true, data: resp.data};
    } catch (error: any) {
        console.error("Error getting token:", error);
        return {success: false, data: typeof(error.response.data)==="string" ? error.response.data : error.message};
    }
}


socket.onopen = () => {
    console.log("Connected to server");
    // Send all queued messages
    onConnectQueue.forEach(msg => {
        socket.send(msg);
    });
    onConnectQueue = [];
}

socket.onmessage = (event: any) => onSocketMessage(event.data);

socket.onclose = () => {
    console.log("Disconnected from server");
}

export type Game = {
    gameDate: string,
    gameId: string,
    players: string[],
}

export default {

    // ##############################################################################################
    // ########################### REST API ########################################################
    // ##############################################################################################
    async searchForGames(snakeName: string): Promise<Game[]> {
        const resp = await axios.get(`/history/search/${snakeName}`).catch(err => {
            console.error(err);
        });
        return resp ? resp.data.items: [];
    },

    async getGame(gameId: string): Promise<GameData> {
        const resp = await axios.get(`/history/${gameId}`).catch(err => {
            console.error(err);
        });
        return resp ? resp.data: {};
    },

    // ##############################################################################################
    // ###################### SOCKET FUNCTIONS #####################################################
    // ##############################################################################################
    async createTournament(tournamentName: string): Promise<void> {
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.CreateTournament',
            token: localStorage.getItem("token"),
            tournamentName: tournamentName,
        }));
    },

    async killTournament(): Promise<void> {
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.KillTournament',
            token: localStorage.getItem("token"),
            tournamentId: 'NOT_IMPLEMENTED',
        }));
    },

    async getActiveTournament(): Promise<void> {
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.GetActiveTournament',
            token: localStorage.getItem("token"),
        }));
    },

    async startTournament(tournamentId: string): Promise<void> {
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.StartTournament',
            token: localStorage.getItem("token"),
            tournamentId: tournamentId,
        }));
    },

    async startTournamentGame(gameId: string): Promise<void> {
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.StartGame',
            gameId: gameId,
        }));
    },

    async updateTournamentSettings(gameSettings: GameSettings): Promise<void> {
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.UpdateTournamentSettings',
            token: localStorage.getItem("token"),
            gameSettings: gameSettings,
        }));
    },
};