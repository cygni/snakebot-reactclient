
import { RiCloseLine } from "react-icons/ri";
import { useSelector } from "react-redux"
import type { RootState } from '../context/store';


function Modal({setIsOpen} :any){
    const snakes = useSelector((state: RootState) => state.currentFrame);
    return (
    <>
        <div className="darkBG" onClick={() => setIsOpen(false)}/>
        <div className="centered">
            <div className="modal">
                <div className="modalHeader">
            
            <div className="snakeHeadP1">
                <img src={("")} alt="snakehead" />
            </div>
            <div className="imageTextP1">
                
                <p>{snakes.playerRanks[0]}</p>
            </div>
            <div className="pointsTextP1">
                
                <p>{snakes.playerPoints[0]}</p>
            </div>
            <div className="snakeHeadP2">
                <img src={""} alt="snakehead" />
            </div>
            <div className="imageTextP2">
                <p>{snakes.playerRanks[1]}</p>
            </div>
            <div className="pointsTextP2">
                
                <p>{snakes.playerPoints[1]}</p>
            </div>
            <div className="snakeHeadP3">
                <img src={""} alt="snakehead" />
            </div>
            <div className="imageTextP3">
                <p>{snakes.playerRanks[2]}</p>
            </div>
            <div className="pointsTextP3">
                <p>{snakes.playerPoints[2]}</p>
            </div>
            </div>
            <button className="closeBtn" onClick={() => setIsOpen(false)}>
                <RiCloseLine style={{ marginBottom: "-3px"}}  />
            </button>
           
         </div>
        </div> 
    </>
    );
}

export default Modal;