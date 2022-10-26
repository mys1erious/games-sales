export const nameShortener = (name, maxLen) => (
    name.length > maxLen
        ? name.substring(0, maxLen-2) + ('..')
        : name
);

export const roundVal = (val) =>
    Math.round((val + Number.EPSILON) * 100) / 100;

export const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
