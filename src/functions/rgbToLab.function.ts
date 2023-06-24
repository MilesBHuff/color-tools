import type {LabType, RgbType} from "@/types/color-models.type";

/** Convert RGB into CIELAB. */
export const rgbToLab = (rgb: RgbType): LabType => {
    return {l: 100, a: 0, b: 0}; //TODO
}
