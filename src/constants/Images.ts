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
import starPath from '../assets/images/star.svg';

import type { TilePosition } from '../context/slices/currentFrameSlice';

function createImg(src: string) {
  const img = new Image();
  img.src = src;
  return img;  
}

const star = createImg(starPath);

const deadSnakeHead = createImg(deadSnakeHead100);
const snakeHeads = [
  createImg(snake0EBDE7),
  createImg(snake3CC321),
  createImg(snakeFF8F35),
  createImg(snakeF978AD),
  createImg(snakeBA43FF),
  createImg(snakeF8F8F8),
  createImg(snakeFFDF4A),
  createImg(snake000000),
  createImg(snakeFF4848),
  createImg(snake9AF48E),
  createImg(snake9BF3F0)
]

const deadSnakeTail = createImg(deadSnakeTail100);
const snakeTails = [
  createImg(snake0EBDE7Tail),
  createImg(snake3CC321Tail),
  createImg(snakeFF8F35Tail),
  createImg(snakeF978ADTail),
  createImg(snakeBA43FFTail),
  createImg(snakeF8F8F8Tail),
  createImg(snakeFFDF4ATail),
  createImg(snake000000Tail),
  createImg(snakeFF4848Tail),
  createImg(snake9AF48ETail),
  createImg(snake9BF3F0Tail)
]

export function getStar() {
  return star;
}

export function getSnakeHead(color: string) {
  switch (color) {
    case '#0EBDE7':
      return snakeHeads[0];
    case '#3CC321' :
      return snakeHeads[1];
    case '#FF8F35' :
      return snakeHeads[2];
    case '#F978AD' :
      return snakeHeads[3];
    case '#BA43FF' :
      return snakeHeads[4];
    case '#F8F8F8' :
      return snakeHeads[5];
    case '#FFDF4A' :
      return snakeHeads[6];
    case '#000000' :
      return snakeHeads[7];
    case '#FF4848' :
      return snakeHeads[8];
    case '#9AF48E' :
      return snakeHeads[9];
    case '#9BF3F0' :
      return snakeHeads[10];
    case '#dead' :
    case '#999999' :
      return deadSnakeHead;
    default:
      return snakeHeads[10];
  }
}

export function getSnakeTail(color: string) {
  switch (color) {
    case '#0EBDE7':
      return snakeTails[0];
    case '#3CC321' :
      return snakeTails[1];
    case '#FF8F35' :
      return snakeTails[2];
    case '#F978AD' :
      return snakeTails[3];
    case '#BA43FF' :
      return snakeTails[4];
    case '#F8F8F8' :
      return snakeTails[5];
    case '#FFDF4A' :
      return snakeTails[6];
    case '#000000' :
      return snakeTails[7];
    case '#FF4848' :
      return snakeTails[8];
    case '#9AF48E' :
      return snakeTails[9];
    case '#9BF3F0' :
      return snakeTails[10];
    case '#dead' :
    case '#999999' :
      return deadSnakeTail;
    default:
      return snakeTails[10];
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

