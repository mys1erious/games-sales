import {Grid} from "@mui/material";


const AuthBaseForm = ({textFields, buttons}) => {
    return(
        <form noValidate>
            <Grid container rowGap={2} minWidth="320px" width="33vw">
                <Grid item xs={12} container spacing={1}>
                    {textFields.map((textField, index) => (
                        <Grid key={index} item xs={12}>{textField}</Grid>
                    ))}
                </Grid>
                 <Grid item xs={12} container spacing={0.5}>
                     {buttons.map((button, index) => (
                         <Grid key={index} item xs={12}>{button}</Grid>
                     ))}
                 </Grid>
             </Grid>
        </form>
    )
};


export default AuthBaseForm;
