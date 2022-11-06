export const localStorageUserFields = [
    'access_token', 'refresh_token',
    'email', 'username'
];

export const User = ({
    isLoggedIn=false
}) => {
    return {isLoggedIn}
};

const userIsLoggedIn = () => localStorage.getItem('access_token') !== null;

export const handleUser = (setUser) => {
    if (userIsLoggedIn()){
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
