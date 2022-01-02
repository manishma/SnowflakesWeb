export function getStageBackgroundColor(timestamp: number) {
  const hue = Math.floor(timestamp / 180) % 360;
  return `hsl(${hue},100%,25%)`
}
