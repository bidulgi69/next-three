export function capitalize(letters: string) {
    return `${letters.charAt(0).toUpperCase()}${letters.slice(1)}`
}

export function hexToRGB(hex: string): number[] {
    const bigInteger: number = parseInt(hex, 16);
    const r: number = (bigInteger >> 16) & 255;
    const g: number = (bigInteger >> 8) & 255;
    const b: number = bigInteger & 255;

    return [r, g, b]
}