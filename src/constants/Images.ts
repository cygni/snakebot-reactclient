//import star from '../assets/star/star.svg';
import snake0EBDE7 from '../assets/snakes/0EBDE7/0EBDE7.png';
import snake3CC321 from '../assets/snakes/3CC321/3CC321.png';
import snakeFF8F35 from '../assets/snakes/FF8F35/FF8F35.png';
import snakeF978AD from '../assets/snakes/F978AD/F978AD.png';
import snakeBA43FF from '../assets/snakes/BA43FF/BA43FF.png';
import snakeF8F8F8 from '../assets/snakes/F8F8F8/F8F8F8.png';
import snakeFFDF4A from '../assets/snakes/FFDF4A/FFDF4A.png';
import snake000000 from '../assets/snakes/000000/000000.png';
import snakeFF4848 from '../assets/snakes/FF4848/FF4848.png';
import snake9AF48E from '../assets/snakes/9AF48E/9AF48E.png';
import snake9BF3F0 from '../assets/snakes/9BF3F0/9BF3F0.png';
import snake0EBDE7Tail from '../assets/snakes/0EBDE7/0EBDE7_TAIL.png';
import snake3CC321Tail from '../assets/snakes/3CC321/3CC321_TAIL.png';
import snakeFF8F35Tail from '../assets/snakes/FF8F35/FF8F35_TAIL.png';
import snakeF978ADTail from '../assets/snakes/F978AD/F978AD_TAIL.png';
import snakeBA43FFTail from '../assets/snakes/BA43FF/BA43FF_TAIL.png';
import snakeF8F8F8Tail from '../assets/snakes/F8F8F8/F8F8F8_TAIL.png';
import snakeFFDF4ATail from '../assets/snakes/FFDF4A/FFDF4A_TAIL.png';
import snake000000Tail from '../assets/snakes/000000/000000_TAIL.png';
import snakeFF4848Tail from '../assets/snakes/FF4848/FF4848_TAIL.png';
import snake9AF48ETail from '../assets/snakes/9AF48E/9AF48E_TAIL.png';
import snake9BF3F0Tail from '../assets/snakes/9BF3F0/9BF3F0_TAIL.png';
import deadSnakeTail100 from '../assets/snakes/999999/grey-dead-tail-100.svg';
import deadSnakeHead100 from '../assets/snakes/999999/grey-dead-head-100.svg';

import type { TilePosition } from '../context/slices/snakesSlice';

//const starImg = star;

export function getSnakeHead(color: string) {
  switch (color) {
    case '#0EBDE7':
      return snake0EBDE7;
    case '#3CC321' :
      return snake3CC321;
    case '#FF8F35' :
      return snakeFF8F35;
    case '#F978AD' :
      return snakeF978AD;
    case '#BA43FF' :
      return snakeBA43FF;
    case '#F8F8F8' :
      return snakeF8F8F8;
    case '#FFDF4A' :
      return snakeFFDF4A;
    case '#000000' :
      return snake000000;
    case '#FF4848' :
      return snakeFF4848;
    case '#9AF48E' :
      return snake9AF48E;
    case '#9BF3F0' :
      return snake9BF3F0;
    case '#dead' :
    case '#999999' :
      return deadSnakeHead100;
    default:
      return snake000000;
  }
}

export function getSnakeTail(color: string) {
  switch (color) {
    case '#0EBDE7':
      return snake0EBDE7Tail;
    case '#3CC321' :
      return snake3CC321Tail;
    case '#FF8F35' :
      return snakeFF8F35Tail;
    case '#F978AD' :
      return snakeF978ADTail;
    case '#BA43FF' :
      return snakeBA43FFTail;
    case '#F8F8F8' :
      return snakeF8F8F8Tail;
    case '#FFDF4A' :
      return snakeFFDF4ATail;
    case '#000000' :
      return snake000000Tail;
    case '#FF4848' :
      return snakeFF4848Tail;
    case '#9AF48E' :
      return snake9AF48ETail;
    case '#9BF3F0' :
      return snake9BF3F0Tail;
    case '#999999' :
      return deadSnakeTail100;
    default:
      return snake000000Tail;
  }
}

export function getRotation(firstPosition: TilePosition, secondPosition: TilePosition | undefined) {
  if (secondPosition === undefined) return 0;
  
  const xDiff = secondPosition.x - firstPosition.x;
  const yDiff = secondPosition.y - firstPosition.y;
  if(xDiff === 0 && yDiff === 0) return 0;
  else if(xDiff === 0 && yDiff === 1){
    return 0;
  } else if(xDiff === 1 && yDiff === 1){
    return Math.PI/4;
  } else if(xDiff === 1 && yDiff === 0){
    return Math.PI*3/2;
  } else if(xDiff === 0 && yDiff === -1){
    return Math.PI;
  } else if(xDiff === -1 && yDiff === 0){
    return Math.PI/2;
  } else {
    console.error('Error in getRotation');
    return 0;
  }
}

