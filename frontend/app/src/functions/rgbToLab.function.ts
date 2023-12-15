import {rgba_to_lab, type RGBColor, type LabColor} from 'color-diff';

/** Convert RGB into CIELAB. */
export const rgbToLab = (rgb: RGBColor): LabColor => {
    const lab = rgba_to_lab({
        R: rgb.R,
        G: rgb.G,
        B: rgb.B,
    });
    return {L: lab.L, a: lab.a, b: lab.b};
}
