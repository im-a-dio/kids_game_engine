// MazeRunner.ts
// Simple Maze Runner mechanic for Kids Game Engine

export class MazeRunner {
  maze: number[][];
  position: [number, number];
  goal: [number, number];

  constructor(size: number = 5) {
    this.maze = Array.from({length: size}, () => Array(size).fill(0));
    this.position = [0, 0];
    this.goal = [size-1, size-1];
  }

  move(dir: string) {
    let [x, y] = this.position;
    if (dir === 'up' && y > 0) y--;
    if (dir === 'down' && y < this.maze.length-1) y++;
    if (dir === 'left' && x > 0) x--;
    if (dir === 'right' && x < this.maze[0].length-1) x++;
    this.position = [x, y];
  }

  isAtGoal() {
    return this.position[0] === this.goal[0] && this.position[1] === this.goal[1];
  }
}
