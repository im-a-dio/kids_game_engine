// Mechanics Editor PoC for Kids Game Engine SPA
// Suitable for children aged 6+

import { MemoryPairs } from './mechanics/MemoryPairs';
import { MemoryTriplets } from './mechanics/MemoryTriplets';
import { MemoryFourInARow } from './mechanics/MemoryFourInARow';
import { SimonSays } from './mechanics/SimonSays';
import { MatchTheTaps } from './mechanics/MatchTheTaps';
import { ColorSequence } from './mechanics/ColorSequence';
import { QuickMath } from './mechanics/QuickMath';
import { PatternBuilder } from './mechanics/PatternBuilder';
import { OddOneOut } from './mechanics/OddOneOut';
import { ShapeSorter } from './mechanics/ShapeSorter';
import { SoundMemory } from './mechanics/SoundMemory';
import { FindThePath } from './mechanics/FindThePath';
import { ReactionTimer } from './mechanics/ReactionTimer';
import { SnakeGame } from './mechanics/SnakeGame';
import { TicTacToe } from './mechanics/TicTacToe';
import { WhackAMole } from './mechanics/WhackAMole';
import { SlidingPuzzle } from './mechanics/SlidingPuzzle';
import { ConnectFour } from './mechanics/ConnectFour';
import { LightsOut } from './mechanics/LightsOut';
import { MazeRunner } from './mechanics/MazeRunner';
import { BubblePop } from './mechanics/BubblePop';
import { TowerBuilder } from './mechanics/TowerBuilder';
import { MemorySequence } from './mechanics/MemorySequence';

const values = ['🍎', '🍌', '🍇', '🍓'];
let currentMechanic = 'pairs';
let game: any;
let board: HTMLDivElement;
let memoryPairsLevel = 1;
let mechanicLevel = 1;

const mechanicList = [
  'pairs', 'triplets', 'fourinarow', 'simonsays', 'matchthetaps', 'colorsequence',
  'quickmath', 'patternbuilder', 'oddoneout', 'shapesorter', 'soundmemory', 'findthepath', 'reactiontimer',
  'snakegame', 'tictactoe', 'whackamole', 'slidingpuzzle', 'connectfour', 'lightsout', 'mazerunner', 'bubblepop', 'towerbuilder', 'memorysequence'
];
let round = 1;
let maxLevel = 50;
let currentMechanicIndex = 0;

function createGame(mechanic: string) {
  if (mechanic === 'pairs') {
    game = new MemoryPairs(values.concat(['🍍','🥝','🍒','🍑','🍉','🍋','🍊','🥥']), mechanicLevel);
  } else if (mechanic === 'triplets') {
    game = new MemoryTriplets(values.concat(['🍍','🥝','🍒','🍑','🍉','🍋','🍊','🥥']), mechanicLevel);
  } else if (mechanic === 'fourinarow') {
    game = new MemoryFourInARow(values.concat(['🍍','🥝','🍒','🍑','🍉','🍋','🍊','🥥']), mechanicLevel);
  } else if (mechanic === 'simonsays') {
    game = new SimonSays(mechanicLevel);
  } else if (mechanic === 'matchthetaps') {
    game = new MatchTheTaps(mechanicLevel);
  } else if (mechanic === 'colorsequence') {
    game = new ColorSequence(mechanicLevel);
  } else if (mechanic === 'quickmath') {
    game = new QuickMath(mechanicLevel);
  } else if (mechanic === 'patternbuilder') {
    game = new PatternBuilder(mechanicLevel);
  } else if (mechanic === 'oddoneout') {
    game = new OddOneOut(mechanicLevel);
  } else if (mechanic === 'shapesorter') {
    game = new ShapeSorter(mechanicLevel);
  } else if (mechanic === 'soundmemory') {
    game = new SoundMemory(mechanicLevel);
  } else if (mechanic === 'findthepath') {
    game = new FindThePath(mechanicLevel);
  } else if (mechanic === 'reactiontimer') {
    game = new ReactionTimer(mechanicLevel);
  } else if (mechanic === 'snakegame') {
    game = new SnakeGame();
  } else if (mechanic === 'tictactoe') {
    game = new TicTacToe();
  } else if (mechanic === 'whackamole') {
    game = new WhackAMole();
  } else if (mechanic === 'slidingpuzzle') {
    game = new SlidingPuzzle();
  } else if (mechanic === 'connectfour') {
    game = new ConnectFour();
  } else if (mechanic === 'lightsout') {
    game = new LightsOut();
  } else if (mechanic === 'mazerunner') {
    game = new MazeRunner();
  } else if (mechanic === 'bubblepop') {
    game = new BubblePop();
  } else if (mechanic === 'towerbuilder') {
    game = new TowerBuilder();
  } else if (mechanic === 'memorysequence') {
    game = new MemorySequence();
  }
}

