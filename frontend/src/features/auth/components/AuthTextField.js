import {TextField} from "@mui/material";

const AuthTextField = ({formData, updateFormData, type, name, label}) => {
    const handleFormChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    return(
        <TextField type={type} variant="outlined" required fullWidth
                   id={name} name={name} label={label}
                   autoComplete={name} onChange={handleFormChange}
        />
    )


};


export default AuthTextField;
