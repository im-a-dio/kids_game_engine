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
import { soundManager } from './soundManager';
import * as THREE from 'three';

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

// --- Three.js objects for SnakeGame ---
let snakeRenderer: THREE.WebGLRenderer | null = null;
let snakeScene: THREE.Scene | null = null;
let snakeCamera: THREE.OrthographicCamera | null = null;
let snakeObjects: THREE.Object3D[] = [];

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
    game = new TowerBuilder(mechanicLevel);
  } else if (mechanic === 'memorysequence') {
    game = new MemorySequence();
  }
}

const appRoot = document.getElementById('app');

// Mechanics editor UI
const editor = document.createElement('div');
editor.className = 'editor-ui';

const mechanicSelect = document.createElement('select');
mechanicList.forEach(mechanic => {
  const option = document.createElement('option');
  option.value = mechanic;
  option.innerText = mechanic.charAt(0).toUpperCase() + mechanic.slice(1);
  mechanicSelect.appendChild(option);
});
mechanicSelect.value = currentMechanic;
editor.appendChild(mechanicSelect);

const levelInput = document.createElement('input');
levelInput.type = 'number';
levelInput.value = String(mechanicLevel);
levelInput.min = '1';
levelInput.max = '50';
editor.appendChild(levelInput);

const startBtn = document.createElement('button');
startBtn.innerText = 'Start';
editor.appendChild(startBtn);

startBtn.onclick = () => {
  currentMechanic = mechanicSelect.value;
  mechanicLevel = Number(levelInput.value);
  createGame(currentMechanic);
  createBoard();
};

if (appRoot) appRoot.appendChild(editor);

