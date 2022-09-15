import {Grid} from "@mui/material";

const AuthMainGrid = ({content}) => {
    return(
        <Grid container rowSpacing={4} direction="column"
              alignItems="center" justifyContent="center"
        >
            {content}
        </Grid>
    );
};


export default AuthMainGrid;
