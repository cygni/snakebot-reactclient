import { useState } from "react"
import { Link } from 'react-router-dom';
import api from "../api";
import type { Game } from "../api";
import search from "../assets/icons/search-icon.svg"

 function GamesearchView() {
  const [snakeName, setSnakeName] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  async function searchGames(event: React.FormEvent) {
    event.preventDefault();
    let games = await api.searchForGames(snakeName);
    console.log("Got games:", games);
    setHasSearched(true);
    setSearchResults(games);
  }

  function Results() {
    if (searchResults.length === 0 && hasSearched) {
      return (

        // <p
        //   className={true ? 'show' : 'hidden'}
        //   style={{ color: 'red' }}
        // >No result found</p>

        <div className={true ? 'show' : 'hidden'}>
          <div className="no-results">
                  <img src={search}></img>
                  <h2>No results found</h2>
                  <p>Make sure the spelling is correct or try searching for something else.</p>
          </div>
        </div>
        
        
        );
      } else {
        return (
        <ul className="searchresults"> {
          [...searchResults].reverse().map((game: Game, index: number) => (
            <li key={index}>
              <h3 className="searchheadline">
              </h3>

              <p><span className="game-played">Game Played:</span>{game.gameDate} <Link to={{ pathname: '/viewgame/' + game.gameId }} ><span className="viewgame"> View Game</span></Link></p>
              {/* <ul className="players"> {
                game.players.map((player: string, i: number) => (
                  <li key={i} className={(snakeName === player ? 'match' : '')}>
                    { player }
                  </li>
                ))}
              </ul> */}
            </li>
            
          ))}
        </ul>);
        
        
      }
    }

  return (
    <>
      <section className="gameView">
          <article>
            <h1 className="searchH1">Search for old games</h1>
            <p className="searchintro">
              You can find old games here by searching for the snake name.
            </p>
            <div className="text-content">
              <form className="clear-fix" onSubmit={searchGames}>
                <input
                  id="yourName"
                  type="text"
                  value={snakeName}
                  placeholder="Snake name"
                  onChange={(e) => setSnakeName(e.target.value)}
                  className="searchfield"
                />
                <input className="searchbtn" type="submit" value="Search" />
              </form>
              {/* <h2 className="searchresultsheadline">Results</h2> */}
              { Results() }

            </div>
          </article>
        </section>
      </>
  )
}

export default GamesearchView