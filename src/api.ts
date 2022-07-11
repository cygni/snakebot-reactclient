import axios from "axios";
import { Console } from "console";
import SockJS from "sockjs-client";
import MessageTypes, { GameSettings } from "./constants/messageTypes"
import { onSocketMessage } from "./context/messageDispatch";
import { GameData } from "./context/slices/gameDataSlice";

const socket = new SockJS("http://localhost:8080/events");; 
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
        let resp = await axios.get(`http://localhost:8080/login?login=${username}&password=${password}`)
        // console.log("response:", resp);
        return {success: true, data: resp.data};
    } catch (error: any) {
        console.error("Error getting token:", error);
        return {success: false, data: typeof(error.response.data)==="string" ? error.response.data : error.message};
    }
    // // Handle success
    // .then((response: any) => {
    //     console.log("Got token:", response.data);
    //     localStorage.setItem("token", response.data);
    //     return true;
    // })
    // // Handle error
    // .catch(error => {
    //     console.error("Error getting token:", error.response.data, error.response.status, error);
    //     return false;
    // })
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

export type game = {
    gameDate: string,
    gameId: string,
    players: string[],
}

// function logIfNoToken() {
//     if (localStorage.getItem("token") === null) {
//         console.error("No token, cannot make request");
//     }
// }

export default {

    // ##############################################################################################
    // ########################### REST API ########################################################
    // ##############################################################################################

    async searchForGames(snakeName: string): Promise<game[]> {
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
    
    // async initSocket() {
    //     socket = new SockJS("http://localhost:8080/events")
    // },

    async createTournament(tournamentName: string): Promise<void> {
        //logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.CreateTournament',
            token: localStorage.getItem("token"),
            tournamentName: tournamentName,
        }));
    },

    async killTournament(): Promise<void> {
        //logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.KillTournament',
            token: localStorage.getItem("token"),
            tournamentId: 'NOT_IMPLEMENTED',
        }));
    },

    async getActiveTournament(): Promise<void> {
        //logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.GetActiveTournament',
            token: localStorage.getItem("token"),
        }));
    },

    async startTournament(tournamentId: string): Promise<void> {
        //logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.StartTournament',
            token: localStorage.getItem("token"),
            tournamentId: tournamentId,
        }));
    },

    async startTournamentGame(gameId: string): Promise<void> {
        //logIfNoToken();
        sendWhenConnected(JSON.stringify({
            // type: 'se.cygni.snake.eventapi.request.StartTournamentGame',
            // token: localStorage.getItem("token"),
            type: 'se.cygni.snake.eventapi.request.StartGame',
            gameId: gameId,
        }));
    },

    async updateTournamentSettings(gameSettings: GameSettings): Promise<void> {
        //logIfNoToken();
        sendWhenConnected(JSON.stringify({
            type: 'se.cygni.snake.eventapi.request.UpdateTournamentSettings',
            token: localStorage.getItem("token"),
            gameSettings: gameSettings,
        }));
    },



    // async getToken() {
    //     const resp = await axios.get("http://localhost:8080/login?login=emil&password=lime").catch(err => {
    //         console.error(err);
    //     });
    //     localStorage.getItem("token") = resp ? resp.data.token: "NO_TOKEN";
    // },
};