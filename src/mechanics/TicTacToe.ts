// TicTacToe.ts
// Simple Tic-Tac-Toe mechanic for Kids Game Engine

export class TicTacToe {
  board: string[] = Array(9).fill('');
  current: string = 'X';
  winner: string = '';

  play(index: number) {
    if (this.board[index] || this.winner) return;
    this.board[index] = this.current;
    this.current = this.current === 'X' ? 'O' : 'X';
    this.checkWinner();
  }

  checkWinner() {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of wins) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
      }
    }
  }
}
