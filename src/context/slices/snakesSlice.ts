import colors from '../../constants/Colors';
import { createSlice } from '@reduxjs/toolkit';
import Actions from '../Actions';
import  Modal from '../../components/Modal';
import React, { useState } from 'react';
import getPosition from '../../components/Modal';

let colorIndex = 0;

export type SnakeData = {
  name: string;
  points: number;
  color: string;
  positions: number[];
  alive: boolean;
}

export type playerRanks = {
  name: string;
}

export type playerPoints = {
  points: number;
}

interface SnakesState {
  IDs: string[];
  snakesData: {
    [key: string]: SnakeData;
  };
  playerRanks: string[],
  playerPoints: number [],
  
}

const initialState: SnakesState = {
  IDs: [],
  snakesData: {},
  playerRanks: [],
  playerPoints: [],
}

export const snakesSlice = createSlice({
    name: 'snakes',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(Actions.mapUpdateEvent, (state, action) => {

            // Initialize snakes first iteration
            if (action.payload.gameTick === 0) {
                action.payload.map.snakeInfos.forEach(snake => {
                  state.IDs.push(snake.id);
                  state.snakesData = {...state.snakesData,
                    [snake.id]:
                      {name: snake.name,
                      points: snake.points,
                      color: colors.getSnakeColor(colorIndex),
                      positions: snake.positions,
                      alive: true}};

                  colorIndex++;
                });
            }

            // Update snake positions and points
            action.payload.map.snakeInfos.forEach(snake => {
              state.snakesData[snake.id].positions = snake.positions;
              state.snakesData[snake.id].points = snake.points;
              // state.snakesData[snake.id].points = Math.floor(Math.random() * 100);
            });
        })
        .addCase(Actions.snakeDiedEvent, (state, action) => {
          console.log("Snake has died!", action.payload);
          state.snakesData[action.payload.playerId].alive = false;
          
        })
        .addCase(Actions.gameResultEvent, (state, action) => {
         action.payload.playerRanks.forEach(player => {
          console.log(player.playerName);
           state.playerRanks.push(player.playerName);
           state.playerPoints.push(player.points);
         });
          
        })
        
    }
  })
  
  export const { } = snakesSlice.actions
  
  export default snakesSlice.reducer


