// LightsOut.ts
// Simple Lights Out mechanic for Kids Game Engine

export class LightsOut {
  lights: boolean[];
  size: number;

  constructor(size: number = 5) {
    this.size = size;
    this.lights = Array(size).fill(true);
  }

  toggle(index: number) {
    this.lights[index] = !this.lights[index];
    if (index > 0) this.lights[index-1] = !this.lights[index-1];
    if (index < this.size-1) this.lights[index+1] = !this.lights[index+1];
  }

  isSolved() {
    return this.lights.every(l => !l);
  }
}
