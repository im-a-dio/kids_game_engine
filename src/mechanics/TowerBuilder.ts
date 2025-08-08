// TowerBuilder.ts
// Simple Tower Builder mechanic for Kids Game Engine

// TowerBuilder mechanic: drag and stack colorful blocks to build a tower
export class TowerBuilder {
  blocks: string[];
  tower: string[];
  constructor(level: number = 1) {
    this.blocks = Array(level + 2).fill('').map((_, i) => `block${i}`);
    this.tower = [];
  }
  // Render UI for TowerBuilder
  render(container: HTMLElement) {
    container.innerHTML = '<div style="font-size:20px;margin-bottom:8px;">Drag blocks to build your tower!</div>';
    const blockColors = ['#ffb300','#29b6f6','#66bb6a','#ab47bc','#ef5350','#ffa726'];
    const blocksDiv = document.createElement('div');
    blocksDiv.style.display = 'flex';
    blocksDiv.style.gap = '8px';
    this.blocks.forEach((block, i) => {
      const blockEl = document.createElement('div');
      blockEl.innerText = '⬛';
      blockEl.style.background = blockColors[i%blockColors.length];
      blockEl.style.width = '40px';
      blockEl.style.height = '40px';
      blockEl.style.borderRadius = '8px';
      blockEl.style.display = 'flex';
      blockEl.style.alignItems = 'center';
      blockEl.style.justifyContent = 'center';
      blockEl.style.cursor = 'grab';
      blockEl.draggable = true;
      blockEl.ondragstart = (e) => {
        e.dataTransfer?.setData('text/plain', String(i));
      };
      blocksDiv.appendChild(blockEl);
    });
    container.appendChild(blocksDiv);
    const towerDiv = document.createElement('div');
    towerDiv.style.marginTop = '16px';
    towerDiv.style.minHeight = '60px';
    towerDiv.style.border = '2px dashed #888';
    towerDiv.style.padding = '8px';
    towerDiv.style.background = '#f5f5f5';
    towerDiv.innerText = 'Drop blocks here!';
    towerDiv.ondragover = (e) => e.preventDefault();
    towerDiv.ondrop = (e) => {
      const idx = Number(e.dataTransfer?.getData('text/plain'));
      if (!isNaN(idx)) {
        this.tower.push(this.blocks[idx]);
        towerDiv.innerHTML = this.tower.map((b, i) => `<div style='background:${blockColors[i%blockColors.length]};width:40px;height:40px;border-radius:8px;margin:2px auto;'>⬛</div>`).join('');
        soundManager.play('click');
      }
    };
    container.appendChild(towerDiv);
  }
}
