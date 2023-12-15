import type {RGBColor} from 'color-diff';

export const rgbToString = (rgb: RGBColor): string => {
    let hex6 = '';
    let hex3 = '';
    for(const value of Object.values(rgb)) {
        if(value != null) {
            const str = value.toString(16).padStart(2, '0');
            hex6 += str;
            if(str[0] === str[1]) hex3 += str[0];
        }
    }
    if(hex3.length === 3) return hex3;
    return hex6;
}
