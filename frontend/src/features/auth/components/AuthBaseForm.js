import React from 'react';
import {Grid} from "@mui/material";


const AuthBaseForm = ({textFields, buttons}) => {
    return(
        <form noValidate>
            <Grid item xs={12} container spacing={1} marginTop="20px">
                {textFields.map((textField, index) => (
                    <Grid key={index} item xs={12}>{textField}</Grid>
                ))}
            </Grid>
             <Grid item xs={12} container spacing={1} marginTop="20px">
                 {buttons.map((button, index) => (
                     <Grid key={index} item xs={12}>{button}</Grid>
                 ))}
             </Grid>
        </form>
    )
};


export default AuthBaseForm;