function createBoard() {
  if (board) board.remove();
  board = document.createElement('div');
  board.style.display = 'block';
  board.style.margin = '40px auto';
  board.style.width = 'fit-content';
  board.style.maxWidth = '90vw';
  board.style.textAlign = 'center';

  // Only show UI for mechanics with cards
  if (['pairs','triplets','fourinarow'].includes(currentMechanic)) {
    game.cards.forEach((card: any) => {
      const cardEl = document.createElement('button');
      cardEl.style.width = '60px';
      cardEl.style.height = '60px';
      cardEl.style.fontSize = '2rem';
      cardEl.style.background = '#eee';
      cardEl.style.borderRadius = '8px';
      cardEl.style.border = '2px solid #ccc';
      cardEl.innerText = '?';
      cardEl.onclick = () => {
        game.flipCard(card.id);
        render();
        if (game.isGameOver()) {
          setTimeout(() => {
            alert('You found all sets! 🎉');
            nextRound();
          }, 100);
        }
      };
      card._el = cardEl;
      board.appendChild(cardEl);
    });
  } else if (currentMechanic === 'simonsays') {
    board.innerHTML = `<div>Sequence: ${game.sequence.join(' - ')}</div>`;
    game.colors.forEach((color: string) => {
      const btn = document.createElement('button');
      btn.innerText = color;
      btn.style.background = color;
      btn.onclick = () => {
        game.addUserInput(color);
        if (game.userInput.length === game.sequence.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          if (game.isCorrect()) nextRound();
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'matchthetaps') {
    board.innerHTML = `<div>Sequence: ${game.sequence.map(n => n+1).join(' - ')}</div>`;
    for (let i = 0; i < 4; i++) {
      const btn = document.createElement('button');
      btn.innerText = `Tap ${i+1}`;
      btn.onclick = () => {
        game.addUserInput(i);
        if (game.userInput.length === game.sequence.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          if (game.isCorrect()) nextRound();
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    }
  } else if (currentMechanic === 'colorsequence') {
    board.innerHTML = `<div>Sequence: ${game.sequence.join(' - ')}</div>`;
    game.colors.forEach((color: string) => {
      const btn = document.createElement('button');
      btn.innerText = color;
      btn.style.background = color;
      btn.onclick = () => {
        game.addUserInput(color);
        if (game.userInput.length === game.sequence.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          if (game.isCorrect()) nextRound();
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'quickmath') {
    board.innerHTML = `<div>${game.problem}</div>`;
    const input = document.createElement('input');
    input.type = 'number';
    board.appendChild(input);
    const btn = document.createElement('button');
    btn.innerText = 'Check';
    btn.onclick = () => {
      alert(game.check(Number(input.value)) ? 'Correct!' : 'Try again!');
      if (game.check(Number(input.value))) nextRound();
      game.reset();
      createBoard();
    };
    board.appendChild(btn);
  } else if (currentMechanic === 'patternbuilder') {
    board.innerHTML = `<div>Pattern: ${game.pattern.join(' - ')}</div>`;
    game.colors.forEach((color: string) => {
      const btn = document.createElement('button');
      btn.innerText = color;
      btn.style.background = color;
      btn.onclick = () => {
        game.addUserColor(color);
        if (game.userPattern.length === game.pattern.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          if (game.isCorrect()) nextRound();
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'oddoneout') {
    board.innerHTML = `<div>Find the odd one out:</div>`;
    game.items.forEach((item: string, i: number) => {
      const btn = document.createElement('button');
      btn.innerText = item;
      btn.onclick = () => {
        alert(game.check(i) ? 'Correct!' : 'Try again!');
        if (game.check(i)) nextRound();
        game.reset();
        createBoard();
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'shapesorter') {
    board.innerHTML = `<div>Sort the shapes:</div>`;
    game.shapes.forEach((shape: string, i: number) => {
      const select = document.createElement('select');
      game.categories.forEach((cat: string) => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.innerText = cat;
        select.appendChild(opt);
      });
      const btn = document.createElement('button');
      btn.innerText = shape;
      btn.onclick = () => {
        alert(game.check(i, select.value) ? 'Correct!' : 'Try again!');
        if (game.check(i, select.value)) nextRound();
      };
      board.appendChild(btn);
      board.appendChild(select);
    });
  } else if (currentMechanic === 'soundmemory') {
    board.innerHTML = `<div>Sequence: ${game.sequence.join(' - ')}</div>`;
    game.sounds.forEach((sound: string) => {
      const btn = document.createElement('button');
      btn.innerText = sound;
      btn.onclick = () => {
        game.addUserInput(sound);
        if (game.userInput.length === game.sequence.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          if (game.isCorrect()) nextRound();
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'findthepath') {
    board.innerHTML = `<div>Find the path (demo):</div>`;
    game.path.forEach(([x, y]: [number, number], i: number) => {
      const btn = document.createElement('button');
      btn.innerText = `Step ${i+1}`;
      btn.onclick = () => {
        game.addUserStep(x, y);
        if (game.userPath.length === game.path.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          if (game.isCorrect()) nextRound();
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'reactiontimer') {
    board.innerHTML = `<div>Tap as fast as you can!</div>`;
    const btn = document.createElement('button');
    btn.innerText = 'Start';
    btn.onclick = () => {
      game.start();
      btn.innerText = 'Tap!';
      btn.onclick = () => {
        const reaction = game.stop();
        alert(`Your reaction time: ${reaction} ms`);
        nextRound();
        game.reset();
        createBoard();
      };
    };
    board.appendChild(btn);
  } else if (currentMechanic === 'snakegame') {
    board.innerHTML = `<div>Snake Game (use arrow keys)</div>`;
    // Simple grid display
    for (let y = 0; y < game.gridSize; y++) {
      for (let x = 0; x < game.gridSize; x++) {
        const cell = document.createElement('span');
        cell.style.display = 'inline-block';
        cell.style.width = '20px';
        cell.style.height = '20px';
        cell.style.border = '1px solid #ccc';
        cell.style.background = game.snake.some(([sx, sy]) => sx === x && sy === y) ? '#0f0' : (game.food[0] === x && game.food[1] === y ? '#f00' : '#fff');
        board.appendChild(cell);
      }
      board.appendChild(document.createElement('br'));
    }
    window.onkeydown = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        game.move(e.key.replace('Arrow','').toLowerCase());
        createBoard();
        if (game.gameOver) alert('Game Over!');
      }
    };
  } else if (currentMechanic === 'tictactoe') {
    board.innerHTML = `<div>Tic-Tac-Toe</div>`;
    for (let i = 0; i < 9; i++) {
      const btn = document.createElement('button');
      btn.innerText = game.board[i] || '';
      btn.style.width = '40px';
      btn.style.height = '40px';
      btn.onclick = () => {
        game.play(i);
        createBoard();
        if (game.winner) alert(`Winner: ${game.winner}`);
      };
      board.appendChild(btn);
      if ((i+1)%3 === 0) board.appendChild(document.createElement('br'));
    }
  } else if (currentMechanic === 'whackamole') {
    board.innerHTML = `<div>Whack-a-Mole</div>`;
    game.showMole();
    for (let i = 0; i < 9; i++) {
      const btn = document.createElement('button');
      btn.innerText = game.holes[i] ? '🐹' : '';
      btn.style.width = '40px';
      btn.style.height = '40px';
      btn.onclick = () => {
        game.whack(i);
        createBoard();
      };
      board.appendChild(btn);
      if ((i+1)%3 === 0) board.appendChild(document.createElement('br'));
    }
    board.appendChild(document.createElement('br'));
    board.appendChild(document.createTextNode(`Score: ${game.score}`));
  } else if (currentMechanic === 'slidingpuzzle') {
    board.innerHTML = `<div>Sliding Puzzle</div>`;
    for (let i = 0; i < game.tiles.length; i++) {
      const btn = document.createElement('button');
      btn.innerText = game.tiles[i] === 0 ? '' : String(game.tiles[i]);
      btn.style.width = '40px';
      btn.style.height = '40px';
      btn.onclick = () => {
        game.move(i);
        createBoard();
      };
      board.appendChild(btn);
      if ((i+1)%game.size === 0) board.appendChild(document.createElement('br'));
    }
  } else if (currentMechanic === 'connectfour') {
    board.innerHTML = `<div>Connect Four</div>`;
    for (let row = 0; row < game.board.length; row++) {
      for (let col = 0; col < game.board[0].length; col++) {
        const btn = document.createElement('button');
        btn.innerText = game.board[row][col] || '';
        btn.style.width = '30px';
        btn.style.height = '30px';
        btn.onclick = () => {
          game.play(col);
          createBoard();
          if (game.winner) alert(`Winner: ${game.winner}`);
        };
        board.appendChild(btn);
      }
      board.appendChild(document.createElement('br'));
    }
  } else if (currentMechanic === 'lightsout') {
    board.innerHTML = `<div>Lights Out</div>`;
    for (let i = 0; i < game.lights.length; i++) {
      const btn = document.createElement('button');
      btn.innerText = game.lights[i] ? '💡' : ' ';
      btn.style.width = '40px';
      btn.style.height = '40px';
      btn.onclick = () => {
        game.toggle(i);
        createBoard();
        if (game.isSolved()) alert('Solved!');
      };
      board.appendChild(btn);
    }
  } else if (currentMechanic === 'mazerunner') {
    board.innerHTML = `<div>Maze Runner</div>`;
    for (let y = 0; y < game.maze.length; y++) {
      for (let x = 0; x < game.maze[0].length; x++) {
        const cell = document.createElement('span');
        cell.style.display = 'inline-block';
        cell.style.width = '20px';
        cell.style.height = '20px';
        cell.style.border = '1px solid #ccc';
        cell.style.background = (game.position[0] === x && game.position[1] === y) ? '#0f0' : (game.goal[0] === x && game.goal[1] === y ? '#f00' : '#fff');
        board.appendChild(cell);
      }
      board.appendChild(document.createElement('br'));
    }
    ['up','down','left','right'].forEach(dir => {
      const btn = document.createElement('button');
      btn.innerText = dir;
      btn.onclick = () => {
        game.move(dir);
        createBoard();
        if (game.isAtGoal()) alert('You reached the goal!');
      };
      board.appendChild(btn);
    });
  } else if (currentMechanic === 'bubblepop') {
    board.innerHTML = `<div>Bubble Pop</div>`;
    for (let i = 0; i < game.bubbles.length; i++) {
      const btn = document.createElement('button');
      btn.innerText = game.bubbles[i] ? '🫧' : '';
      btn.style.width = '40px';
      btn.style.height = '40px';
      btn.onclick = () => {
        game.pop(i);
        createBoard();
        if (game.isAllPopped()) alert('All bubbles popped!');
      };
      board.appendChild(btn);
    }
    board.appendChild(document.createElement('br'));
    board.appendChild(document.createTextNode(`Score: ${game.score}`));
  } else if (currentMechanic === 'towerbuilder') {
    board.innerHTML = `<div>Tower Builder</div>`;
    const btn = document.createElement('button');
    btn.innerText = 'Add Block';
    btn.onclick = () => {
      game.addBlock();
      createBoard();
      if (game.isComplete()) alert('Tower complete!');
    };
    board.appendChild(btn);
    board.appendChild(document.createElement('br'));
    board.appendChild(document.createTextNode(`Height: ${game.height}`));
  } else if (currentMechanic === 'memorysequence') {
    board.innerHTML = `<div>Memory Sequence: ${game.sequence.join(' - ')}</div>`;
    for (let i = 0; i < 10; i++) {
      const btn = document.createElement('button');
      btn.innerText = String(i);
      btn.onclick = () => {
        game.addUserInput(i);
        if (game.userInput.length === game.sequence.length) {
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
          game.reset();
          createBoard();
        }
      };
      board.appendChild(btn);
    }
  }
  document.body.appendChild(board);
}

function render() {
  if (['pairs','triplets','fourinarow'].includes(currentMechanic)) {
    game.cards.forEach((card: any) => {
      if (card.isMatched) {
        card._el.innerText = card.value;
        card._el.style.background = '#b2f7b2';
        card._el.disabled = true;
      } else if (card.isFlipped) {
        card._el.innerText = card.value;
        card._el.style.background = '#fff';
      } else {
        card._el.innerText = '?';
        card._el.style.background = '#eee';
        card._el.disabled = false;
      }
    });
  }
}

// Mechanics editor UI
const editor = document.createElement('div');
editor.style.position = 'fixed';
editor.style.top = '10px';
editor.style.left = '10px';
editor.style.background = 'rgba(255,255,255,0.9)';
editor.style.padding = '10px';
editor.style.borderRadius = '8px';
editor.style.zIndex = '100';
editor.innerHTML = `
  <label for="mechanic">Choose a mechanic:</label>
  <select id="mechanic">
    <option value="pairs">Memory Pairs</option>
    <option value="triplets">Memory Triplets</option>
    <option value="fourinarow">Memory 4 in a Row</option>
    <option value="simonsays">Simon Says</option>
    <option value="matchthetaps">Match the Taps</option>
    <option value="colorsequence">Color Sequence</option>
    <option value="quickmath">Quick Math</option>
    <option value="patternbuilder">Pattern Builder</option>
    <option value="oddoneout">Odd One Out</option>
    <option value="shapesorter">Shape Sorter</option>
    <option value="soundmemory">Sound Memory</option>
    <option value="findthepath">Find the Path</option>
    <option value="reactiontimer">Reaction Timer</option>
    <option value="snakegame">Snake Game</option>
    <option value="tictactoe">Tic-Tac-Toe</option>
    <option value="whackamole">Whack-a-Mole</option>
    <option value="slidingpuzzle">Sliding Puzzle</option>
    <option value="connectfour">Connect Four</option>
    <option value="lightsout">Lights Out</option>
    <option value="mazerunner">Maze Runner</option>
    <option value="bubblepop">Bubble Pop</option>
    <option value="towerbuilder">Tower Builder</option>
    <option value="memorysequence">Memory Sequence</option>
  </select>
  <label for="level">Level:</label>
  <select id="level">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
  <button id="reset">Reset</button>
`;
document.body.appendChild(editor);

const mechanicSelect = document.getElementById('mechanic') as HTMLSelectElement;
const levelSelect = document.getElementById('level') as HTMLSelectElement;

mechanicSelect.onchange = (e: any) => {
  currentMechanic = e.target.value;
  createGame(currentMechanic);
  createBoard();
  render();
};
levelSelect.onchange = (e: any) => {
  mechanicLevel = Number(e.target.value);
  createGame(currentMechanic);
  createBoard();
  render();
};
document.getElementById('reset')!.onclick = () => {
  createGame(currentMechanic);
  createBoard();
  render();
};

function nextRound() {
  // Move to next mechanic and next level
  currentMechanicIndex = (currentMechanicIndex + 1) % mechanicList.length;
  currentMechanic = mechanicList[currentMechanicIndex];
  mechanicLevel = Math.min(round + 1, maxLevel);
  // Update UI selectors
  mechanicSelect.value = currentMechanic;
  levelSelect.value = String(mechanicLevel);
  createGame(currentMechanic);
  createBoard();
  render();
  round++;
}
