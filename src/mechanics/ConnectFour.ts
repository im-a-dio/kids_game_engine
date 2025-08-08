// ConnectFour.ts
// Simple Connect Four mechanic for Kids Game Engine

export class ConnectFour {
  board: string[][];
  current: string;
  winner: string;

  constructor(rows: number = 6, cols: number = 7) {
    this.board = Array.from({length: rows}, () => Array(cols).fill(''));
    this.current = 'R';
    this.winner = '';
  }

  play(col: number) {
    if (this.winner) return;
    for (let row = this.board.length - 1; row >= 0; row--) {
      if (!this.board[row][col]) {
        this.board[row][col] = this.current;
        this.checkWinner(row, col);
        this.current = this.current === 'R' ? 'Y' : 'R';
        break;
      }
    }
  }

  checkWinner(row: number, col: number) {
    // Simple horizontal check for demo
    const color = this.board[row][col];
    let count = 0;
    for (let c = 0; c < this.board[0].length; c++) {
      count = this.board[row][c] === color ? count + 1 : 0;
      if (count >= 4) this.winner = color;
    }
  }
}