function createBoard() {
  if (board) board.remove();
  board = document.createElement('div');
  board.id = 'game-board';
  board.className = 'game-board';
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
        soundManager.play('click');
        game.flipCard(card.id);
        render();
        if (game.isGameOver()) {
          soundManager.play('win');
          setTimeout(() => alert('You found all sets! 🎉'), 100);
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
        soundManager.play('click');
        game.addUserInput(color);
        if (game.userInput.length === game.sequence.length) {
          soundManager.play(game.isCorrect() ? 'correct' : 'wrong');
          alert(game.isCorrect() ? 'Correct!' : 'Try again!');
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
        soundManager.play('click');
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
        soundManager.play('click');
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
    // Remove previous canvas if any
    const oldCanvas = board.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();
    // Three.js setup
    const width = 400, height = 400;
    if (!snakeRenderer) {
      snakeRenderer = new THREE.WebGLRenderer({ antialias: true });
      snakeRenderer.setSize(width, height);
    }
    if (!snakeScene) snakeScene = new THREE.Scene();
    if (!snakeCamera) snakeCamera = new THREE.OrthographicCamera(0, width, height, 0, 0, 10);
    board.appendChild(snakeRenderer.domElement);
    // Remove previous objects
    snakeObjects.forEach(obj => snakeScene!.remove(obj));
    snakeObjects = [];
    // Draw grid (background)
    for (let y = 0; y < game.gridSize; y++) {
      for (let x = 0; x < game.gridSize; x++) {
        const cell = new THREE.Mesh(
          new THREE.PlaneGeometry(width/game.gridSize-2, height/game.gridSize-2),
          new THREE.MeshBasicMaterial({ color: 0xf5f5f5 })
        );
        cell.position.x = x * (width/game.gridSize) + (width/game.gridSize)/2;
        cell.position.y = y * (height/game.gridSize) + (height/game.gridSize)/2;
        cell.position.z = 0;
        snakeScene.add(cell);
        snakeObjects.push(cell);
      }
    }
    // Draw snake (green blocks)
    game.snake.forEach(([sx, sy]: [number, number]) => {
      const snakePart = new THREE.Mesh(
        new THREE.PlaneGeometry(width/game.gridSize-6, height/game.gridSize-6),
        new THREE.MeshBasicMaterial({ color: 0x43a047 })
      );
      snakePart.position.x = sx * (width/game.gridSize) + (width/game.gridSize)/2;
      snakePart.position.y = sy * (height/game.gridSize) + (height/game.gridSize)/2;
      snakePart.position.z = 1;
      snakeScene.add(snakePart);
      snakeObjects.push(snakePart);
    });
    // Draw food (red circle)
    const food = new THREE.Mesh(
      new THREE.CircleGeometry(width/game.gridSize/4, 32),
      new THREE.MeshBasicMaterial({ color: 0xff5252 })
    );
    food.position.x = game.food[0] * (width/game.gridSize) + (width/game.gridSize)/2;
    food.position.y = game.food[1] * (height/game.gridSize) + (height/game.gridSize)/2;
    food.position.z = 2;
    snakeScene.add(food);
    snakeObjects.push(food);
    // Render scene
    snakeRenderer.render(snakeScene, snakeCamera);
    // Keyboard input
    window.onkeydown = (e) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
        game.move(e.key.replace("Arrow","").toLowerCase());
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
    // Three.js rendering
    const width = 400, height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, 0, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    board.appendChild(renderer.domElement);
    // Draw maze grid
    for (let y = 0; y < game.maze.length; y++) {
      for (let x = 0; x < game.maze[0].length; x++) {
        const cell = new THREE.Mesh(
          new THREE.PlaneGeometry(width/game.maze.length-2, height/game.maze.length-2),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        cell.position.x = x * (width/game.maze.length) + (width/game.maze.length)/2;
        cell.position.y = y * (height/game.maze.length) + (height/game.maze.length)/2;
        cell.position.z = 0;
        scene.add(cell);
      }
    }
    // Draw player
    const player = new THREE.Mesh(
      new THREE.CircleGeometry(width/game.maze.length/3, 32),
      new THREE.MeshBasicMaterial({ color: 0x1976d2 })
    );
    player.position.x = game.position[0] * (width/game.maze.length) + (width/game.maze.length)/2;
    player.position.y = game.position[1] * (height/game.maze.length) + (height/game.maze.length)/2;
    player.position.z = 1;
    scene.add(player);
    // Draw goal
    const goal = new THREE.Mesh(
      new THREE.CircleGeometry(width/game.maze.length/3, 32),
      new THREE.MeshBasicMaterial({ color: 0xffb300 })
    );
    goal.position.x = game.goal[0] * (width/game.maze.length) + (width/game.maze.length)/2;
    goal.position.y = game.goal[1] * (height/game.maze.length) + (height/game.maze.length)/2;
    goal.position.z = 2;
    scene.add(goal);
    renderer.render(scene, camera);
    window.onkeydown = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        game.move(e.key.replace('Arrow','').toLowerCase());
        createBoard();
        if (game.isAtGoal()) alert('You reached the goal!');
      }
    };
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
    board.innerHTML = '';
    if (typeof game.render === 'function') {
      game.render(board);
    }
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
  if (appRoot) appRoot.appendChild(board);
}

function render() {
  if (board) {
    // Update board UI based on the current game state
    if (['pairs','triplets','fourinarow'].includes(currentMechanic)) {
      game.cards.forEach((card: any) => {
        const cardEl = card._el;
        if (cardEl) {
          cardEl.innerText = card.isFlipped ? card.value : '?';
          cardEl.style.background = card.isFlipped ? '#fff' : '#eee';
          cardEl.style.borderColor = card.isMatched ? '#0f0' : '#ccc';
        }
      });
    } else if (currentMechanic === 'simonsays') {
      board.innerHTML = `<div>Sequence: ${game.sequence.join(' - ')}</div>`;
      game.colors.forEach((color: string) => {
        const btn = document.createElement('button');
        btn.innerText = color;
        btn.style.background = color;
        btn.onclick = () => {
          soundManager.play('click');
          game.addUserInput(color);
          if (game.userInput.length === game.sequence.length) {
            soundManager.play(game.isCorrect() ? 'correct' : 'wrong');
            alert(game.isCorrect() ? 'Correct!' : 'Try again!');
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
          soundManager.play('click');
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
          soundManager.play('click');
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
      // Remove previous canvas if any
      const oldCanvas = board.querySelector('canvas');
      if (oldCanvas) oldCanvas.remove();
      // Three.js setup
      const width = 400, height = 400;
      if (!snakeRenderer) {
        snakeRenderer = new THREE.WebGLRenderer({ antialias: true });
        snakeRenderer.setSize(width, height);
      }
      if (!snakeScene) snakeScene = new THREE.Scene();
      if (!snakeCamera) snakeCamera = new THREE.OrthographicCamera(0, width, height, 0, 0, 10);
      board.appendChild(snakeRenderer.domElement);
      // Remove previous objects
      snakeObjects.forEach(obj => snakeScene!.remove(obj));
      snakeObjects = [];
      // Draw grid (background)
      for (let y = 0; y < game.gridSize; y++) {
        for (let x = 0; x < game.gridSize; x++) {
          const cell = new THREE.Mesh(
            new THREE.PlaneGeometry(width/game.gridSize-2, height/game.gridSize-2),
            new THREE.MeshBasicMaterial({ color: 0xf5f5f5 })
          );
          cell.position.x = x * (width/game.gridSize) + (width/game.gridSize)/2;
          cell.position.y = y * (height/game.gridSize) + (height/game.gridSize)/2;
          cell.position.z = 0;
          snakeScene.add(cell);
          snakeObjects.push(cell);
        }
      }
      // Draw snake (green blocks)
      game.snake.forEach(([sx, sy]: [number, number]) => {
        const snakePart = new THREE.Mesh(
          new THREE.PlaneGeometry(width/game.gridSize-6, height/game.gridSize-6),
          new THREE.MeshBasicMaterial({ color: 0x43a047 })
        );
        snakePart.position.x = sx * (width/game.gridSize) + (width/game.gridSize)/2;
        snakePart.position.y = sy * (height/game.gridSize) + (height/game.gridSize)/2;
        snakePart.position.z = 1;
        snakeScene.add(snakePart);
        snakeObjects.push(snakePart);
      });
      // Draw food (red circle)
      const food = new THREE.Mesh(
        new THREE.CircleGeometry(width/game.gridSize/4, 32),
        new THREE.MeshBasicMaterial({ color: 0xff5252 })
      );
      food.position.x = game.food[0] * (width/game.gridSize) + (width/game.gridSize)/2;
      food.position.y = game.food[1] * (height/game.gridSize) + (height/game.gridSize)/2;
      food.position.z = 2;
      snakeScene.add(food);
      snakeObjects.push(food);
      // Render scene
      snakeRenderer.render(snakeScene, snakeCamera);
      // Keyboard input
      window.onkeydown = (e) => {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
          game.move(e.key.replace("Arrow","").toLowerCase());
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
      // Three.js rendering
      const width = 400, height = 400;
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(0, width, height, 0, 0, 10);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      board.appendChild(renderer.domElement);
      // Draw maze grid
      for (let y = 0; y < game.maze.length; y++) {
        for (let x = 0; x < game.maze[0].length; x++) {
          const cell = new THREE.Mesh(
            new THREE.PlaneGeometry(width/game.maze.length-2, height/game.maze.length-2),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
          );
          cell.position.x = x * (width/game.maze.length) + (width/game.maze.length)/2;
          cell.position.y = y * (height/game.maze.length) + (height/game.maze.length)/2;
          cell.position.z = 0;
          scene.add(cell);
        }
      }
      // Draw player
      const player = new THREE.Mesh(
        new THREE.CircleGeometry(width/game.maze.length/3, 32),
        new THREE.MeshBasicMaterial({ color: 0x1976d2 })
      );
      player.position.x = game.position[0] * (width/game.maze.length) + (width/game.maze.length)/2;
      player.position.y = game.position[1] * (height/game.maze.length) + (height/game.maze.length)/2;
      player.position.z = 1;
      scene.add(player);
      // Draw goal
      const goal = new THREE.Mesh(
        new THREE.CircleGeometry(width/game.maze.length/3, 32),
        new THREE.MeshBasicMaterial({ color: 0xffb300 })
      );
      goal.position.x = game.goal[0] * (width/game.maze.length) + (width/game.maze.length)/2;
      goal.position.y = game.goal[1] * (height/game.maze.length) + (height/game.maze.length)/2;
      goal.position.z = 2;
      scene.add(goal);
      renderer.render(scene, camera);
      window.onkeydown = (e) => {
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
          game.move(e.key.replace('Arrow','').toLowerCase());
          createBoard();
          if (game.isAtGoal()) alert('You reached the goal!');
        }
      };
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
      board.innerHTML = '';
      if (typeof game.render === 'function') {
        game.render(board);
      }
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
  }
}

function nextRound() {
  // Advance to the next round or mechanic
  // Add your round logic here
  createBoard();
}
