import type {RGBColor} from 'color-diff';

export const newRGBColor = (
    R: number = 0x00,
    G: number = 0x00,
    B: number = 0x00,
    A?: number,
): RGBColor => ({R, G, B, A});
