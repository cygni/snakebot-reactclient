import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { setArenaView, startArenaGame, disconnectFromArena, createArena, setPlayingAsPlayer } from '../../context/slices/arenaSlice';
import { useEffect, useState } from 'react';
import { ArenaEnums } from '../../constants/ViewEnums';
import api from '../../api';

function PlayerList() {
  const arenaPlayers = useAppSelector((state) => state.arena.players);
  const arenaId = useAppSelector((state) => state.arena.arenaName);
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();

  const [localArenaId, setLocalArenaId] = useState('');

  useEffect(() => {
    if (arenaId) {
      setLocalArenaId(arenaId);
    }
  }, [arenaId]);

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

  function _joinArena() {
    api.joinArena(localArenaId);
    setLocalArenaId('');
  }

  function disconnectArena() {
    dispatch(disconnectFromArena());
    setLocalArenaId('');
  }

  function viewSettings() {
    dispatch(setArenaView(ArenaEnums.SETTINGSPAGE));
  }

  function copyButton() {
    if (arenaId) {
      console.log('Copying arena id to clipboard...');
      navigator.clipboard.writeText(arenaId);
      setCopied(true);
    }
  }

  function joinAsPlayer() {
    dispatch(setPlayingAsPlayer(true));
  }

  function infoText() {
    if (!arenaId) {
      if (!localArenaId) {
        return <p className='playerInfo'>Create a new arena with the button below or put in an existing code above</p>;
      } else {
        return <p className='playerInfo'>Join the arena with the button below</p>;
      }
    }

    if (copied) {
      return <p className='playerInfoCopied'>Text Copied!</p>;
    }

    return <p className='playerInfo'>Click to copy to clipboard</p>;
  }

  function playerlistButtons() {
    if (arenaId) {
      return (
        <>
          <button onClick={startGame} className='green'>
            Start
          </button>
          
          <button onClick={disconnectArena} className='red'>
            End Arena
          </button>

          <button onClick={joinAsPlayer} className='blue'>
            Join as Player
          </button>
        </>
      );
    }

    if (localArenaId) {
      return (
        <>
          <button onClick={_joinArena} className='green'>
            Join Arena
          </button>

          <button onClick={()=>setLocalArenaId('')} className='black'>
            Clear
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
      <div onClick={copyButton}>
        <input
          className='playerInfoArena'
          value={localArenaId}
          onChange={(e) => setLocalArenaId(e.target.value)}
          placeholder='Arena Code...'
          disabled={arenaId ? true : false}
        />
      </div>
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
