// soundManager.ts
// Plays sound effects for game feedback
// Uses royalty-free MP3s from JSDelivr

export const soundManager = {
  sounds: {
    click: 'https://cdn.jsdelivr.net/gh/terkelg/awesome-creative-audio-assets/click.mp3',
    win: 'https://cdn.jsdelivr.net/gh/terkelg/awesome-creative-audio-assets/success.mp3',
    wrong: 'https://cdn.jsdelivr.net/gh/terkelg/awesome-creative-audio-assets/error.mp3'
  },
  play(name: string) {
    const url = this.sounds[name];
    if (!url) return;
    const audio = new Audio(url);
    audio.play();
  }
};
