// ReactionTimer.ts
// Reaction Timer mechanic for Kids Game Engine
// Children tap as quickly as possible when prompted

export class ReactionTimer {
  startTime: number = 0;
  endTime: number = 0;
  reaction: number = 0;
  level: number;

  constructor(level: number = 1) {
    this.level = level;
  }

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.endTime = Date.now();
    this.reaction = this.endTime - this.startTime;
    return this.reaction;
  }

  reset() {
    this.startTime = 0;
    this.endTime = 0;
    this.reaction = 0;
  }
}
