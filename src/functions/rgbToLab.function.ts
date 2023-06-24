import type {LabType, RgbType} from "@/types/color-models.type";
import fantasyRgbToLab from "@fantasy-color/rgb-to-lab";

/** Convert RGB into CIELAB. */
export const rgbToLab = (rgb: RgbType): LabType => {
    const lab = fantasyRgbToLab({
        red: rgb.r,
        green: rgb.g,
        blue: rgb.b,
    });
    return {l: lab.luminance, a: lab.a, b: lab.b};
}
