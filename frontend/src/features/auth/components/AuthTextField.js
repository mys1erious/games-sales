import {TextField} from "@mui/material";
import {setFormState} from "features/core/utils";


const AuthTextField = ({
    formData, setFormData,
    type, name, label,
    onKeyDown,
    error=false,
    helperText=''
}) => (
    <TextField type={type} variant="outlined" required sx={{width: "100%"}}
               id={name} name={name} label={label} error={error}
               helperText={helperText}
               autoComplete={name} onChange={
        (e) => setFormState(e, formData, setFormData)}
               onKeyDown={onKeyDown}
    />
);


export default AuthTextField;
