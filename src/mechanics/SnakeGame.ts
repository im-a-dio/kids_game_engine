// SnakeGame.ts
// Simple Snake game mechanic for Kids Game Engine
// Children control a snake to eat food and grow

export class SnakeGame {
  gridSize: number;
  snake: [number, number][];
  direction: string;
  food: [number, number];
  gameOver: boolean;

  constructor(gridSize: number = 10) {
    this.gridSize = gridSize;
    this.snake = [[5, 5]];
    this.direction = 'right';
    this.food = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)];
    this.gameOver = false;
  }

  move(dir: string) {
    if (this.gameOver) return;
    this.direction = dir;
    const head = this.snake[0];
    let newHead: [number, number] = [head[0], head[1]];
    if (dir === 'up') newHead[1]--;
    if (dir === 'down') newHead[1]++;
    if (dir === 'left') newHead[0]--;
    if (dir === 'right') newHead[0]++;
    // Check wall collision
    if (newHead[0] < 0 || newHead[0] >= this.gridSize || newHead[1] < 0 || newHead[1] >= this.gridSize) {
      this.gameOver = true;
      return;
    }
    // Check self collision
    if (this.snake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
      this.gameOver = true;
      return;
    }
    this.snake.unshift(newHead);
    // Check food
    if (newHead[0] === this.food[0] && newHead[1] === this.food[1]) {
      this.food = [Math.floor(Math.random() * this.gridSize), Math.floor(Math.random() * this.gridSize)];
    } else {
      this.snake.pop();
    }
  }
}
