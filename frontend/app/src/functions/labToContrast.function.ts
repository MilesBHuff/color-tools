import type { LabColor } from "color-diff";

/** Convert Lab luminance to contrast, per WCAG. */
export const labToContrast = (Lab1: LabColor, Lab2: LabColor): number => {
    if (Lab1.L > Lab2.L) return oneWayContrast(Lab1.L, Lab2.L);
    return oneWayContrast(Lab2.L / 100, Lab1.L / 100);
};
const oneWayContrast = (Lum1: number, Lum2: number): number => (Lum1 + 0.05) / (Lum2 + 0.05);
