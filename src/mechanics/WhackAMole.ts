// WhackAMole.ts
// Simple Whack-a-Mole mechanic for Kids Game Engine

export class WhackAMole {
  holes: boolean[] = Array(9).fill(false);
  score: number = 0;
  moleIndex: number = 0;

  showMole() {
    this.moleIndex = Math.floor(Math.random() * 9);
    this.holes = Array(9).fill(false);
    this.holes[this.moleIndex] = true;
  }

  whack(index: number) {
    if (index === this.moleIndex) {
      this.score++;
      this.showMole();
    }
  }
}
