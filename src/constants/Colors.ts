
const snakeColors = [
  '#0EBDE7',
  '#3CC321',
  '#FF8F35',
  '#F978AD',
  '#BA43FF',
  '#F8F8F8',
  '#FFDF4A',
  '#000000',
  '#FF4848',
  '#9AF48E',
  '#9BF3F0',
];

const Colors = {
  getSnakeColor: (index: number) => {
    return snakeColors[index % snakeColors.length];
  },
  DEAD_SNAKE: '#999999',
}

export default Colors;
