import {threeToSix} from '$/functions/threeToSix.function';
import type {RGBColor} from 'color-diff';

export const stringToRgb = (input: string): RGBColor => {
    if(input.length === 3) input = threeToSix(input);

    return {
        R: parseInt(input.substring(0, 2), 16),
        G: parseInt(input.substring(2, 4), 16),
        B: parseInt(input.substring(4, 6), 16),
    };
}
