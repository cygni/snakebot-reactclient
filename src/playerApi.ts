import MessageTypes, { Message } from "./constants/messageTypes";

const HEARTBEAT_INTERVAL = 5000;
const MS_SLEEP_MARGIN = 20;

export enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}

type HeartBeatResponseMessage = Message;

export interface MapUpdateEventMessage extends Message {
    gameTick: number;
    gameId: string;
    map: any; // Not used currently for this simple implementation
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const clientInfo = {
      type: "se.cygni.snake.api.request.ClientInfo",
      language: 'JavaScript',
      languageVersion: 'ES2020',
      clientVersion: '1.0.0',
      operatingSystem: 'Node.js Web',
      operatingSystemVersion: "Web",
};

export function createHeartbeatRequestMessage(receivingPlayerId: string) {
    return { type: 'se.cygni.snake.api.request.HeartBeatRequest', receivingPlayerId };
}

export function createRegisterPlayerMessage(playerName: string, gameSettings = {}) {
    return { type: 'se.cygni.snake.api.request.RegisterPlayer', playerName, gameSettings };
}

export function createRegisterMoveMessage(direction: Direction, receivingPlayerId: string, gameId: string, gameTick: number) {
    return { type: 'se.cygni.snake.api.request.RegisterMove', direction, receivingPlayerId, gameId, gameTick };
}

export function simpleClient(arenaName: string, name: string, timeBetweenMoves: number) {

    const host = "ws://localhost:8080/arena/" + arenaName;

    console.log('Using API endpoint', host);
    const ws = new WebSocket(host);

    console.log('url was', ws.url);

    let heartbeatTimeout: NodeJS.Timeout;

    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onclose = handleClose;
    ws.onerror = (error: any) => console.error('Error:', error);

    let currentDirection = Direction.Up;

    // event listener to change the direction of the player
    document.addEventListener('keydown', (event) => {
        console.log("pressed key: " + event.key);
        switch (event.key) {
            case 'a':
                currentDirection = Direction.Left;
                break;
            case 'w':
                currentDirection = Direction.Up;
                break;
            case 'd':
                currentDirection = Direction.Right;
                break;
            case 's':
                currentDirection = Direction.Down;
                break;
        }
        console.log("current direction: " + currentDirection);
    });

    function sendMessage(message: any) {
        console.info('PLAYER: Sending message', message);
        ws.send(JSON.stringify(message));
    }

    function close() {
        console.log('PLAYER: Closing connection');
        if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
          ws.close();
        }
    }

    function handleOpen() {
        console.info('WebSocket is open');
        sendMessage(clientInfo);
        console.info('Registering player:', name);
        sendMessage(createRegisterPlayerMessage(name));
    }

    function handleMessage({data}: MessageEvent) {
        const message: Message = JSON.parse(data);
        console.info('PLAYER: Received message:', message);

        switch (message.type) {
            case MessageTypes.HEARTBEAT_RESPONSE:
                heartbeatResponseEvent(message as HeartBeatResponseMessage);
                break;
            case MessageTypes.PLAYER_REGISTERED:
                console.info('Player registered successfully!');
                break;
            case MessageTypes.MAP_UPDATE_EVENT:
                mapUpdateEvent(message as MapUpdateEventMessage);
                break;
        
            default:
                console.warn('Unknown message type:', message.type);
                break;
        }
    }

    function handleClose({ code, reason, wasClean }: { code: number, reason: string, wasClean: boolean }) {
        console.info(`WebSocket is closed`, { code, reason, wasClean });
        clearTimeout(heartbeatTimeout);
    }

    function heartbeatResponseEvent(message: HeartBeatResponseMessage) {
        if (message.receivingPlayerId === null) throw new Error('Receiving player id is null');
        heartbeatTimeout = setTimeout(sendMessage, HEARTBEAT_INTERVAL, createHeartbeatRequestMessage(message.receivingPlayerId));
    }

    async function mapUpdateEvent({map, receivingPlayerId, gameId, gameTick, timestamp}: MapUpdateEventMessage) {
        console.info('Map update event', map);

        console.log('Sleeping for', timeBetweenMoves, 'ms');
        await sleep(timeBetweenMoves - MS_SLEEP_MARGIN);

        if (receivingPlayerId === null) throw new Error('Receiving player id is null');

        const moveMessage = createRegisterMoveMessage(currentDirection, receivingPlayerId, gameId, gameTick);
        console.info('Sending move message', moveMessage);
        sendMessage(moveMessage);
    }

    return close;
}