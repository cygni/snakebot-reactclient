import { Group, Rect } from 'react-konva';
import Konva from 'konva';
import { useState } from 'react';

import { TILE_MARGIN, TILE_OFFSET_X, TILE_OFFSET_Y, TILE_SIZE } from '../constants/BoardUtils';
import { SnakeData, TilePosition } from '../context/slices/currentFrameSlice';
import Colors from '../constants/Colors';

type Props = {
  snake: SnakeData;
}

function SnakePart({snake}: Props) {

  function drawLine(line: TilePosition[]) {
    if (line.length <= 1) return null;

    // Check if line is horizontal or vertical
    const horizontal = line[0].y === line[1].y;

    // Temporary for not drawing the last tile and not getting it as left/topMost tile
    line.pop();

    if (horizontal) {
      const leftMostTile = line.reduce((prev, curr) => prev.x < curr.x ? prev : curr);
      return (
        <Rect
          // key={lineIndex}
          x={leftMostTile.x * TILE_SIZE + TILE_OFFSET_X}
          y={leftMostTile.y * TILE_SIZE + TILE_MARGIN/2 + TILE_OFFSET_Y}
          width={line.length * TILE_SIZE}
          height={TILE_SIZE - TILE_MARGIN}
          fill={"red"}
          stroke={"black"}
          strokeWidth={1}
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
          fill={"yellow"}
          stroke={"black"}
          strokeWidth={1}
        />)
    }
  }

  function renderRect() {
    if (snake.positions.length <= 1) return null;
    let lines: TilePosition[][] = [];
    let currentLine = [snake.positions[0]];
    let lastMovementHorizontal = true;
    for(let i = 1; i < snake.positions.length; i++) {
      // const dx = snake.positions[i].x - snake.positions[i-1].x;
      const dy = snake.positions[i].y - snake.positions[i-1].y;
      const currentMovementHorizontal = (dy === 0);
      if (i === 1) lastMovementHorizontal = currentMovementHorizontal; // first movement is same direction

      if (currentMovementHorizontal !== lastMovementHorizontal) { // new line
        // lines.push([currentLine.pop()] as TilePosition[]) // Last tile in new line
        if (currentLine.length > 0) lines.push(currentLine);
        console.log(snake.name, "new line", lines, dy, i, snake.positions[i], snake.positions[i-1],currentMovementHorizontal, lastMovementHorizontal);
        currentLine = [snake.positions[i]];
      } else {
        currentLine.push(snake.positions[i]);
      }
      lastMovementHorizontal = currentMovementHorizontal;

    }
    lines.push(currentLine); // add last line
    console.log(snake.name,"lines", lines);

    return lines.map((line, lineIndex) => {
      const lastTile = line[line.length-1];

      // Draw line
      return (
        <Group key={lineIndex}>
          {drawLine(line)}
          <Rect // last tile
            x={lastTile!.x * TILE_SIZE}
            y={lastTile!.y * TILE_SIZE}
            width={TILE_SIZE/2}
            height={TILE_SIZE/2}
            fill={"green"}
          />
        </Group>
      );
    });
  }

  return (
    <>
    {snake.positions.map((position, index) => {
      return (
        <Rect
        key={index}
        fill={snake.alive ? snake.color : Colors.DEAD_SNAKE}
        width={TILE_SIZE}
        height={TILE_SIZE}
        x={position.x * TILE_SIZE + 1} // +1 to center the tile (Might be a better way to do this)
        y={position.y * TILE_SIZE }
        shadowBlur={5}/>
        );
      })}
    {renderRect()}
    </>
  )
}

export default SnakePart