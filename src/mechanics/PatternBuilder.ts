// PatternBuilder.ts
// Pattern Builder mechanic for Kids Game Engine
// Children build a pattern by clicking colored buttons

export class PatternBuilder {
  pattern: string[] = [];
  userPattern: string[] = [];
  colors = ['red', 'blue', 'green', 'yellow'];
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    this.pattern = Array.from({length: 3 + level}, () => this.colors[Math.floor(Math.random() * this.colors.length)]);
  }

  addUserColor(color: string) {
    this.userPattern.push(color);
  }

  isCorrect() {
    return this.userPattern.join(',') === this.pattern.join(',');
  }

  reset() {
    this.userPattern = [];
    this.pattern = Array.from({length: this.pattern.length}, () => this.colors[Math.floor(Math.random() * this.colors.length)]);
  }
}
