import axios from "axios";
import SockJS from "sockjs-client";
import MessageTypes, { GameSettings } from "./constants/messageTypes"
import { onSocketMessage } from "./context/messageDispatch";

console.log("THIS IS RUNNING");
const socket = new SockJS("http://localhost:8080/events");
export let myToken = "NO_TOKEN";
let onConnectQueue: string[] = [];

function sendWhenConnected(msg: string) {
    if (socket.readyState === 1) {
        socket.send(msg);
    } else {
        onConnectQueue.push(msg); // if no connection is established, save message in queue
    }
}

axios.get("http://localhost:8080/login?login=emil&password=lime").then(response => {
    myToken = response.data;
    console.log("Got token:", response.data);
    console.log("Token is:", myToken);
});


socket.onopen = () => {
    console.log("Connected to server");

    // Send all queued messages
    onConnectQueue.forEach(msg => {
        socket.send(msg);
    });
    onConnectQueue = [];
}

socket.onmessage = (event) => onSocketMessage(event.data);

socket.onclose = () => {
    console.log("Disconnected from server");
}

export type game = {
    gameDate: string,
    gameId: string,
    players: string[],
}

function logIfNoToken() {
    if (myToken === "NO_TOKEN") {
        console.error("No token, cannot make request");
    }
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
    
    async createTournament(tournamentName: string): Promise<void> {
        logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.CreateTournament',
            token: myToken,
            tournamentName: tournamentName,
        }));
    },

    async killTournament(): Promise<void> {
        logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.KillTournament',
            token: myToken,
            tournamentId: 'NOT_IMPLEMENTED',
        }));
    },

    async getActiveTournament(): Promise<void> {
        logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.GetActiveTournament',
            token: myToken,
        }));
    },

    async startTournament(tournamentId: string): Promise<void> {
        logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.StartTournament',
            token: myToken,
            tournamentId: tournamentId,
        }));
    },

    async startTournamentGame(gameId: string): Promise<void> {
        logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.StartTournamentGame',
            token: myToken,
            gameId: gameId,
        }));
    },

    async updateTournamentSettings(gameSettings: GameSettings): Promise<void> {
        logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.UpdateTournamentSettings',
            token: myToken,
            gameSettings: gameSettings,
        }));
    },



    // async getToken() {
    //     const resp = await axios.get("http://localhost:8080/login?login=emil&password=lime").catch(err => {
    //         console.error(err);
    //     });
    //     myToken = resp ? resp.data.token: "NO_TOKEN";
    // },
};