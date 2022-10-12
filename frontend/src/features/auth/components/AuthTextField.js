import {TextField} from "@mui/material";
import {setFormState} from "features/core/utils";


const AuthTextField = ({formData, setFormData, type, name, label}) => (
    <TextField type={type} variant="outlined" required sx={{width: "100%"}}
               id={name} name={name} label={label}
               autoComplete={name} onChange={
        (e) => setFormState(e, formData, setFormData)}
    />
);


export default AuthTextField;
