import type {LabType, RgbType} from "@/types/color-models.type";
import "rgb-lab-conversion";

type tripletType = [number, number, number];
type iccType = 'AdobeRGB1998' | 'eciRGB v2' | 'sRGB IEC61966-2.1';

declare const rgbLabConversion: {
    rgb2Lab: (
        rgbTriplet: tripletType,
        iccProfileName: iccType,
    ) => tripletType,
};

/** Convert RGB into CIELAB. */
export const rgbToLab = (rgb: RgbType): LabType => {
    let rgbTriplet: tripletType = [rgb.r, rgb.b, rgb.g]
    let iccProfileName: iccType = 'sRGB IEC61966-2.1'
    let labTriplet = rgbLabConversion.rgb2Lab(rgbTriplet, iccProfileName);
    return {l: labTriplet[0], a: labTriplet[1], b: labTriplet[2]};
}
