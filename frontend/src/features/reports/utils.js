export const nameShortener = (name, maxLen) => (
    name.length > maxLen
        ? name.substring(0, maxLen-2) + ('..')
        : name
);


export const roundVal = (val) =>
    Math.round((val + Number.EPSILON) * 100) / 100;
