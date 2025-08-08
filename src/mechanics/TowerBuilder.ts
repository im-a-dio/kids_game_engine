// TowerBuilder.ts
// Simple Tower Builder mechanic for Kids Game Engine

import { soundManager } from '../soundManager';

// TowerBuilder mechanic: drag and stack colorful, animated blocks to build a tower
export class TowerBuilder {
  blocks: { color: string; shape: string }[];
  tower: { color: string; shape: string }[];
  targetHeight: number;
  level: number;
  shuffledBlocks: { color: string; shape: string }[];
  constructor(level: number = 1) {
    this.level = level;
    const colors = ['#ffb300','#29b6f6','#66bb6a','#ab47bc','#ef5350','#ffa726','#8d6e63','#ec407a','#26a69a','#d4e157'];
    const shapes = ['square','circle','triangle'];
    // Add a floor block at the start (green square)
    const floor = { color: '#43a047', shape: 'square' };
    // Create blocks for this level
    const blocks = [];
    for (let i = 0; i < level + 3; i++) {
      blocks.push({
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length]
      });
    }
    // The required stacking order is: floor, then blocks (unshuffled)
    this.blocks = [floor, ...blocks];
    // Shuffle blocks for draggable area, including the same floor object
    this.shuffledBlocks = [floor, ...blocks];
    for (let i = this.shuffledBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledBlocks[i], this.shuffledBlocks[j]] = [this.shuffledBlocks[j], this.shuffledBlocks[i]];
    }
    this.tower = [];
    this.targetHeight = level + 4; // Level controls tower height (floor + blocks)
  }
  // Render UI for TowerBuilder
  render(container: HTMLElement) {
    // Responsive flex layout
    container.innerHTML = `
      <div style='display:flex;flex-direction:row;justify-content:center;align-items:flex-start;gap:32px;max-width:100vw;'>
        <div id='tower-preview' style='display:flex;flex-direction:column;align-items:center;max-height:400px;overflow-y:auto;'>
          ${this.blocks.slice(0, this.targetHeight).map(block => this.blockHTML(block, 0.7)).join('')}
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
    // Draggable blocks
    const blocksDiv = container.querySelector('#draggable-blocks') as HTMLDivElement;
    this.shuffledBlocks.forEach((block, i) => {
      if (this.tower.includes(block)) return;
      const isNext = this.blocks[this.tower.length] === block;
      const blockEl = this.blockElement(block, isNext);
      // Double-click to add the correct next block
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
    // Build zone (your tower)
    const towerDiv = container.querySelector('#tower-zone') as HTMLDivElement;
    towerDiv.innerHTML = '';
    this.tower.forEach((block) => {
      const placed = this.blockElement(block, false);
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
      dropTarget.style.fontSize = '18px';
      dropTarget.style.fontWeight = 'bold';
      dropTarget.innerText = 'Drop here';
      // Accept drop only for the correct next block
      dropTarget.ondragover = (e) => e.preventDefault();
      dropTarget.ondrop = (e) => {
        const idx = Number(e.dataTransfer?.getData('block-idx'));
        if (!isNaN(idx) && this.shuffledBlocks[idx] && !this.tower.includes(this.shuffledBlocks[idx]) && this.blocks[this.tower.length] === this.shuffledBlocks[idx]) {
          this.tower.push(this.shuffledBlocks[idx]);
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
  blockHTML(block: { color: string; shape: string }, scale: number = 1) {
    if (block.shape === 'triangle') {
      return `<div style='width:0;height:0;border-left:${20*scale}px solid transparent;border-right:${20*scale}px solid transparent;border-bottom:${40*scale}px solid ${block.color};margin:2px auto;'></div>`;
    } else if (block.shape === 'circle') {
      return `<div style='width:${40*scale}px;height:${40*scale}px;background:${block.color};border-radius:50%;margin:2px auto;display:flex;align-items:center;justify-content:center;'>⚪</div>`;
    } else {
      return `<div style='width:${40*scale}px;height:${40*scale}px;background:${block.color};border-radius:8px;margin:2px auto;display:flex;align-items:center;justify-content:center;'>⬛</div>`;
    }
  }
  // Helper to create block element for drag/drop and stacking
  blockElement(block: { color: string; shape: string }, draggable: boolean) {
    const el = document.createElement('div');
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.margin = '2px auto';
    el.style.background = block.shape === 'triangle' ? 'transparent' : block.color;
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.borderRadius = block.shape === 'circle' ? '50%' : block.shape === 'triangle' ? '0' : '8px';
    if (block.shape === 'triangle') {
      el.style.borderLeft = '20px solid transparent';
      el.style.borderRight = '20px solid transparent';
      el.style.borderBottom = `40px solid ${block.color}`;
      el.style.height = '0';
      el.style.width = '0';
      el.innerText = '';
    } else {
      el.innerText = block.shape === 'circle' ? '⚪' : '⬛';
    }
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
