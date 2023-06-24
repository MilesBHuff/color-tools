export const round = (target: number, places: number = 2): number => {
    const scale: number = Math.pow(10, places);
    return Math.round(target * scale) / scale;
}
