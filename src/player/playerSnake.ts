import { GameMap } from "./utils";
import { MessageType } from "./messages";
import { GameSettings, Direction } from "./types";
import type {
  GameStartingEventMessage,
  Message,
  SnakeDeadEventMessage,
} from "./messageTypes";

const allDirections = Object.values(Direction); // [Direction.Up, Direction.Down, Direction.Left, Direction.Right];

// Get random item in array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * This is where you write your AI code. You will be given a GameMap object containing the current state of the game.
 * Use this object to determine your next move. Remember to return a Direction enum value before your time runs out!
 * (Default time is 250ms)
 */
export async function getNextMove(
  gameMap: GameMap,
  directionQueue: Direction[],
  lastDirection: Direction,
): Promise<Direction> {
  // Filters safe directions to move in
  const possibleMoves = allDirections.filter((direction) =>
    gameMap.playerSnake.canMoveInDirection(direction),
  );

  // If there are no safe moves, bad luck!
  if (possibleMoves.length === 0) {
    return Direction.Down;
  }

  const direction = directionQueue.shift() || lastDirection;
  console.log("possibleMoves", possibleMoves);
  console.log("direction", direction);
  if (possibleMoves.includes(direction)) {
    console.log("using player supplied direction");
    return direction;
  }

  // Otherwise, choose a random possible direction
  return getRandomItem(possibleMoves);
}

/**
 * This is an optional handler that you can use if you want to listen for specific events.
 * Check out the MessageType enum for a list of events that can be listened to.
 */
export function onMessage(message: Message) {
  switch (message.type) {
    case MessageType.GameStarting:
      message = message as GameStartingEventMessage; // Cast to correct type
      // Reset snake state here
      break;
    case MessageType.SnakeDead:
      message = message as SnakeDeadEventMessage; // Cast to correct type
      // Check how many snakes are left and switch strategy
      break;
  }
}

// Settings ommitted are set to default values from the server, change this if you want to override them
export const trainingGameSettings = {
  // maxNoofPlayers: 2,
  // obstaclesEnabled: false,
  // ...
} as GameSettings;

export default {
  getNextMove,
  onMessage,
  trainingGameSettings,
};
