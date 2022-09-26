import {Grid} from "@mui/material";

const AuthMainGrid = ({content}) => {
    return(
        <Grid container rowGap={4} direction="column"
              alignItems="center" justifyContent="center"
        >
            {content}
        </Grid>
    );
};


export default AuthMainGrid;
