import Game from "../components/arena/Game";
import LoadingPage from "../components/arena/LoadingPage";
import PlayerList from "../components/arena/PlayerList";
import Settings from "../components/arena/Settings";
import { ArenaEnums } from "../constants/ViewEnums";
import { useAppSelector } from "../context/hooks";

function ArenaView() { 
  const activeArenaView = useAppSelector((state) => state.arena.arenaViewState);

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
