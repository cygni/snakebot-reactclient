import React, { createContext } from 'react';
import { useState } from 'react';

export const GameContext = createContext<GameContextType>({} as GameContextType);
export const CurrentFrameContext = createContext<CurrentFrameContextType>({} as CurrentFrameContextType);

type GameContextType = [GameData, React.Dispatch<React.SetStateAction<GameData>>];
type CurrentFrameContextType = [number, React.Dispatch<React.SetStateAction<number>>];

export type GameData = {
    gameDate: string;
    gameID: string;
    messages: message[];
    playerNames: string[];
    type: string;
}

export type message = {
    gameId: string;
    receivingPlayerId: any;
    timestamp: number;
    type: string;
}

export function GameProvider( { children }: any ) {
    const emptyGameData: GameData = {
        gameDate: "",
        gameID: "",
        messages: [],
        playerNames: [],
        type: ""
    }
    const [gameData, setGameData] = useState(emptyGameData);
    const [currentFrame, setCurrentFrame] = useState(0);
    return (
        <GameContext.Provider value={[gameData, setGameData]}>
            <CurrentFrameContext.Provider value={[currentFrame, setCurrentFrame]}>
                {children}
            </CurrentFrameContext.Provider>
        </GameContext.Provider>
    )
}