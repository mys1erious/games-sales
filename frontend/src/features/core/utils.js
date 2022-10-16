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
