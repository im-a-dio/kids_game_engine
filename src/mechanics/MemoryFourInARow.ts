// MemoryFourInARow.ts
// Memory 4 in a Row mechanic for Kids Game Engine
// Children try to get 4 matching cards in a row

export interface MemoryFourCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export class MemoryFourInARow {
  cards: MemoryFourCard[] = [];
  flipped: number[] = [];
  level: number;
  values: string[];

  constructor(values: string[], level: number = 1) {
    this.level = level;
    const setsCount = Math.min(values.length, 1 + level); // e.g. level 1: 2 sets, level 2: 3 sets, etc.
    this.values = values.slice(0, setsCount);
    this.cards = this.values.concat(this.values).concat(this.values).concat(this.values).map((v, i) => ({
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
    if (this.flipped.length === 4) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [id1, id2, id3, id4] = this.flipped;
    const card1 = this.cards.find(c => c.id === id1);
    const card2 = this.cards.find(c => c.id === id2);
    const card3 = this.cards.find(c => c.id === id3);
    const card4 = this.cards.find(c => c.id === id4);
    if (card1 && card2 && card3 && card4 && card1.value === card2.value && card2.value === card3.value && card3.value === card4.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      card3.isMatched = true;
      card4.isMatched = true;
    } else {
      setTimeout(() => {
        if (card1) card1.isFlipped = false;
        if (card2) card2.isFlipped = false;
        if (card3) card3.isFlipped = false;
        if (card4) card4.isFlipped = false;
      }, 1000);
    }
    this.flipped = [];
  }

  isGameOver() {
    return this.cards.every(c => c.isMatched);
  }
}
