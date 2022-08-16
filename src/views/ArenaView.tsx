import { useEffect } from "react";
import Game from "../components/arena/Game";
import LoadingPage from "../components/arena/LoadingPage";
import PlayerList from "../components/arena/PlayerList";
import Settings from "../components/arena/Settings";
import { ArenaEnums } from "../constants/ViewEnums";
import { useAppSelector } from "../context/hooks";
import { simpleClient } from "../playerApi";

function ArenaView() { 
  const activeArenaView = useAppSelector(state => state.arena.arenaViewState);

  const arenaName = useAppSelector(state => state.arena.arenaName);
  const timeInMsPerTick = useAppSelector(state => state.arena.gameSettings.timeInMsPerTick);
  const arenaPlayers = useAppSelector(state => state.arena.players);
  const playingAsPlayer = useAppSelector(state => state.arena.playingAsPlayer);

  // Join as a human player, triggered on playingAsPlayer
  useEffect(() => {
    if (playingAsPlayer) {
      let numOfHumans = 1;
      for (const player of arenaPlayers) {
        if (player.startsWith('Player')) {
          numOfHumans++;
        }
      }
      const name = "Player" + numOfHumans;
      console.log('Playing as', name, '...');
      let disconnectClient = simpleClient(arenaName, name, timeInMsPerTick);

      // Disconnect from the arena when the component unmounts
      return () => {
        disconnectClient();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [playingAsPlayer]);

  function selectView(page: ArenaEnums) {
    switch (page) {
      case ArenaEnums.PLAYERLIST:
        return <PlayerList />;
      case ArenaEnums.SETTINGSPAGE:
        return <Settings />;
      case ArenaEnums.LOADINGPAGE:
        return <LoadingPage />;
      case ArenaEnums.GAME:
        return <Game />;
    }
  }

  return (
    <section className="page clear-fix">
      {selectView(activeArenaView)}
    </section>
  );
}

export default ArenaView;
