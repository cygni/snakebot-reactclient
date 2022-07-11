import { useEffect, useRef } from "react";
import { Image, Group } from "react-konva"
import { TILE_OFFSET_X, TILE_OFFSET_Y, TILE_SIZE } from "../constants/BoardUtils";
import { getBlackhole } from "../constants/Images";
import { TilePosition } from "../context/slices/currentFrameSlice";
import konva from "konva";

type Props = {
    obstacles: TilePosition[];
}

function Obstacles({obstacles}: Props) {
    const image = getBlackhole();
    const groupRef = useRef<any>(null);

    let anim = new konva.Animation((frame)=>{
        groupRef?.current?.children.forEach((child: any) => child.rotate(360 * (frame?.timeDiff!/1000) ));
    }, groupRef.current);

    useEffect(()=>{
        anim.start()
    }, []);

    function getNeighbouringObstacles(obstacle: TilePosition) {
        return (obstacles.filter(o => o.x === obstacle.x && o.y === obstacle.y + 1 ||
            o.x === obstacle.x && o.y === obstacle.y - 1 ||
            o.x === obstacle.x + 1 && o.y === obstacle.y ||
            o.x === obstacle.x - 1 && o.y === obstacle.y));
    }

    function findCluster(obstacle: TilePosition) {
        const cluster: TilePosition[] = [];
        if (obstacle === undefined) return cluster;
        const visited: TilePosition[] = [];
        const queue = [obstacle];
        while (queue.length > 0) {
            const current = queue.shift()!;
            if (visited.includes(current)) continue;
            visited.push(current);
            cluster.push(current);
            const neighbors = getNeighbouringObstacles(current);

            neighbors.forEach((neighbor) => {
                if (!visited.includes(neighbor)) {
                    queue.push(neighbor);
                }
            });
        }
        return cluster;
    }

    function renderObstacles() {
        const alreadyRendered = new Set<TilePosition>();
        const imagesToRender = [];

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            if (alreadyRendered.has(obstacle)) continue; // Skip clusters already rendered
            alreadyRendered.add(obstacle);

            const cluster = findCluster(obstacle);
            cluster.forEach((tile) => {
                alreadyRendered.add(tile);
            });

            const sizeFactor = Math.sqrt(cluster.length);
            const offset = (TILE_SIZE * sizeFactor)/2;
            imagesToRender.push(
            <Image
                key={i}
                image={image}
                x={obstacle.x * TILE_SIZE + offset + TILE_OFFSET_X}
                y={obstacle.y * TILE_SIZE + offset + TILE_OFFSET_Y}
                width={TILE_SIZE * sizeFactor}
                height={TILE_SIZE * sizeFactor}
                offset={{x: offset, y: offset}}
            />);
        }

        return imagesToRender;
    }

    return (
        <Group ref={groupRef}>
            {renderObstacles()}
        </Group>
    )
}

export default Obstacles