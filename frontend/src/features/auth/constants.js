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

const initSignUpFieldError = {msg: '', error: false};
export const initSignUpFieldErrors = {
    email: initSignUpFieldError,
    username: initSignUpFieldError,
    password: initSignUpFieldError,
    password_confirmation: initSignUpFieldError
}
