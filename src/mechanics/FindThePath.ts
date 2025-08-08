// FindThePath.ts
// Find the Path mechanic for Kids Game Engine
// Children find a path through a grid

export class FindThePath {
  grid: number[][] = [];
  path: [number, number][] = [];
  userPath: [number, number][] = [];
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    const size = 3 + level;
    this.grid = Array.from({length: size}, () => Array(size).fill(0));
    this.path = Array.from({length: size}, (_, i) => [i, i]);
  }

  addUserStep(x: number, y: number) {
    this.userPath.push([x, y]);
  }

  isCorrect() {
    return JSON.stringify(this.userPath) === JSON.stringify(this.path);
  }

  reset() {
    this.userPath = [];
  }
}
