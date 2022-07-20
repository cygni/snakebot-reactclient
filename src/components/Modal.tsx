
import { RiCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux"
import type { RootState } from '../context/store';
import Podium from '../assets/images/Podium.svg';
import { BsX } from 'react-icons/bs'
import { useEffect } from "react";


function Modal({setIsOpen} :any){
    const snakes = useSelector((state: RootState) => state.currentFrame);
    console.log("test")

    return (
    <>
        
 <div className="darkBG" onClick={() => setIsOpen(false)}/>
        <div className="centered">
            <div className="modal">

                <h1>The podium</h1>
                <img src={Podium}></img>

                {/* <p>{snakes.playerRanks[0]}</p>
                <p>{snakes.playerPoints[0]}</p> */}

                <div className="players">
                    <div className="player">
                        <h3>{snakes.playerRanks[2]}</h3>
                        <h5>{snakes.playerPoints[2]} points</h5>
                    </div>

                    <div className="player">
                        <h3>{snakes.playerRanks[0]}</h3>
                        <h5>{snakes.playerPoints[0]} points</h5>
                    </div>

                    <div className="player">
                        <h3>{snakes.playerRanks[1]}</h3>
                        <h5>{snakes.playerPoints[1]} points</h5>
                    </div>
                </div>
                
                <button className="closeBtn" onClick={() => setIsOpen(false)}>
                    <p><BsX/></p>
                </button>

                <div className="buttons">
                    <button>Search for new game</button>
                    <button>Close</button>
                </div>
           
            </div>
        </div> 
    </>
    );
}

export default Modal;