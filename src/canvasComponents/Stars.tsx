
import { TilePosition } from "../context/slices/currentFrameSlice";
import { Rect, Image, Layer, Group } from "react-konva"
import { TILE_OFFSET_X, TILE_OFFSET_Y, TILE_SIZE } from "../constants/BoardUtils";
import { getStar } from "../constants/Images";
import { useEffect, useRef } from "react";
import konva from "konva";


type Props = {
    stars: TilePosition[];
}

function Stars({stars}: Props) {
    const starImage = getStar();
    const groupRef = useRef<any>(null);

    // let anim = new konva.Animation((frame)=>{
    //     groupRef?.current?.children.forEach((child: any) => {
    //         // console.log("child", child)
    //         // child.rotate(360 * (frame?.timeDiff!/1000));
    //         // child.opacity = 0.5;
    //     });
    // }, groupRef.current);

    // useEffect(()=>{
    //     anim.start()
    // }, []);

    return (
        <Group ref={groupRef}>
        {stars.map((star, index) => (<Image
            key={index}
                x={star.x * TILE_SIZE + TILE_OFFSET_X}
                y={star.y * TILE_SIZE + TILE_OFFSET_Y}
                width={TILE_SIZE}
                height={TILE_SIZE}
                image={starImage}
            />))}
        </Group>
    )
}

export default Stars