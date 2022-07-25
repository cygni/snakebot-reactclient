import { useRef } from "react";
import { TilePosition } from "../context/slices/currentFrameSlice";
import { Image, Group } from "react-konva";
import { TILE_OFFSET_X, TILE_OFFSET_Y, TILE_SIZE } from "../constants/BoardUtils";
import { getStar } from "../constants/Images";

type Props = {
  stars: TilePosition[];
};

function Stars({ stars }: Props) {
  const starImage = getStar();
  const groupRef = useRef<any>(null); // Can be used later to animate the stars
  const offset = TILE_SIZE / 2;
  return (
    <Group ref={groupRef}>
      {stars.map((star, index) => (
        <Image
          key={index}
          image={starImage}
          x={star.x * TILE_SIZE + offset + TILE_OFFSET_X}
          y={star.y * TILE_SIZE + offset + TILE_OFFSET_Y}
          width={TILE_SIZE}
          height={TILE_SIZE}
          offset={{ x: offset, y: offset }}
        />
      ))}
    </Group>
  );
}

export default Stars;
