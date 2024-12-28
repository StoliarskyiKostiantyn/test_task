export type Point = {
  x: number;
  y: number;
};

const gridList = [".X.", ".X.", "..."];

const start = { x: 0, y: 0 };
const end = { x: 0, y: 2 };

const result = runner(gridList, start, end);
console.log(result); //must be 3 [{ x: 2, y: 1 },{x:1,y:2}, { x: 0, y: 2 }]

function getNeighbors(grid: string[][], point: Point): Point[] {
  const neighbors = [];
  const directions = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const [dx, dy] of directions) {
    const x = point.x + dx;
    const y = point.y + dy;
    if (
      x >= 0 &&
      x < grid.length &&
      y >= 0 &&
      y < grid[0].length &&
      grid[x][y] === "."
    ) {
      neighbors.push({ x, y });
    }
  }

  return neighbors;
}

function getPath(
  parent: Map<string, Point>,
  start: Point,
  end: Point
): Point[] {
  const path = [];
  let current = end;
  while (current.x !== start.x || current.y !== start.y) {
    path.push(current);
    const key = `${current.x},${current.y}`;
    current = parent.get(key)!;
  }

  path.push(start);
  return path.reverse();
}

export function runner(gridList: string[], start: Point, end: Point): Point[] {
  const grid = gridList.map((row) => row.split(""));
  const queue = [start];
  const visited = new Set<string>();
  const parent = new Map<string, Point>();

  while (queue.length) {
    const current = queue.shift()!;
    if (current.x === end.x && current.y === end.y) {
      return getPath(parent, start, end);
    }

    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const key = `${neighbor.x},${neighbor.y}`;
      if (!visited.has(key)) {
        visited.add(key);
        parent.set(key, current);
        queue.push(neighbor);
      }
    }
  }

  return [];
}
