import snakehead from '../../../assets/images/0EBDE7.png';


type Props = {
    snake: any
}



function ScoreBoard(props: any){
{

    

const snakes = ["Snake1", "Snake2", "Snake3"];


  return (
    <div className="box activePlayers">
        <ul>
            {
            snakes.map(snake => (
            <li key={snake}>
            <figure>
            <img src={snakehead} alt="snakehead" />
            </figure>
            </li>
            ))}
        </ul>
    </div>
  )
}

}

export default ScoreBoard;
