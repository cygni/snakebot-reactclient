export const MAP_HEIGHT = 34;
export const MAP_WIDTH = 46;

const WANTED_SIZE_PX = 1000;

// choose integer and set width/height in px as factor of that
export const TILE_SIZE = Math.floor(WANTED_SIZE_PX / MAP_WIDTH); // TILE_SIZE = 21;
export const TILE_MARGIN = 2;

export const TILE_OFFSET_X = 1; // To center the tile on the x-axis (Might be a better way to do this)
export const TILE_OFFSET_Y = 0; // To center the tile on the y-axis (Might be a better way to do this)

export const MAP_HEIGHT_PX = MAP_HEIGHT * TILE_SIZE;
export const MAP_WIDTH_PX = MAP_WIDTH * TILE_SIZE; // 966px close to 1000 px

// export default {
//   getTileSize() {
//     return TILE_SIZE;
//   },

//   calculateSize() {
//     return { width: MAP_WIDTH_PX, height: MAP_HEIGHT_PX };
//   },
// };


export function convertCoords(absoluteTile: number) {
  // console.log(size);
  const x = absoluteTile % MAP_WIDTH;
  const y = Math.floor(absoluteTile / MAP_WIDTH);
  // console.log(x,y);
  return { x, y };
}
