import { useDispatch, useSelector } from "react-redux"
import { createAction } from '@reduxjs/toolkit'
import { setGameData } from '../context/slices/gameDataSlice'
import type { Message } from "../constants/messageTypes";
import api from '../api';
import messageDispatch from '../context/messageDispatch';

const testAction = createAction('testAction');

function TestView() {
    const snakeColors = useSelector<any,any>(state => state.snakes.colors);
    const dispatch = useDispatch();
    
    const messages: Message[] = useSelector<any,any>(state => state.gameData.messages);
    console.log(messages);

    const snakes = ["Snake1", "Snake2", "Snake3"];

    const gameID = "35bd8834-0dda-4cd2-bb8a-2e54f8a04c61"; //HARDCODED WILL BREAK NEXT RESTART

    let msgNumber = 0;

    return (
        <section className="page clear-fix">
            <button onClick={
            async () => {
                const data = await api.getGame(gameID!);
                console.log("fetched gameData", data);
                // setGameData(data);
                dispatch(setGameData(data));
            }
        } >Get game</button>
            {/* <button onClick={()=>dispatch(assignColor(snakes))}>ADD</button > */}
            <button onClick={()=>dispatch(testAction())}>TEST</button>
            <button onClick={()=>messageDispatch()}>SWITCH</button>
            {/* <p>messages: {JSON.stringify(messages)}</p> */}
            <p>snakeColors: {JSON.stringify(snakeColors)}</p>
       
        </section>
    )
}

export default TestView