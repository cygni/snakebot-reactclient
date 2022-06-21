import React, { createContext } from 'react';
import { useState } from 'react';

export const GameContext = createContext<[GameData, React.Dispatch<React.SetStateAction<GameData>>]>([{} as GameData,()=>{}]);

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
    return (
        <GameContext.Provider value={[gameData, setGameData]}>
            {children}
        </GameContext.Provider>
    )
}