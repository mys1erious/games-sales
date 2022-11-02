import {Container, Grid, Typography} from "@mui/material";
import LinkButton from "./LinkButton";


const Footer = () => (
    <footer>
    <Container maxWidth="lg" sx={{
        marginY: "10px",
        paddingY: "10px",
        borderTop: "1px solid gray"}}>
        <Grid container textAlign="center" direction="column">
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
    </Container>
    </footer>
    );


export default Footer;
