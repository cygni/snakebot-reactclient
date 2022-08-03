import { GameSettings } from "./messageTypes";

const Arbitraryconstants = {
    SERVER_URL: window.__RUNTIME_CONFIG__.API_URL,
    TTS_VOLUME: 0.5,
    TTS_VOICE: 'Daniel',
    STARTING_FREQUENCY: 200,
    FREQUENCY_STEP: 50,
    MIN_FREQUENCY: 50,
    placeholdGameSettings: {
        addFoodLikelihood: 0,
        foodEnabled: false,
        headToTailConsumes: false,
        maxNoofPlayers: 0,
        noofRoundsTailProtectedAfterNibble: 0,
        obstaclesEnabled: false,
        pointsPerCausedDeath: 0,
        pointsPerFood: 0,
        pointsPerLength: 0,
        pointsPerNibble: 0,
        removeFoodLikelihood: 0,
        spontaneousGrowthEveryNWorldTick: 0,
        startFood: 0,
        startObstacles: 0,
        startSnakeLength: 0,
        tailConsumeGrows: false,
        timeInMsPerTick: 0,
        trainingGame: false,
      } as GameSettings
};

export default Arbitraryconstants;