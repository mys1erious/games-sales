export const initialSignInFormData = Object.freeze({
    email: '',
    password: ''
});

export const initialSignUpFormData = Object.freeze({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
});

export const initialAlertData = Object.freeze({
    isAlert: false,
    type: '',
    text: ''
});

export const statusAlertTypeMap = {
    201: 'success',
    400: 'error',
    'other': 'info'
};