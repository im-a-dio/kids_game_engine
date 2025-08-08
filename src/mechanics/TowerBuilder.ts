// TowerBuilder.ts
// Simple Tower Builder mechanic for Kids Game Engine

export class TowerBuilder {
  height: number = 0;
  maxHeight: number;

  constructor(maxHeight: number = 10) {
    this.maxHeight = maxHeight;
  }

  addBlock() {
    if (this.height < this.maxHeight) {
      this.height++;
    }
  }

  isComplete() {
    return this.height === this.maxHeight;
  }
}
