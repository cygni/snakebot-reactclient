import { GameMap } from "./utils";

import { Direction, GameSettings } from "./types";
import {
  createClientInfoMessage,
  createHeartbeatRequestMessage,
  createRegisterMoveMessage,
  createRegisterPlayerMessage,
  MessageType,
} from "./messages";
import {
  ArenaIsFullMessage,
  GameEndedEventMessage,
  GameLinkEventMessage,
  GameResultEventMessage,
  GameStartingEventMessage,
  HeartBeatResponseMessage,
  InvalidMessage,
  InvalidPlayerNameMessage,
  MapUpdateEventMessage,
  Message,
  NoActiveTournamentMessage,
  PlayerRegisteredMessage,
  SnakeDeadEventMessage,
  TournamentEndedMessage,
} from "./messageTypes";
import Arbitraryconstants from "../constants/Arbitraryconstants";

const HEARTBEAT_INTERVAL = 5000;
let ms_sleep_margin = 160;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type SnakeImplementation = {
  getNextMove: (
    gameMap: GameMap,
    directionQueue: Direction[],
    lastDirection: Direction,
  ) => Promise<Direction>;
  onMessage?: (message: any) => void;
};

export type ClientInfo = {
  clientVersion: string;
  operatingSystem: string;
  operatingSystemVersion: string;
};

export type ClientOptions = {
  name: string;
  venue: string;
  snake: SnakeImplementation;
};

