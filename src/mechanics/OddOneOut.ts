// OddOneOut.ts
// Odd One Out mechanic for Kids Game Engine
// Children find the item that doesn't belong

export class OddOneOut {
  items: string[] = [];
  oddIndex: number = 0;
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    const sets = [
      ['cat', 'dog', 'fish', 'car'],
      ['apple', 'banana', 'carrot', 'train'],
      ['circle', 'square', 'triangle', 'bus'],
      ['rose', 'tulip', 'oak', 'truck'],
      ['fork', 'spoon', 'knife', 'plane']
    ];
    const set = sets[Math.min(level-1, sets.length-1)];
    this.oddIndex = set.findIndex(item => ['car', 'train', 'bus', 'truck', 'plane'].includes(item));
    this.items = set;
  }

  check(index: number) {
    return index === this.oddIndex;
  }

  reset() {
    this.constructor(this.level);
  }
}
