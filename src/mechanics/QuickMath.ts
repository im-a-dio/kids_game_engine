// QuickMath.ts
// Quick Math mechanic for Kids Game Engine
// Children solve simple math problems

export class QuickMath {
  problem: string = '';
  answer: number = 0;
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    const max = 10 + level * 5;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    this.problem = `${a} + ${b}`;
    this.answer = a + b;
  }

  check(userAnswer: number) {
    return userAnswer === this.answer;
  }

  reset() {
    const max = 10 + this.level * 5;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    this.problem = `${a} + ${b}`;
    this.answer = a + b;
  }
}
