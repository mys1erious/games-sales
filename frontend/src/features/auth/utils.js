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

export const setTokensToLocalStorage = (response) => {
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
};

export const removeTokensFromLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};
