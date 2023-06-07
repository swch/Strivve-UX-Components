export function rgbaToHex(color: string) {
  const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');

  if (rgba.length !== 4) {
    throw new Error('Invalid RGBA color format');
  }

  const r = parseInt(rgba[0]);
  const g = parseInt(rgba[1]);
  const b = parseInt(rgba[2]);

  const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;

  return hex;
}

export function getColors(colorHex: string) {
  let color = colorHex;
  if (colorHex.includes('rgba')) {
    color = rgbaToHex(colorHex);
  }
  // Parse the input color
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the dark and lighter shades
  const darkR = Math.max(r - 40, 0);
  const darkG = Math.max(g - 40, 0);
  const darkB = Math.max(b - 40, 0);

  const lighterR = Math.min(r + 40, 255);
  const lighterG = Math.min(g + 40, 255);
  const lighterB = Math.min(b + 40, 255);

  // Convert the values back to hex
  const darkHex = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
  const lighterHex = `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;

  // Return the dark and lighter colors
  return {
    dark: darkHex,
    lighter: lighterHex
  };
}
