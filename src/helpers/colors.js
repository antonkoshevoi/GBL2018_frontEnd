
const myThemeColors = ['success','warning','danger','primary','info', 'muted', 'dark']


export function randColorName() {
    return myThemeColors[Math.floor(Math.random() * myThemeColors.length)];
}
