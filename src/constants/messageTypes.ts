
export default{
    GAME_HISTORY: "se.cygni.snake.eventapi.history.GameHistory",
    GAME_CREATED_EVENT: 'se.cygni.snake.api.event.GameCreatedEvent',
    GAME_STARTING_EVENT: 'se.cygni.snake.api.event.GameStartingEvent',
    GAME_ENDED_EVENT : 'se.cygni.snake.api.event.GameEndedEvent',
    MAP_UPDATE_EVENT: 'se.cygni.snake.api.event.MapUpdateEvent',
    TOURNAMENT_INFO : 'se.cygni.snake.eventapi.model.TournamentInfo',
    TOURNAMENT_CREATED : 'se.cygni.snake.eventapi.response.TournamentCreated',
    TOURNAMENT_GAME_PLAN : 'se.cygni.snake.eventapi.model.TournamentGamePlan',
    TOURNAMENT_ENDED_EVENT : 'se.cygni.snake.api.event.TournamentEndedEvent',
    ACTIVE_GAMES_LIST : 'se.cygni.snake.eventapi.response.ActiveGamesList',
    UNAUTHORIZED : 'se.cygni.snake.eventapi.exception.Unauthorized',
    SNAKE_DEAD_EVENT : 'se.cygni.snake.api.event.SnakeDeadEvent',
    ARENA_UPDATE_EVENT : 'se.cygni.snake.api.event.ArenaUpdateEvent',
}

export type Message = {
    gameId: string;
    receivingPlayerId: any;
    timestamp: number;
    type: string;
};

export type SnakeInfo = {
    id: string;
    name: string;
    points: number;
    positions: number[];
    tailProtectedForGameTicks: number;
}

export type GameMap = {
    foodPositions: number[];
    height: number;
    obstaclePositions: number[];
    snakeInfos: SnakeInfo[];
    width: number;
    worldTick: number;
}

export type GameCreatedMessage = Message;

export interface GameCreatedEvent extends Message {
    gameSettings: any;
}

export interface MapUpdateMessage extends Message {
    gameTick: number;
    map: GameMap;
}

export interface SnakeDiedMessage extends Message {
    deathReason: string;
    playerId: string;
    x: number;
    y: number;
}
