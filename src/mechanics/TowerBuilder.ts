// TowerBuilder.ts
// Simple Tower Builder mechanic for Kids Game Engine

import { soundManager } from '../soundManager';

// TowerBuilder mechanic: drag and stack colorful, animated blocks to build a tower
export class TowerBuilder {
  blocks: { emoji: string }[];
  shuffledBlocks: { emoji: string }[];
  tower: { emoji: string }[];
  targetHeight: number;
  level: number;
  scrollIndex: number;
  visibleCount: number;
  constructor(level: number = 1) {
    this.level = level;
    // Large emoji list for mashups
    const emojiList = [
      '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬','😈','👿','💀','☠️','🤡','👹','👺','👻','👽','👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐽','🐸','🐵','🙈','🙉','🙊','🐒','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🕷️','🦂','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐕‍🦺','🐈','🐈‍⬛','🪶','🐓','🦃','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿️','🦔'
    ];
    // Create a single ordered array of emoji mashup blocks for the level
    this.blocks = [];
    for (let i = 0; i < level + 4; i++) {
      const e1 = emojiList[i % emojiList.length];
      const e2 = emojiList[(i * 7) % emojiList.length];
      this.blocks.push({ emoji: `${e1}${e2}` });
    }
    // Use the same block objects for the draggable area, just shuffled
    this.shuffledBlocks = [...this.blocks];
    for (let i = this.shuffledBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledBlocks[i], this.shuffledBlocks[j]] = [this.shuffledBlocks[j], this.shuffledBlocks[i]];
    }
    this.tower = [];
    this.targetHeight = level + 4;
    this.scrollIndex = 0;
    this.visibleCount = 10;
  }
  // Render UI for TowerBuilder
  render(container: HTMLElement) {
    // Responsive flex layout
    container.innerHTML = `
      <div style='display:flex;flex-direction:row;justify-content:center;align-items:flex-start;gap:32px;max-width:100vw;'>
        <div id='tower-preview' style='display:flex;flex-direction:column;align-items:center;max-height:400px;overflow-y:auto;'>
          ${this.blocks.slice(0, this.targetHeight).map(block => `<div style='width:28px;height:28px;margin:2px auto;font-size:24px;'>${block.emoji}</div>`).join('')}
          <div style='font-size:12px;color:#888;'>Preview: Build this tower!</div>
        </div>
        <div id='tower-zone' style='display:flex;flex-direction:column;align-items:center;max-height:400px;overflow-y:auto;min-width:60px;'>
        </div>
        <div id='draggable-blocks' style='display:flex;flex-direction:row;gap:8px;overflow-x:auto;max-width:400px;padding-bottom:8px;'>
        </div>
      </div>
      <div style='font-size:20px;margin:16px 0;'>Drag blocks to build your tower in order!</div>
      <div style='margin-bottom:8px;'>Tower Height: <b>${this.tower.length}</b> / Target: <b>${this.targetHeight}</b></div>
    `;
    // Virtual scroll for draggable blocks
    const blocksDiv = container.querySelector('#draggable-blocks') as HTMLDivElement;
    blocksDiv.innerHTML = '';
    // Add scroll buttons if needed
    if (this.shuffledBlocks.length > this.visibleCount) {
      const leftBtn = document.createElement('button');
      leftBtn.innerText = '◀';
      leftBtn.onclick = () => {
        this.scrollIndex = Math.max(0, this.scrollIndex - this.visibleCount);
        this.render(container);
      };
      blocksDiv.appendChild(leftBtn);
    }
    // Render only visible blocks
    const visibleBlocks = this.shuffledBlocks.slice(this.scrollIndex, this.scrollIndex + this.visibleCount);
    visibleBlocks.forEach((block) => {
      if (this.tower.includes(block)) return;
      const isNext = this.blocks[this.tower.length].emoji === block.emoji;
      const blockEl = document.createElement('div');
      blockEl.style.width = '40px';
      blockEl.style.height = '40px';
      blockEl.style.margin = '2px';
      blockEl.style.fontSize = '32px';
      blockEl.style.display = 'flex';
      blockEl.style.alignItems = 'center';
      blockEl.style.justifyContent = 'center';
      blockEl.innerText = block.emoji;
      blockEl.draggable = isNext;
      blockEl.style.cursor = isNext ? 'grab' : 'not-allowed';
      blockEl.style.opacity = isNext ? '1' : '0.5';
      if (isNext) {
        blockEl.ondblclick = () => {
          this.tower.push(block);
          soundManager.play('click');
          this.render(container);
          const towerDiv = container.querySelector('#tower-zone') as HTMLDivElement;
          if (this.tower.length >= this.targetHeight) {
            soundManager.play('win');
            towerDiv.innerHTML += `<div style='font-size:24px;color:#43a047;margin-top:8px;'>🎉 Well done! Tower complete!</div>`;
            towerDiv.style.animation = 'shake 0.5s';
            setTimeout(() => towerDiv.style.animation = '', 500);
          }
        };
      }
      blocksDiv.appendChild(blockEl);
    });
    // Add right scroll button if needed
    if (this.shuffledBlocks.length > this.visibleCount && this.scrollIndex + this.visibleCount < this.shuffledBlocks.length) {
      const rightBtn = document.createElement('button');
      rightBtn.innerText = '▶';
      rightBtn.onclick = () => {
        this.scrollIndex = Math.min(this.shuffledBlocks.length - this.visibleCount, this.scrollIndex + this.visibleCount);
        this.render(container);
      };
      blocksDiv.appendChild(rightBtn);
    }
    // Build zone (your tower)
    const towerDiv = container.querySelector('#tower-zone') as HTMLDivElement;
    towerDiv.innerHTML = '';
    this.tower.forEach((block) => {
      const placed = document.createElement('div');
      placed.style.width = '40px';
      placed.style.height = '40px';
      placed.style.margin = '2px auto';
      placed.style.fontSize = '32px';
      placed.style.display = 'flex';
      placed.style.alignItems = 'center';
      placed.style.justifyContent = 'center';
      placed.innerText = block.emoji;
      placed.style.transition = 'transform 0.3s';
      placed.style.transform = 'scale(1)';
      towerDiv.appendChild(placed);
      setTimeout(() => {
        placed.style.transform = 'scale(1.2)';
        setTimeout(() => placed.style.transform = 'scale(1)', 200);
      }, 50);
    });
    // Dedicated drop target for next block
    if (this.tower.length < this.targetHeight) {
      const dropTarget = document.createElement('div');
      dropTarget.style.width = '60px';
      dropTarget.style.height = '60px';
      dropTarget.style.margin = '8px auto';
      dropTarget.style.border = '4px solid #1976d2';
      dropTarget.style.background = '#e3f2fd';
      dropTarget.style.borderRadius = '16px';
      dropTarget.style.display = 'flex';
      dropTarget.style.alignItems = 'center';
      dropTarget.style.justifyContent = 'center';
      dropTarget.style.fontSize = '32px';
      dropTarget.style.fontWeight = 'bold';
      dropTarget.innerText = this.blocks[this.tower.length].emoji;
      // Accept drop only for the correct next block
      dropTarget.ondragover = (e) => e.preventDefault();
      dropTarget.ondrop = (e) => {
        const idx = Number(e.dataTransfer?.getData('block-idx'));
        const nextBlock = this.blocks[this.tower.length];
        const droppedBlock = this.shuffledBlocks[idx];
        const isCorrect = droppedBlock && nextBlock && droppedBlock.emoji === nextBlock.emoji && !this.tower.includes(droppedBlock);
        if (isCorrect) {
          this.tower.push(droppedBlock);
          soundManager.play('click');
          this.render(container);
          if (this.tower.length >= this.targetHeight) {
            soundManager.play('win');
            towerDiv.innerHTML += `<div style='font-size:24px;color:#43a047;margin-top:8px;'>🎉 Well done! Tower complete!</div>`;
            towerDiv.style.animation = 'shake 0.5s';
            setTimeout(() => towerDiv.style.animation = '', 500);
          }
        } else {
          soundManager.play('wrong');
          dropTarget.style.animation = 'shake 0.5s';
          setTimeout(() => dropTarget.style.animation = '', 500);
        }
      };
      towerDiv.appendChild(dropTarget);
    }
    // Remove drop logic from towerDiv itself
    towerDiv.ondragover = null;
    towerDiv.ondrop = null;
    // Add shake animation CSS
    if (!document.getElementById('tower-shake-style')) {
      const style = document.createElement('style');
      style.id = 'tower-shake-style';
      style.innerHTML = `@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } 100% { transform: translateX(0); } }`;
      document.head.appendChild(style);
    }
  }
  // Helper to create block HTML for preview
  blockHTML(block: { emoji: string }, scale: number = 1) {
    return `<div style='width:28px;height:28px;margin:2px auto;font-size:24px;'>${block.emoji}</div>`;
  }
  // Helper to create block element for drag/drop and stacking
  blockElement(block: { emoji: string }, draggable: boolean) {
    const el = document.createElement('div');
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.margin = '2px auto';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontSize = '32px';
    el.innerText = block.emoji;
    if (draggable) {
      el.draggable = true;
      el.style.cursor = 'grab';
      el.ondragstart = (e) => {
        e.dataTransfer?.setData('block-idx', String(this.blocks.indexOf(block)));
      };
      el.style.opacity = '1';
    } else {
      el.draggable = false;
      el.style.cursor = 'not-allowed';
      el.style.opacity = '0.5';
    }
    return el;
  }
}
