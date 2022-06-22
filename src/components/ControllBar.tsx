import Backwards from '../assets/icons/icon-backwards.svg';
import Play from '../assets/icons/icon-play.svg';
import Pause from '../assets/icons/icon-pause.svg';
import Replay from '../assets/icons/icon-replay.svg';
import Forwards from '../assets/icons/icon-forward.svg';

function ControllBar(){

//TA BORT OCH BYT UT MOT RIKTIGA VÄRDEN
const frameCount = 10;
const currentFrame = 8;


    return (
        <div className="box controlpanel">
        <input
          type="range"
          step="1"
          min="0"
          max={frameCount}
          className="react-native-slider"
          //onChange={GameControl.currentFrameChanged}
        />
        <div className="controlbuttons">
          <input
            type="image"
            src={Backwards}
            name="ButtonBackwards"
            className="backwardsButton"
            //onClick={GameControl.decreaseFrequency}
          />
          <input
            type="image"
            src={Play} //Denna ska egentligen togglas beroende på nuvarande state
            name="PlayButton"
            className="playButton"
            //onClick={state.action}
          />
          <input
            type="image"
            src={Forwards}
            name="ButtonForward"
            className="forwardButton"
            //onClick={GameControl.increaseFrequency}
          />
        </div>
      </div>
    );
}

export default ControllBar;