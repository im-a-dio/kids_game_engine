// MatchTheTaps.ts
// Match the Taps mechanic for Kids Game Engine
// Children tap a sequence of buttons in order

export class MatchTheTaps {
  sequence: number[] = [];
  userInput: number[] = [];
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    this.sequence = Array.from({length: 3 + level}, () => Math.floor(Math.random() * 4));
  }

  addUserInput(index: number) {
    this.userInput.push(index);
  }

  isCorrect() {
    return this.userInput.join(',') === this.sequence.join(',');
  }

  reset() {
    this.userInput = [];
    this.sequence = Array.from({length: this.sequence.length}, () => Math.floor(Math.random() * 4));
  }
}
