// MemoryPairs.ts
// Memory Pairs mechanic for Kids Game Engine
// Children flip cards to find matching pairs

export interface MemoryPairCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  _el?: HTMLButtonElement; // UI reference
}

export class MemoryPairs {
  cards: MemoryPairCard[] = [];
  flipped: number[] = [];
  level: number;
  values: string[];

  constructor(values: string[], level: number = 1) {
    this.level = level;
    // Increase difficulty by adding more pairs for higher levels
    const pairsCount = Math.min(values.length, 3 + level); // e.g. level 1: 4 pairs, level 2: 5 pairs, etc.
    this.values = values.slice(0, pairsCount);
    this.cards = this.values.concat(this.values).map((v, i) => ({
      id: i,
      value: v,
      isFlipped: false,
      isMatched: false
    })).sort(() => Math.random() - 0.5);
  }

  flipCard(id: number) {
    const card = this.cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    card.isFlipped = true;
    this.flipped.push(id);
    if (this.flipped.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [id1, id2] = this.flipped;
    const card1 = this.cards.find(c => c.id === id1);
    const card2 = this.cards.find(c => c.id === id2);
    if (card1 && card2 && card1.value === card2.value) {
      card1.isMatched = true;
      card2.isMatched = true;
    } else {
      setTimeout(() => {
        if (card1) card1.isFlipped = false;
        if (card2) card2.isFlipped = false;
      }, 1000);
    }
    this.flipped = [];
  }

  isGameOver() {
    return this.cards.every(c => c.isMatched);
  }
}
