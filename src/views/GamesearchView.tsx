import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

type Props = {}

function GamesearchView({}: Props) {
  const [snakeName, setSnakeName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function searchGames(event: any) {
    event.preventDefault();
    axios(`history/search/${snakeName}`).then(
      (response) => {
        setSearchResults(response.data.items);
        console.log("searchResults: ", searchResults);
      }
    ).catch(()=>setSearchResults([]));
  }

  useEffect(()=>console.log(searchResults), [searchResults]);

  function Results() {
    if (searchResults.length === 0) {
      return (
        <p
          className={true ? 'show' : 'hidden'}
          style={{ color: 'red' }}
        >No result found</p>);
      } else {
        return (
        <ul className="searchresults"> {
          searchResults.map((game: any, index: any) => (
            <li key={index}>
              <h3 className="searchheadline">
                <Link to={{ pathname: '/viewgame/' + game.gameId }}>
                  <span className="date">Date: {game.gameDate}</span>
                </Link>
              </h3>
              <ul className="players"> {
                game.players.map((player: any, i: number) => (
                  <li key={i} className={(snakeName === player ? 'match' : '')}>
                    { player }
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>);
      }
    }

  return (
    <section className="page clear-fix">
        <article>
          <h1>Search for old games</h1>
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
            <h2 className="searchresultsheadline">Results</h2>

            { Results() }

          </div>
        </article>
      </section>
  )
}

export default GamesearchView