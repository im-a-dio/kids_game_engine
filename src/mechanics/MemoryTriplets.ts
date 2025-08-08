// MemoryTriplets.ts
// Memory Triplets mechanic for Kids Game Engine
// Children flip cards to find matching triplets

export interface MemoryTripletCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export class MemoryTriplets {
  cards: MemoryTripletCard[] = [];
  flipped: number[] = [];
  level: number;
  values: string[];

  constructor(values: string[], level: number = 1) {
    this.level = level;
    const tripletsCount = Math.min(values.length, 2 + level); // e.g. level 1: 3 triplets, level 2: 4 triplets, etc.
    this.values = values.slice(0, tripletsCount);
    this.cards = this.values.concat(this.values).concat(this.values).map((v, i) => ({
      id: i,
      value: v,
      isFlipped: false,
      isMatched: false
    })).sort(() => Math.random() - 0.5);
  }

  flipCard(id: number) {
    if (this.flipped.length === 3) return; // Prevent flipping more than 3 before reset
    const card = this.cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    card.isFlipped = true;
    this.flipped.push(id);
    if (this.flipped.length === 3) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [id1, id2, id3] = this.flipped;
    const card1 = this.cards.find(c => c.id === id1);
    const card2 = this.cards.find(c => c.id === id2);
    const card3 = this.cards.find(c => c.id === id3);
    if (card1 && card2 && card3 && card1.value === card2.value && card2.value === card3.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      card3.isMatched = true;
      this.flipped = [];
    } else {
      setTimeout(() => {
        if (card1) card1.isFlipped = false;
        if (card2) card2.isFlipped = false;
        if (card3) card3.isFlipped = false;
        this.flipped = [];
      }, 1000);
    }
  }

  isGameOver() {
    return this.cards.every(c => c.isMatched);
  }
}
