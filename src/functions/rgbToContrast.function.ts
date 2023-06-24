import type {RGBColor} from "color-diff";

export const rgbToContrast = (rgb1: RGBColor, rgb2: RGBColor): number => {
    const L1 = getRelativeLuminance(rgb1) + 0.05;
    const L2 = getRelativeLuminance(rgb2) + 0.05;

    return L1 > L2 ? L1 / L2 : L2 / L1;
}

export const getRelativeLuminance = (color: RGBColor): number => {
    let R = color.R/255;
    let G = color.G/255;
    let B = color.B/255;

    R = (R <= 0.03928) ? R / 12.92 : ((R + 0.055) / 1.055) ** 2.4;
    G = (G <= 0.03928) ? G / 12.92 : ((G + 0.055) / 1.055) ** 2.4;
    B = (B <= 0.03928) ? B / 12.92 : ((B + 0.055) / 1.055) ** 2.4;

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
