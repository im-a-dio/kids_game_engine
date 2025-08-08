// MemorySequence.ts
// Simple Memory Sequence mechanic for Kids Game Engine

export class MemorySequence {
  sequence: number[] = [];
  userInput: number[] = [];

  constructor(length: number = 5) {
    this.sequence = Array.from({length}, () => Math.floor(Math.random() * 10));
  }

  addUserInput(num: number) {
    this.userInput.push(num);
  }

  isCorrect() {
    return this.userInput.join(',') === this.sequence.join(',');
  }

  reset() {
    this.userInput = [];
    this.sequence = Array.from({length: this.sequence.length}, () => Math.floor(Math.random() * 10));
  }
}
