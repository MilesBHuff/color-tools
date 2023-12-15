export const threeToSix = (input: string): string => {
    let output = '';
    for(const each of input) {
        output += each + each;
    }
    return output;
}
