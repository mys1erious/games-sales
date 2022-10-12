export const localStorageUserFields = [
    'access_token', 'refresh_token',
    'email', 'username'
];

export const User = ({
    email='',
    username='',
    isLoggedIn=false
}) => {
    return {email, username, isLoggedIn}
};

const userIsLoggedIn = () => localStorage.getItem('access_token') !== null;

export const handleUser = (setUser) => {
    if (userIsLoggedIn()){
        setUser(User({
            email: localStorage.getItem('username'),
            username: localStorage.getItem('email'),
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
