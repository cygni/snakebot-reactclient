import { GameSettings } from "./messageTypes";
import regularsong from "../assets/audio/regularsong.mp3";
import finalsong from "../assets/audio/finalsong.mp3";

const regularAudio = new Audio(regularsong);
const finalAudio = new Audio(finalsong);

const Arbitraryconstants = {
    SERVER_URL: window.__RUNTIME_CONFIG__.API_URL,
    AUDIO_REGULAR: regularAudio,
    AUDIO_FINAL: finalAudio,
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
        timeInMsPerTick: 250,
        trainingGame: false,
      } as GameSettings
};

regularAudio.loop = true;
finalAudio.loop = true;
regularAudio.volume = 0.5;
finalAudio.volume = 0.5;



export default Arbitraryconstants;

