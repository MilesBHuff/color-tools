/** Convert luminance to contrast, per WCAG. */
export const luminanceToContrast = (L1: number, L2: number): number => {
    if (L1 > L2) return oneWayContrast(L1, L2);
    return oneWayContrast(L2, L1);
};
const oneWayContrast = (L1: number, L2: number): number => (L1 + 0.05) / (L2 + 0.05);
