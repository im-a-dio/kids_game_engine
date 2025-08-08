// SoundMemory.ts
// Sound Memory mechanic for Kids Game Engine
// Children repeat a sequence of sounds

export class SoundMemory {
  sequence: string[] = [];
  userInput: string[] = [];
  sounds = ['beep', 'boop', 'ding', 'buzz'];
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    this.sequence = Array.from({length: 3 + level}, () => this.sounds[Math.floor(Math.random() * this.sounds.length)]);
  }

  addUserInput(sound: string) {
    this.userInput.push(sound);
  }

  isCorrect() {
    return this.userInput.join(',') === this.sequence.join(',');
  }

  reset() {
    this.userInput = [];
    this.sequence = Array.from({length: this.sequence.length}, () => this.sounds[Math.floor(Math.random() * this.sounds.length)]);
  }
}
