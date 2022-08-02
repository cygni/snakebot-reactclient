import { useAppDispatch, useAppSelector } from '../../context/hooks';
import api from '../../api';
import { startArenaGame } from '../../context/slices/arenaSlice';
import { useState } from 'react';

function PlayerList() {
  const arenaPlayers = useAppSelector((state) => state.arena.players);
  const arenaId = useAppSelector((state) => state.arena.arenaName);
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();

  function startGame() {
    if (arenaPlayers.length >= 2) {
      console.log('Starting arena...');
      dispatch(startArenaGame());
    } else {
      alert('A minimum of 2 players is required to start');
    }
  }

  function createArena() {
    // Skapa ny arena här istället för i client
    setCopied(false);
    api.createArenaGame();
  }

  function copyButton() {
    if (arenaId) {
      navigator.clipboard.writeText(arenaId);
      setCopied(true);
    }
  }

  function infoText() {
    if (!arenaId) {
      return <p className='playerInfo'>Create an arena with the button below</p>;
    }

    if (copied) {
      return <p className='playerInfoCopied'>Text Copied!</p>;
    }

    return <p className='playerInfo'>Click button to copy to clipboard</p>
  }

  return (
    <>
      <h1 className='playerListH1'>Arena</h1>
      <button className='playerInfoArena' onClick={copyButton}>{arenaId}</button>
      {infoText()}
      <div className='playersList'>
        {arenaPlayers.map((playerName, index) => (
          <p className='playerString' key={index}>
            {playerName}
          </p>
        ))}
      </div>
      <div className='playerlistBtns'>
        <button onClick={createArena} className=' createArenaButton'>
          Create New
        </button>
        <button onClick={startGame} className='startArenaButton'>
          Start
        </button>
      </div>
    </>
  );
}

export default PlayerList;
