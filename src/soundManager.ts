// soundManager.ts
// Plays sound effects for game feedback
// Uses royalty-free MP3s from Freesound (CC0)

export const soundManager = {
  sounds: {
    click: '/sounds/click.mp3', // Place click.mp3 in public/sounds/
    win: '/sounds/win.mp3',     // Place win.mp3 in public/sounds/
    wrong: '/sounds/wrong.mp3'  // Place wrong.mp3 in public/sounds/
  },
  play(name: string) {
    const url = this.sounds[name as keyof typeof this.sounds];
    if (!url) return;
    const audio = new Audio(url);
    audio.play();
  }
};
