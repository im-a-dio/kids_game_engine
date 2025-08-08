// SlidingPuzzle.ts
// Simple Sliding Puzzle mechanic for Kids Game Engine

export class SlidingPuzzle {
  tiles: number[];
  size: number;

  constructor(size: number = 3) {
    this.size = size;
    this.tiles = Array.from({length: size*size}, (_, i) => i).sort(() => Math.random() - 0.5);
  }

  move(index: number) {
    const empty = this.tiles.indexOf(0);
    const validMoves = [empty-1, empty+1, empty-this.size, empty+this.size];
    if (validMoves.includes(index)) {
      [this.tiles[empty], this.tiles[index]] = [this.tiles[index], this.tiles[empty]];
    }
  }
}
