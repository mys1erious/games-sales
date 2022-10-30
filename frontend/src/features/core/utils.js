export const setObjState = (input, object, setObject) => {
    setObject({
        ...object,
        ...input
    });
};

export const setFormState = (e, form, setForm) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value.trim()
    });
};

export const arrToObj = (arr, defVal) => {
    const obj = {};
    for (const key of arr)
        obj[key] = defVal;
    return obj;
};

export const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '_')
        .replace(/^-+|-+$/g, '');
};

export const unslugify = (slug) => {
    return slug
        .replace(/game__|rating__/gi, '')
        .split('_').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

export const nameShortener = (name, maxLen) => (
    name.length > maxLen
        ? name.substring(0, maxLen-2) + ('..')
        : name
);

export const roundVal = (val) =>
    Math.round((val + Number.EPSILON) * 100) / 100;

export const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

export const setMultSearchParams = (searchParams, allowedProps, props) => {
    const params = new URLSearchParams(searchParams);
    for (const [key, val] of Object.entries(props))
        if (allowedProps.includes(key) && val)
            params.set(key, val);
    return params;
};
