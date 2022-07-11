
import { TilePosition } from "../context/slices/currentFrameSlice";
import { Rect, Image, Layer, Group, KonvaNodeComponent } from "react-konva"
import { TILE_OFFSET_X, TILE_OFFSET_Y, TILE_SIZE } from "../constants/BoardUtils";
import { getStar } from "../constants/Images";
import { RefObject, useEffect, useRef, useState } from "react";
import konva from "konva";


type Props = {
    stars: TilePosition[];
}

function Stars({stars}: Props) {
    const starImage = getStar();
    const groupRef = useRef<any>(null);
    const lastTime = useRef(0);

    let anim = new konva.Animation((frame)=>{
        groupRef?.current?.children.forEach((child: any, index: number) => {
            if (frame!.time > lastTime.current + 1000) {

                if (child.opacity() < 0.5) {
                    child.to({
                        opacity: 1,
                        duration: 0.5,
                        scaleX: 1,
                        scaleY: 1,
                    })
                } else if (Math.random() > 0.9) {
                    child.to({
                        duration: 1,
                        opacity: 0.4,
                        scaleX: 0.2,
                        scaleY: 0.2,
                    });
                }
                
                if (index === groupRef.current.children.length - 1) {
                    lastTime.current = frame!.time;
                }
            }
        });
    }, groupRef.current);

    useEffect(()=>{
        anim.start()
    }, []);

    const offset = TILE_SIZE/2;
    return (
        <Group ref={groupRef}>
        {stars.map((star, index) => (<Image
            key={index}
                x={star.x * TILE_SIZE + offset + TILE_OFFSET_X}
                y={star.y * TILE_SIZE + offset + TILE_OFFSET_Y}
                width={TILE_SIZE}
                height={TILE_SIZE}
                image={starImage}
                offset={{x: TILE_SIZE/2, y: TILE_SIZE/2}}
            />))}
        </Group>
    )
}

export default Stars