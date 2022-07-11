import { Group, Rect, Image, Arc } from 'react-konva';
import { TILE_MARGIN, TILE_OFFSET_X, TILE_OFFSET_Y, TILE_SIZE } from '../constants/BoardUtils';
import { SnakeData, TilePosition } from '../context/slices/currentFrameSlice';
import Colors from '../constants/Colors';
import { getCurrentSnakeHead, getCurrentSnakeTail } from '../constants/Images';

type Props = {
  snake: SnakeData;
}

function Snake({snake}: Props) {
  const headImage = getCurrentSnakeHead(snake);
  const tailImage = getCurrentSnakeTail(snake);
  const color = snake.alive ? snake.color : Colors.DEAD_SNAKE;

  function drawLine(line: TilePosition[]) {
    if (line.length <= 1) return null;

    // Check if line is horizontal or vertical
    const horizontal = line[0].y === line[1].y;

    // Temporary for not drawing the last tile and not getting it as left/topMost tile
    line = line.slice(0, line.length - 1);

    // Temporary for not drawing head
    if (JSON.stringify(line[0]) === JSON.stringify(snake.positions[0])) {
      line = line.slice(1);
      if (line.length === 0) return null;
    };

    if (horizontal) {
      const leftMostTile = line.reduce((prev, curr) => prev.x < curr.x ? prev : curr);
      return (
        <Rect
          // key={lineIndex}
          x={leftMostTile.x * TILE_SIZE + TILE_OFFSET_X}
          y={leftMostTile.y * TILE_SIZE + TILE_MARGIN/2 + TILE_OFFSET_Y}
          width={line.length * TILE_SIZE}
          height={TILE_SIZE - TILE_MARGIN}
          fill={color}
          // stroke={"black"}
          // strokeWidth={1}
        />)
    } else {
      const topMostTile = line.reduce((prev, curr) => prev.y < curr.y ? prev : curr);
      return (
        <Rect
          // key={lineIndex}
          x={topMostTile.x * TILE_SIZE + TILE_MARGIN/2 + TILE_OFFSET_X}
          y={topMostTile.y * TILE_SIZE + TILE_OFFSET_Y}
          width={TILE_SIZE - TILE_MARGIN}
          height={line.length * TILE_SIZE}
          fill={color}
          // stroke={"black"}
          // strokeWidth={1}
        />)
    }
  }

  function renderRect() {
    if (snake.positions.length <= 1) return null;
    let lines: TilePosition[][] = [];
    let currentLine = [snake.positions[0]];
    let lastMovementHorizontal = true;
    for(let i = 1; i < snake.positions.length; i++) {
      const dy = snake.positions[i].y - snake.positions[i-1].y;
      const currentMovementHorizontal = (dy === 0);
      if (i === 1) lastMovementHorizontal = currentMovementHorizontal; // first movement is same direction

      if (currentMovementHorizontal !== lastMovementHorizontal) { // new line
        if (currentLine.length > 0) lines.push(currentLine);
        currentLine = [snake.positions[i]];
      } else {
        currentLine.push(snake.positions[i]);
      }
      lastMovementHorizontal = currentMovementHorizontal;

    }
    lines.push(currentLine); // add last line

    return lines.map((line, lineIndex) => {
      const lastTile = line[line.length-1];

      // Draw line
      return (
        <Group key={lineIndex}>
          {drawLine(line)}
          {drawRoundedRect(lastTile, lines, lineIndex)}
        </Group>
      );
    });
  }

  function drawRoundedRect(tile: TilePosition, lines: TilePosition[][], lineIndex: number) {
    const currLine = lines[lineIndex];
    const nextLine = lines[lineIndex+1];
    const prevLine = lines[lineIndex-1];
    if (nextLine === undefined) return null; // tail of snake
    const toTile = nextLine[0];
    let fromTile = currLine[currLine.length - 2]; // second last tile of current line
    if (fromTile === undefined && prevLine === undefined) return null;
    if (fromTile === undefined) {
      fromTile = prevLine[prevLine.length - 1];
    }

    const tileToRight = (toTile.x - tile.x === 1) || (fromTile.x - tile.x === 1);
    const tileToUp = (toTile.y - tile.y === 1) || (fromTile.y - tile.y === 1);
    const tileToLeft = (toTile.x - tile.x === -1) || (fromTile.x - tile.x === -1);
    const tileToDown = (toTile.y - tile.y === -1) || (fromTile.y - tile.y === -1);

    let rotation = 0;
    if (tileToRight) {
      rotation = tileToUp ? 180 : 90;
    } else if (tileToLeft) {
      rotation = tileToDown ? 0 : 270; 
    } else {
      console.error("Could not determine rotation", tile, toTile, fromTile);
    }

    const offset = (TILE_SIZE)/2;
    return (
      <Arc
        x={tile.x * TILE_SIZE + offset + TILE_OFFSET_X }
        y={tile.y * TILE_SIZE + offset + TILE_OFFSET_Y}
        innerRadius={0 + TILE_MARGIN/2}
        outerRadius={TILE_SIZE - TILE_MARGIN/2}
        angle={90}
        fill={color}
        rotation={rotation}
        offset={{x: offset, y: offset}}
        // stroke={"black"}
        // strokeWidth={1}
      />
    );
  }

  function renderImage(tile: TilePosition, toTile: TilePosition, image: HTMLImageElement, rotationOffset=0) {
    if (tile === undefined) return null;

    const dx = tile.x - toTile?.x;
    const dy = tile.y - toTile?.y;

    let marginOffsetX = TILE_MARGIN/2;
    let marginOffsetY = TILE_MARGIN/2;
    let rotation = 0;
    if (dx === 0) { // Vertical
      if (dy === 1) {
        marginOffsetY -= TILE_MARGIN/2;
        rotation = 180;
      }
      else {
        marginOffsetY += TILE_MARGIN/2;
        rotation = 0;
      }
    } else if (dy === 0) { // Horizontal
      if (dx === 1) {
        marginOffsetX -= TILE_MARGIN/2;
        rotation = 90;
      }
      else {
        marginOffsetX += TILE_MARGIN/2;
        rotation = 270;
      }
    }
    
    const offset = (TILE_SIZE - TILE_MARGIN)/2;
    return (
      <Image
        x={tile.x * TILE_SIZE + marginOffsetX + offset + TILE_OFFSET_X}
        y={tile.y * TILE_SIZE + marginOffsetY + offset + TILE_OFFSET_Y}
        width={TILE_SIZE - TILE_MARGIN}
        height={TILE_SIZE - TILE_MARGIN}
        image={image}
        rotation={rotation+rotationOffset}
        offset={{x: offset, y: offset}}
      />
    )

  }

  return (
    <>
    {renderRect()}
    {renderImage(snake.positions[0], snake.positions[1], headImage)}
    {renderImage(snake.positions[snake.positions.length - 1], snake.positions[snake.positions.length - 2], tailImage, 180)}
    </>
  )
}

export default Snake