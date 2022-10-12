import {Grid} from "@mui/material";

const AuthGrid = ({children}) => (
    <Grid container rowGap={4} direction="column"
          alignItems="center" justifyContent="center"
          minHeight="75vh"
    >
        {children}
    </Grid>
);


export default AuthGrid;
