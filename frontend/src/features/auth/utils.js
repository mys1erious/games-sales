export const localStorageUserFields = [
    'access_token', 'refresh_token'
];

export const User = ({
    isLoggedIn=false
}) => {
    return {isLoggedIn}
};

const userHasAccessToken = () => localStorage.getItem('access_token') !== null;

export const handleUser = (setUser) => {
    if (userHasAccessToken()){
        setUser(User({
            isLoggedIn: true
        }));
    }
    else
        setUser(User({isLoggedIn: false}));
};

export const setUserDataToLocalStorage = (props) => {
    for (const field of localStorageUserFields)
        localStorage.setItem(field, props[field]);
};

export const removeUserDataFromLocalStorage = () => {
    for (const field of localStorageUserFields)
        localStorage.removeItem(field);
};
