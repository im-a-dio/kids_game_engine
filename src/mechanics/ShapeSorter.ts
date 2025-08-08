// ShapeSorter.ts
// Shape Sorter mechanic for Kids Game Engine
// Children sort shapes into categories

export class ShapeSorter {
  shapes: string[] = [];
  categories = ['round', 'pointy'];
  answers: string[] = [];
  level: number;

  constructor(level: number = 1) {
    this.level = level;
    const allShapes = ['circle', 'triangle', 'square', 'oval', 'star', 'hexagon'];
    this.shapes = allShapes.slice(0, 3 + level);
    this.answers = this.shapes.map(shape => ['circle','oval'].includes(shape) ? 'round' : 'pointy');
  }

  check(index: number, category: string) {
    return this.answers[index] === category;
  }
}
