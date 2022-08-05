import { TournamentLevel } from '../../constants/messageTypes';
import { useAppDispatch, useAppSelector } from '../../context/hooks';
import { declareTournamentWinner } from '../../context/slices/tournamentSlice';
import TournamentBracket from './Bracket';
import Podium from '../../assets/images/Podium.svg';
import api from '../../api';
import Arbitraryconstants from '../../constants/Arbitraryconstants';

function roundClassName(round: TournamentLevel) {
  switch (round.level) {
    case 0:
      return 'first-round';
    case 1:
      return 'second-round';
    case 2:
      return 'third-round';
    default:
      return 'final-round';
    // default to keeping it at the largest size
  }
}

function TournamentSchedule() {
  const levels = useAppSelector((state) => state.tournament.tournamentLevels);
  const finalGameResult = useAppSelector((state) => state.tournament.finalGameResult);
  const finalGameID = useAppSelector((state) => state.tournament.finalGameID);
  const declaredWinner = useAppSelector((state) => state.tournament.isWinnerDeclared);
  const viewedGames = useAppSelector((state) => state.tournament.viewedGames);
  const dispatch = useAppDispatch();

  function lastGameViewed() {
    return viewedGames[finalGameID] === true;
  }

  function showPodium() {
    if (lastGameViewed()) {
      if (!declaredWinner) {
        let msg = new SpeechSynthesisUtterance();
        msg.volume = Arbitraryconstants.TTS_VOLUME;
        msg.voice = speechSynthesis.getVoices().find(voice => voice.name === Arbitraryconstants.TTS_VOICE)!;
        
        msg.text = 'Congratulations' + finalGameResult[0].name + ', on winning the tournament!';
        speechSynthesis.speak(msg);
      }
      dispatch(declareTournamentWinner());
      return (
        <>
          <div className='podium'>
            <img alt='podium' src={Podium}></img>
          </div>
          <div className='players'>
            <div className='player'>
              <h3>{finalGameResult[2]?.name}</h3>
              <h5>{finalGameResult[2]?.points} points</h5>
            </div>

            <div className='player'>
              <h3>{finalGameResult[0]?.name}</h3>
              <h5>{finalGameResult[0]?.points} points</h5>
            </div>

            <div className='player'>
              <h3>{finalGameResult[1]?.name}</h3>
              <h5>{finalGameResult[1]?.points} points</h5>
            </div>
          </div>
        </>
      );
    }
    if (declaredWinner) {
      let msg = new SpeechSynthesisUtterance();
      msg.volume = Arbitraryconstants.TTS_VOLUME;

      msg.text = 'Congratulations' + finalGameResult[0].name + ', on winning the tournament!';
      speechSynthesis.speak(msg);
    }
  }

  function lineBracket(index: number, level: TournamentLevel): JSX.Element {
    return (
      <div key={index}>
        <div className={roundClassName(level) + ' round-box'}>
          <h2>Round {level.level}</h2>
          <div className='flex'>
            {level.tournamentGames.map((game, gameIndex) => (
              <ul className='game' key={gameIndex}>
                <TournamentBracket tournamentGame={game} levelIndex={levels.length - 1 - index} />
              </ul>
            ))}
          </div>
        </div>
        {level.level > 0 ? <div className='spacer' /> : <div />}
      </div>
    );
  }

  function handleNewTournament() {
    api.createTournament('Tournament');
  }

  return (
    <>
      <article style={{ textAlign: 'center' }}>
        <h1 className='bracketH1'>{localStorage.getItem('tourName')}</h1>
        {showPodium()}
        <button className='newTournamentButton' onClick={handleNewTournament}>Start new tournament</button>
        <div className='tournamentschedule'>
          {levels
            .slice(0)
            .reverse()
            .map((level, index) => lineBracket(index, level))}
        </div>
      </article>
    </>
  );
}

export default TournamentSchedule;
