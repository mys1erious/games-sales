export const initSignInFormData = Object.freeze({
    email: '',
    password: ''
});

export const initSignUpFormData = Object.freeze({
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
