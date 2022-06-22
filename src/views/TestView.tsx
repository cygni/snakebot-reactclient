import { useDispatch, useSelector } from "react-redux"
import { assignColor } from "../context/slices/colorSlice";
import { createSlice, createAction } from '@reduxjs/toolkit'
import { dataDispatch, setGameData } from '../context/slices/gameDataSlice'
import api from '../api';

const testAction = createAction('testAction');

function TestView() {
    const snakeColors = useSelector<any,any>(state => state.snakeColors.color);
    const dispatch = useDispatch();
    
    const messages = useSelector<any,any>(state => state.gameData.messages);
    console.log(messages);

    const snakes = ["Snake1", "Snake2", "Snake3"];

    const gameID = "c95ba49c-0baf-480c-a397-d4304c8b0043"; //HARDCODED WILL BREAK NEXT RESTART

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
            <button onClick={()=>dispatch(assignColor(snakes))}>ADD</button >
            <button onClick={()=>dispatch(testAction())}>TEST</button>
            <button onClick={()=>dispatch(dataDispatch(messages[msgNumber++]))}>SWITCH</button>
            {/* <p>messages: {JSON.stringify(messages)}</p> */}
            <p>snakeColors: {snakeColors}</p>
       
        </section>
    )
}

export default TestView