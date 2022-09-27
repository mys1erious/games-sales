export const handleObjectStateChange = (input, object, updateObject) => {
    updateObject({
        ...object,
        ...input
    });
};

export const handleFormStateChange = (e, form, updateForm) => {
    updateForm({
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

export const buildSearchParamsObj = (searchParams) => {
    const params = {};
    for (let [key, val] of searchParams)
        params[key] = val;
    return params;
};

export const slugify = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '_')
        .replace(/^-+|-+$/g, '');
};

export const slugifyArray = (arr) => {
    const slugifiedArr = [];
    for (let item of arr)
        slugifiedArr.push(slugify(item));
    return slugifiedArr;
};

export const highlightedInitState = {
    'order_by': '',
    'genre': '',
    'esrb_rating': ''
};

export const yearParamInitState = [0, new Date().getFullYear()];
