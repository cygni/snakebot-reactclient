import Arbitraryconstants from "./constants/Arbitraryconstants";
import MessageTypes, { Message } from "./constants/messageTypes";

const HEARTBEAT_INTERVAL = 5000;
const MS_SLEEP_MARGIN = 110;

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

type HeartBeatResponseMessage = Message;

export interface MapUpdateEventMessage extends Message {
  gameTick: number;
  gameId: string;
  map: any; // Not used currently for this simple implementation
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const clientInfo = {
  type: "se.cygni.snake.api.request.ClientInfo",
  language: "JavaScript",
  languageVersion: "ES2020",
  clientVersion: "1.0.0",
  operatingSystem: "Node.js Web",
  operatingSystemVersion: "Web",
};

export function createHeartbeatRequestMessage(receivingPlayerId: string) {
  return {
    type: "se.cygni.snake.api.request.HeartBeatRequest",
    receivingPlayerId,
  };
}

export function createRegisterPlayerMessage(
  playerName: string,
  gameSettings = {},
) {
  return {
    type: "se.cygni.snake.api.request.RegisterPlayer",
    playerName,
    gameSettings,
  };
}

export function createRegisterMoveMessage(
  direction: Direction,
  receivingPlayerId: string,
  gameId: string,
  gameTick: number,
) {
  return {
    type: "se.cygni.snake.api.request.RegisterMove",
    direction,
    receivingPlayerId,
    gameId,
    gameTick,
  };
}

export function simpleClient(
  arenaName: string,
  name: string,
  timeBetweenMoves: number,
) {
  let host = "";
  if (Arbitraryconstants.SERVER_URL.startsWith("http:")) {
    host = "ws://" + Arbitraryconstants.SERVER_URL.substring(7);
  } else if (Arbitraryconstants.SERVER_URL.startsWith("https:")) {
    host = "wss://" + Arbitraryconstants.SERVER_URL.substring(8);
  }
  host += "/arena/" + arenaName;

  console.log("PLAYER: Connecting to endpoint", host);
  const ws = new WebSocket(host);

  let heartbeatTimeout: NodeJS.Timeout;

  ws.onopen = handleOpen;
  ws.onmessage = handleMessage;
  ws.onclose = handleClose;
  ws.onerror = (error: any) => console.error("PLAYER: Error:", error);

  let directionQueue: Direction[] = [Direction.Up];
  let lastDirection = Direction.Up;

  // event listener to change the direction of the player
  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown(event: KeyboardEvent) {
    console.log("pressed key: " + event.key);
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        directionQueue.push(Direction.Left);
        break;
      case "ArrowUp":
      case "w":
        directionQueue.push(Direction.Up);
        break;
      case "ArrowRight":
      case "d":
        directionQueue.push(Direction.Right);
        break;
      case "ArrowDown":
      case "s":
        directionQueue.push(Direction.Down);
        break;
    }
    console.log("current direction: " + directionQueue[0]);
  }

  function sendMessage(message: any) {
    console.info("PLAYER: Sending message", message);
    ws.send(JSON.stringify(message));
  }

  function close() {
    console.log("PLAYER: Closing connection");

    // Remove keydown listener
    document.removeEventListener("keydown", handleKeyDown);

    if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
      ws.close();
    }
  }

  function handleOpen() {
    console.info("PLAYER: WebSocket is open");
    sendMessage(clientInfo);
    console.info("PLAYER: Registering player:", name);
    sendMessage(createRegisterPlayerMessage(name));
  }

  function handleMessage({ data }: MessageEvent) {
    const message: Message = JSON.parse(data);
    console.info("PLAYER: Received message:", message);

    switch (message.type) {
      case MessageTypes.HEARTBEAT_RESPONSE:
        heartbeatResponseEvent(message as HeartBeatResponseMessage);
        break;
      case MessageTypes.PLAYER_REGISTERED:
        console.info("PLAYER: Player registered successfully!");
        break;
      case MessageTypes.MAP_UPDATE_EVENT:
        mapUpdateEvent(message as MapUpdateEventMessage);
        break;

      default:
        console.warn("PLAYER: Unknown message type:", message.type);
        break;
    }
  }

  function handleClose({
    code,
    reason,
    wasClean,
  }: {
    code: number;
    reason: string;
    wasClean: boolean;
  }) {
    console.info(`PLAYER: WebSocket is closed`, { code, reason, wasClean });
    clearTimeout(heartbeatTimeout);
  }

  function heartbeatResponseEvent(message: HeartBeatResponseMessage) {
    if (message.receivingPlayerId === null)
      throw new Error("PLAYER: Receiving player id is null");
    heartbeatTimeout = setTimeout(
      sendMessage,
      HEARTBEAT_INTERVAL,
      createHeartbeatRequestMessage(message.receivingPlayerId),
    );
  }

  async function mapUpdateEvent({
    map,
    receivingPlayerId,
    gameId,
    gameTick,
    timestamp,
  }: MapUpdateEventMessage) {
    // Sleep to slow down the game to timeBetweenMoves
    await sleep(timeBetweenMoves - MS_SLEEP_MARGIN);

    if (receivingPlayerId === null)
      throw new Error("PLAYER: Receiving player id is null");

    const direction = directionQueue.shift() || lastDirection;

    const moveMessage = createRegisterMoveMessage(
      direction,
      receivingPlayerId,
      gameId,
      gameTick,
    );
    console.info("PLAYER: Sending move message", moveMessage);
    sendMessage(moveMessage);
    lastDirection = direction;
  }

  return close;
}
