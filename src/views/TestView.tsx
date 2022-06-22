import { useDispatch, useSelector } from "react-redux"
import { assignColor } from "../context/slices/colorSlice";
import { createSlice, createAction } from '@reduxjs/toolkit'

const testAction = createAction('testAction');

function TestView() {
    const snakeColors = useSelector<any,any>(state => state.snakeColors.color);
    const dispatch = useDispatch();

    const snakes = ["Snake1", "Snake2", "Snake3"];
    

    return (
        <section className="page clear-fix">
            <button onClick={()=>dispatch(assignColor(snakes))}>ADD</button >
            <button onClick={()=>dispatch(testAction())}>TEST</button>
            <p>snakeColors: {snakeColors}</p>
       
        </section>
    )
}

export default TestView