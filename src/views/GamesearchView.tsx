import { useState } from "react"

type Props = {}

function GamesearchView({}: Props) {
  const [snakeName, setSnakeName] = useState("");

  function searchGames(event: any) {
    event.preventDefault();
    alert(`Searching for games with ${snakeName}`);
  }

  let results;
  if (true) { //TODO: Change to "noResultsFound"
    results = (
      <p
        className={true ? 'show' : 'hidden'}
        style={{ color: 'red' }}
      >No result found</p>);
  } else {
    results = (<p>TODO: IMPLEMENT SEARCHRESULTS</p>);
    // results = (
    //   <ul className="searchresults"> {
    //     this.props.searchResults.matchingGames.map((game, index) => (
    //       <li key={index}>
    //         <h3 className="searchheadline">
    //           <Link to={{ pathname: '/viewgame/' + game.gameId }}>
    //             <span className="date">Date: {game.gameDate}</span>
    //           </Link>
    //         </h3>
    //         <ul className="players"> {
    //           game.players.map((player, i) => (
    //             <li key={i} className={(this.state.searchName === player ? 'match' : '')}>
    //               { player }
    //             </li>
    //           ))}
    //         </ul>
    //       </li>
    //     ))}
    //   </ul>);
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

            { results }

          </div>
        </article>
      </section>
  )
}

export default GamesearchView