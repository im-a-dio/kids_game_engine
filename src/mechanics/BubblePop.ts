// BubblePop.ts
// Simple Bubble Pop mechanic for Kids Game Engine

export class BubblePop {
  bubbles: boolean[] = Array(10).fill(true);
  score: number = 0;

  pop(index: number) {
    if (this.bubbles[index]) {
      this.bubbles[index] = false;
      this.score++;
    }
  }

  isAllPopped() {
    return this.bubbles.every(b => !b);
  }
}
