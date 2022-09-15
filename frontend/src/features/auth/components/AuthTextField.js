import {TextField} from "@mui/material";
import {handleFormStateChange} from "../utils";


const AuthTextField = ({formData, updateFormData, type, name, label}) => {
    return(
        <TextField type={type} variant="outlined" required fullWidth
                   id={name} name={name} label={label}
                   autoComplete={name} onChange={
            (e) => handleFormStateChange(e, formData, updateFormData)
        }
        />
    )


};


export default AuthTextField;
