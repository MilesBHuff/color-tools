import {diff, type LabColor} from 'color-diff';
export const luminanceToContrast = (L1: LabColor, L2: LabColor): number => {
    let contrast: number = diff(L1, L2);
    contrast = (contrast * 0.20) + 1; // Scale to WCAG
    contrast = Math.round(contrast * 100) / 100; // Round past two decimal places
    return contrast;
};