export function createClient({ name, venue, snake }: ClientOptions) {
  const clientInfo = {
    type: "se.cygni.snake.api.request.ClientInfo",
    language: "JavaScript",
    languageVersion: "ES2020",
    clientVersion: "1.0.0",
    operatingSystem: "Web-player",
    operatingSystemVersion: "v1.0.0",
  };

  let gameSettings = {} as GameSettings;
  let timeBetweenMoves = 250;
  let host = "";
  let heartbeatTimeout: NodeJS.Timeout;
  let directionQueue: Direction[] = [Direction.Up];
  let lastDirection = Direction.Up;

  if (Arbitraryconstants.SERVER_URL.startsWith("http:")) {
    host = "ws://" + Arbitraryconstants.SERVER_URL.substring(7);
  } else if (Arbitraryconstants.SERVER_URL.startsWith("https:")) {
    host = "wss://" + Arbitraryconstants.SERVER_URL.substring(8);
  }
  host += "/arena/" + venue;

  const ws = new WebSocket(host);

  ws.onopen = handleOpen;
  ws.onmessage = handleMessage;
  ws.onclose = handleClose;
  ws.onerror = (error: any) => console.error("PLAYER: Error:", error);

  function sendMessage(message: any) {
    ws.send(JSON.stringify(message));
  }

  function close() {
    console.info("No longer listening for keydown events");
    document.removeEventListener("keydown", handleKeyDown);
    if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING) {
      ws.close();
    }
  }

  function handleOpen() {
    console.info("WebSocket is open");
    sendMessage(createClientInfoMessage(clientInfo));
    console.info("Registering player:", name);
    sendMessage(createRegisterPlayerMessage(name));
    console.info("Listening for keydown events");
    document.addEventListener("keydown", handleKeyDown);
  }

  function handleKeyDown(event: KeyboardEvent) {
    const dirQueueLength = directionQueue.length;
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        console.log("ok");
        directionQueue.push(Direction.Left);
        break;
      case "ArrowUp":
      case "w":
        console.log("HELLO");
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
      case "j":
        ms_sleep_margin += 10;
        console.log("ms_sleep_margin", ms_sleep_margin);
        break;
      case "k":
        ms_sleep_margin -= 10;
        console.log("ms_sleep_margin", ms_sleep_margin);
        break;
    }
    const addedDirection = dirQueueLength !== directionQueue.length;
    if (addedDirection) {
      console.log("Pressed key: " + event.key);
      event.preventDefault(); // Do not scroll the window
    }
  }

  /** Dispatches received messages to respective handlers (if any)
   * and also passes the messages to the snake onMessage function as a subscription */
  function handleMessage({ data }: MessageEvent) {
    const message: Message = JSON.parse(data);
    switch (message.type) {
      case MessageType.PlayerRegistered:
        playerRegisteredEvent(message as PlayerRegisteredMessage);
        break;
      case MessageType.HeartbeatResponse:
        heartbeatResponseEvent(message as HeartBeatResponseMessage);
        break;
      case MessageType.GameLink:
        gameLinkEvent(message as GameLinkEventMessage);
        break;
      case MessageType.GameStarting:
        gameStartingEvent(message as GameStartingEventMessage);
        break;
      case MessageType.MapUpdate:
        mapUpdateEvent(message as MapUpdateEventMessage);
        break;
      case MessageType.SnakeDead:
        snakeDeadEvent(message as SnakeDeadEventMessage);
        break;
      case MessageType.GameResult:
        gameResultEvent(message as GameResultEventMessage);
        break;
      case MessageType.GameEnded:
        gameEndedEvent(message as GameEndedEventMessage);
        break;
      case MessageType.InvalidPlayerName:
        invalidPlayerNameEvent(message as InvalidPlayerNameMessage);
        break;
      case MessageType.TournamentEnded:
        tournamentEndedEvent(message as TournamentEndedMessage);
        break;
      case MessageType.NoActiveTournament:
        noActiveTournamentEvent(message as TournamentEndedMessage);
        break;
      case MessageType.InvalidArenaName:
        invalidArenaName(message as InvalidPlayerNameMessage);
        break;
      case MessageType.ArenaIsFull:
        arenaIsFull(message as ArenaIsFullMessage);
        break;
      case MessageType.InvalidMessage:
        invalidMessage(message as InvalidMessage);
        break;
      default:
        console.warn("Unknown Event", message.type);
        console.log("Message was:", data);
        break;
    }

    // If the snake implementation has a onMessage function, pass the message to it
    if (snake.onMessage !== undefined) {
      snake.onMessage(message);
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
    console.info(`WebSocket is closed`, { code, reason, wasClean });
    clearTimeout(heartbeatTimeout);
  }

  function playerRegisteredEvent(message: PlayerRegisteredMessage) {
    console.info(`Player ${name} was successfully registered!`);

    sendMessage(createHeartbeatRequestMessage(message.receivingPlayerId));
  }

  function heartbeatResponseEvent(message: HeartBeatResponseMessage) {
    heartbeatTimeout = setTimeout(
      sendMessage,
      HEARTBEAT_INTERVAL,
      createHeartbeatRequestMessage(message.receivingPlayerId),
    );
  }

  function gameLinkEvent(message: GameLinkEventMessage) {
    console.info("Game is ready");
  }

  function gameStartingEvent(message: GameStartingEventMessage) {
    console.info("Game is starting");
    console.info(
      "Received updated game settings from server:",
      JSON.stringify(message.gameSettings),
    );
    gameSettings = message.gameSettings; // Update game settings with the ones from the server
    timeBetweenMoves = gameSettings.timeInMsPerTick;
  }

  async function mapUpdateEvent({
    map,
    receivingPlayerId,
    gameId,
    gameTick,
    timestamp,
  }: MapUpdateEventMessage) {
    const gameMap = new GameMap(map, receivingPlayerId, gameSettings, gameTick);
    await sleep(timeBetweenMoves - ms_sleep_margin);
    const direction = await snake.getNextMove(
      gameMap,
      directionQueue,
      lastDirection,
    );
    console.log("MOVING TO: " + direction);
    sendMessage(
      createRegisterMoveMessage(direction, receivingPlayerId, gameId, gameTick),
    );
    lastDirection = direction;
  }

  function snakeDeadEvent(message: SnakeDeadEventMessage) {
    // console.info("Snake died because:", message.deathReason);
  }

  function gameResultEvent(message: GameResultEventMessage) {
    // console.info("Game result is in: ", url);
  }

  function gameEndedEvent(message: GameEndedEventMessage) {
    // console.info("Game has ended. The winner was", message.playerWinnerName);
  }

  function invalidPlayerNameEvent(message: InvalidPlayerNameMessage) {
    console.info(
      `The player name ${name} was invalid, reason: ${message.reasonCode}`,
    );
    close();
  }

  function tournamentEndedEvent(message: TournamentEndedMessage) {
    console.info("Tournament has ended.");
    close();
  }

  function noActiveTournamentEvent(message: NoActiveTournamentMessage) {
    console.info("No active tournament. Closing...");
    close();
  }

  function invalidArenaName(message: InvalidPlayerNameMessage) {
    console.info(`There is no arena with the code: ${venue}`);
    close();
  }

  function arenaIsFull(message: ArenaIsFullMessage) {
    console.info(
      `The arena ${venue} is full, players connected: ${message.playersConnected}`,
    );
    close();
  }

  function invalidMessage(message: InvalidMessage) {
    console.warn(message.errorMessage);
  }

  return close;
}
