// GameEngine.ts
// Main game engine class for the SPA
// Suitable for children aged 6+

import * as THREE from 'three';

export class GameEngine {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  logicBlocks: any[] = [];

  constructor() {
    // Set up Three.js scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;
    this.animate();
  }

  // Add a logic block to the engine
  addLogicBlock(block: any) {
    this.logicBlocks.push(block);
    // For demo: add a cube for each block
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = this.logicBlocks.length * 2 - 5;
    this.scene.add(cube);
    block._three = cube;
  }

  // Animate the scene
  animate() {
    requestAnimationFrame(() => this.animate());
    // Spin all cubes
    this.logicBlocks.forEach(block => {
      if (block._three) {
        block._three.rotation.x += 0.01;
        block._three.rotation.y += 0.01;
      }
    });
    this.renderer.render(this.scene, this.camera);
  }

  // Save game to localStorage
  saveGame(name: string) {
    localStorage.setItem(name, JSON.stringify(this.logicBlocks));
  }

  // Load game from localStorage
  loadGame(name: string) {
    const data = localStorage.getItem(name);
    if (data) {
      this.logicBlocks = JSON.parse(data);
      // TODO: re-render blocks
    }
  }

  // Export game as JSON
  exportGame(): string {
    return JSON.stringify(this.logicBlocks, null, 2);
  }

  // Import game from JSON
  importGame(json: string) {
    this.logicBlocks = JSON.parse(json);
    // TODO: re-render blocks
  }
}
