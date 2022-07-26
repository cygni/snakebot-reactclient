const MessageTypes = {
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
    GAME_RESULT_EVENT : 'se.cygni.snake.api.event.GameResultEvent',
    UPDATE_TOURNAMENT_SETTINGS : 'se.cygni.snake.event.UpdateTournamentSettings',
    CREATE_TOURNAMENT : 'se.cygni.snake.event.CreateTournament',
    START_TOURNAMENT : 'se.cygni.snake.event.StartTournament',
    START_TOURNAMENT_GAME : 'se.cygni.snake.event.StartTournamentGame',
};

export default MessageTypes;

// ##################################################
// ########### Typescript message types #############
// ##################################################

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

export type GameSettings = {
    addFoodLikelihood: number;
    foodEnabled: boolean;
    headToTailConsumes: boolean;
    maxNoofPlayers: number;
    noofRoundsTailProtectedAfterNibble: number;
    obstaclesEnabled: boolean;
    pointsPerCausedDeath: number;
    pointsPerFood: number;
    pointsPerLength: number;
    pointsPerNibble: number;
    removeFoodLikelihood: number;
    spontaneousGrowthEveryNWorldTick: number;
    startFood: number;
    startObstacles: number;
    startSnakeLength: number;
    tailConsumeGrows: boolean;
    timeInMsPerTick: number;
    trainingGame: boolean;
}

export interface GameStartingEvent extends Message {
    gameSettings: GameSettings;
    height: number;
    noofPlayers: number;
    width: number;
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

export type PlayerRank = {
    alive: boolean;
    playerId: string;
    playerName: string;
    points: number;
    rank: number;
};

export interface GameResultMessage extends Message {
    playerRanks: PlayerRank[];
}

export interface GameEndedMessage extends Message {
    gameTick: number;
    map: GameMap;
    playerWinnerId: string;
    playerWinnerName: string;
}

// ##################################################
// ########## Tournament related messages ###########
// ##################################################

export type SocketMessage = {
    type: string;
}

export interface TournamentCreatedMessage extends SocketMessage {
    gameSettings: GameSettings;
    tournamentId: string;
    tournamentName: string;
}

export type Player = {
    name: string;
    id: string;
    points: number;
    isWinner: boolean;
    isMovedUpInTournament: boolean;
}

export type TournamentGame = {
    expectedNoofPlayers: number;
    gameId: string | null;
    gamePlayed: boolean;
    players: Player[]

    // Extra variable not received from the server
    isViewed: boolean;
}

export type TournamentLevel = {
    expectedNoofPlayers: number;
    level: number;
    players: Player[];
    tournamentGames: TournamentGame[];
    tournamentName: string;
}

export interface TournamentGamePlanMessage extends SocketMessage {
    noofLevels: number;
    players: Player[];
    tournamentId: string;
    tournamentLevels: TournamentLevel[];
    tournamentName: string;
}

type ActiveGame = {
    gameFeatures: GameSettings;
    gameId: string;
    players: Player[];
    subscribing: boolean;
}

export interface ActiveGamesListMessage extends SocketMessage {
    games: ActiveGame[];
}

export interface TournamentEndedMessage extends SocketMessage {
    gameId: string;
    gameResult: {name: string, playerId: string, points: number}[];
    playerWinnerId: string;
    receivingPlayerId: null;
    timestamp: number;
    tournamentId: string;
    tournamentName: string;
}