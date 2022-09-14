import {Grid} from "@mui/material";

const AuthGrid = ({content}) => {
    return(
        <Grid container rowSpacing={4} direction="column"
              alignItems="center" justifyContent="center"
              sx={{border: 1}}
        >
            {content}
        </Grid>
    );
};


export default AuthGrid;
