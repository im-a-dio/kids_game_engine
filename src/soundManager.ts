// soundManager.ts
// Plays sound effects for game feedback
// Uses royalty-free MP3s from Freesound (CC0)

export const soundManager = {
  sounds: {
    click: 'https://cdn.freesound.org/previews/256/256113_3263906-lq.mp3', // Click sound
    win: 'https://cdn.freesound.org/previews/514/514763_10468364-lq.mp3',   // Win sound
    wrong: 'https://cdn.freesound.org/previews/331/331912_3248244-lq.mp3'   // Wrong sound
  },
  play(name: string) {
    const url = this.sounds[name as keyof typeof this.sounds];
    if (!url) return;
    const audio = new Audio(url);
    audio.play();
  }
};
