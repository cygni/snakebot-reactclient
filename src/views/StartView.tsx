import cygnilogo from '../assets/logos/cygni-logo.svg';
import phone from '../assets/images/cygni-instagram.png';
import instagramCygni from '../assets/images/cygni-instagram.png';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modal'

function StartView() {

  return (
    <>

    <div className="header-image">
        <div className="header-content">
            <h1 >Welcome to Snakebot!</h1>
            <img src={cygnilogo} alt='cygni-logo'/>
        </div>
    </div>

    <div className='welcome'>
        <h1>Welcome!</h1>
        <p>Remember the old game of Snake? One of the first common implementations was available on the phone Nokia 3310. Snake Record - Nokia 3310</p>
        <p>This game is a bit different. To play you need to program your own Snake Bot and you will be competing against other bots! The concept is
            simple, your snake can move UP, DOWN, RIGHT or LEFT and the winner is the last snake alive. Extra points are awarded when eating stars or
            nibbling on other snake's tails. Look out for the black holes though!</p>
        <p>Checkout the screencasts below:</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL_mlNK0QR9ykOvFg3z4nmAT_aZxCVCrD4" frameBorder="0" allowFullScreen/>
        <p>We at Cygni love programming. We also love a friendly competetion over a couple of beers. What better way to combine these two things than a battle in programming!</p>
        <p>Hack your own Snake Bot and train it in the Training room. From time to time we hold tournaments where you will be able to face other player's Snake Bots.</p>

        <h2>Game rules</h2>
          <p>
            The rules are configurable per game, upon every game start the clients
            will be notified of the current game settings.
            Here are the default rules:
          </p>
          <ul>
            <li>Snake grows every third game tick</li>
            <li>Each client must respond within 250ms</li>
            <li>1 point per Snake growth</li>
            <li>2 points per star consumed</li>
            <li>10 points per tail nibble</li>
            <li>5 points per caused death (another snake crashes and dies into your snake)</li>
            <li>5 black holes</li>
            <li>A nibbled tail is protected for 3 game ticks</li>
            <li>The last surviving Snake always wins.
              The ranking for dead snakes is based on accumulated points
            </li>
          </ul>
    </div>

    <div className="getting-started">
        <h1>Getting started</h1>
        <p>Your mission is to write the best Snake Bot and survive within the game world. All the boring stuff concerning server-client communication, message parsing and event handling is already implemented.</p>
        
        <h2>General principles</h2>
        <p>The game progresses through Game Ticks. For each Game Tick participating Snake Bots have to choose an action (and they have to do it fast, response is
            expected within 250ms). Actions are defined by a direction to move the Snake head in. A Snake head may move UP, DOWN, RIGHT or LEFT.</p>
        <p>On every Game Tick each Snake Bot receives the current Map. The map contains the positions of all the objects in the map.</p>
        
        <h2>JavaScript client</h2>
        <p>The client is written in JavaScript and the project can be cloned through the GitHub repository via the link below. We recommend using VS Code for editing this project but feel free to use any editor you prefer. The project has a Readme file that explains how to get going.</p>
        <a href="https://github.com/cygni/snakebot-client-js">Github Repository</a>
    </div>

    <div className="cygni-at-campus">
        <h1>Cygni at your campus?</h1>
        <p>Follow @cygniatcampus at Instagram to find out more about the Cygni activities at your Campus and to get info about our next Snakebot event. </p>
        {/* <img className="phone-cygni" src={instagramCygni} alt="Cygni-instagram" /> */}

    </div>


    
    </>
  )
}

export default StartView