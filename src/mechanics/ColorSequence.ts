// ColorSequence.ts
// Color Sequence mechanic for Kids Game Engine
// Children repeat a sequence of colors

export class ColorSequence {
  sequence: string[] = [];
  userInput: string[] = [];
  colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    this.sequence = Array.from({length: 4 + level}, () => this.colors[Math.floor(Math.random() * this.colors.length)]);
  }

  addUserInput(color: string) {
    this.userInput.push(color);
  }

  isCorrect() {
    return this.userInput.join(',') === this.sequence.join(',');
  }

  reset() {
    this.userInput = [];
    this.sequence = Array.from({length: this.sequence.length}, () => this.colors[Math.floor(Math.random() * this.colors.length)]);
  }
}
