
const myThemeColors = ['success','warning','danger','primary','info','brand']


export function randColorName() {
    return myThemeColors[Math.floor(Math.random() * myThemeColors.length)];
}
