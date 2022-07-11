
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

export default {
  getSnakeColor(i: number) {
    return snakeColors[i];
  },
  DEAD_SNAKE: '#999999',
};
