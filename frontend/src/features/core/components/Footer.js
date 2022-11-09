import {Grid, Typography} from "@mui/material";
import LinkButton from "./LinkButton";


const Footer = () => (
    <footer style={{borderTop: "1px solid gray", marginTop: "10px"}}>
        <Grid container textAlign="center" direction="column" marginTop="8px">
            <Grid item xs={12}>
                <Typography>
                    This website is made for educational and research purpose
                </Typography>
                <Typography>© 2022 - Games Sales Analysis</Typography>
                <LinkButton to="/" marginRight="10px">
                    Home
                </LinkButton>
                <LinkButton to="/sales/">
                    Sales
                </LinkButton>
            </Grid>
        </Grid>
    </footer>
    );


export default Footer;
