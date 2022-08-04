import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { setArenaView, startArenaGame, resetArena, createArena } from '../../context/slices/arenaSlice';
import { useState } from 'react';
import { ArenaEnums } from '../../constants/ViewEnums';

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

  function _createArena() {
    setCopied(false);
    dispatch(createArena());
  }

  function endArena() {
    dispatch(resetArena());
  }

  function viewSettings() {
    dispatch(setArenaView(ArenaEnums.SETTINGSPAGE));
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

    return <p className='playerInfo'>Click button to copy to clipboard</p>;
  }

  function playerlistButtons() {
    if (arenaId) {
      return (
        <>
          <button onClick={endArena} className='red'>End Arena</button>

          <button onClick={startGame} className='green'>
            Start
          </button>
        </>
      );
    }
    return (
      <>
        <button onClick={_createArena} className='blue'>
          Create New
        </button>

        <button onClick={viewSettings} className='black'>
          Change Settings
        </button>
      </>
    );
  }

  return (
    <>
      <h1 className='playerListH1'>Arena</h1>
      <button className='playerInfoArena' onClick={copyButton}>
        {arenaId}
      </button>
      {infoText()}
      <div className='playersList'>
        {arenaPlayers.map((playerName, index) => (
          <p className='playerString' key={index}>
            {playerName}
          </p>
        ))}
      </div>
      <div className='playerlistBtns'>{playerlistButtons()}</div>
    </>
  );
}

export default PlayerList;
