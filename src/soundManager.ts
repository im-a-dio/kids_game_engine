// soundManager.ts
// Simple sound manager for playful effects

export const soundManager = {
  play(type: string) {
    let url = '';
    if (type === 'correct') url = 'https://cdn.jsdelivr.net/gh/rogeriopvl/notification-sounds@master/dist/sounds/positive.mp3';
    if (type === 'wrong') url = 'https://cdn.jsdelivr.net/gh/rogeriopvl/notification-sounds@master/dist/sounds/negative.mp3';
    if (type === 'win') url = 'https://cdn.jsdelivr.net/gh/rogeriopvl/notification-sounds@master/dist/sounds/complete.mp3';
    if (type === 'click') url = 'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9c7e7b.mp3'; // Free click sound
    if (!url) return;
    const audio = new Audio(url);
    audio.volume = 0.3;
    audio.play();
  }
};
