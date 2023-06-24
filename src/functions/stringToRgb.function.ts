import type {RgbType} from '@/types/color-models.type';
import {threeToSix} from '@/functions/threeToSix.function';

export const stringToRgb = (input: string): RgbType => {
    if(input.length === 3) input = threeToSix(input);

    return {
        r: parseInt(input.substring(0, 2), 16),
        g: parseInt(input.substring(2, 4), 16),
        b: parseInt(input.substring(4, 6), 16),
    };
}
