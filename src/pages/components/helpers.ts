export const TRIANGLES_COUNT = 100;

// See https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hslToRgb(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
        b * 255
    )})`;
}

export const generateRGBColors = (numColors: number) => {
    const colors = [];

    for (let i = 0; i < numColors; i++) {
        const hue = (i * 360) / numColors; // Vary the hue in the HSL color space
        const saturation = 100; // You can adjust saturation and lightness if needed
        const lightness = 50; // You can adjust saturation and lightness if needed

        const rgbColor = hslToRgb(hue, saturation, lightness);
        colors.push(rgbColor);
    }

    return colors;
};

export function calculatePointC(pointA: number[], pointB: number[], BACAngle: number) {
    const angle = (BACAngle * Math.PI) / 180,
        vectorAB = [
            pointB[0] - pointA[0],
            pointB[1] - pointA[1],
            pointB[2] - pointA[2],
        ],
        cosTheta = Math.cos(angle),
        sinTheta = Math.sin(angle),
        rotationMatrix = [
            [cosTheta, -sinTheta, 0],
            [sinTheta, cosTheta, 0],
            [0, 0, 1],
        ],
        // Calculate rotated vector AC
        rotatedVectorAC = [
            rotationMatrix[0][0] * vectorAB[0] +
                rotationMatrix[0][1] * vectorAB[1],
            rotationMatrix[1][0] * vectorAB[0] +
                rotationMatrix[1][1] * vectorAB[1],
            rotationMatrix[2][0] * vectorAB[0] +
                rotationMatrix[2][1] * vectorAB[1],
        ];

    // Calculate point C
    return [
        pointA[0] + rotatedVectorAC[0],
        pointA[1] + rotatedVectorAC[1],
        pointA[2] + rotatedVectorAC[2],
    ];
}