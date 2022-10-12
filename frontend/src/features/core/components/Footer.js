import {Box, Container, Grid, Link} from "@mui/material";


const Footer = () => (
    <footer>
    <Container maxWidth="lg" sx={{marginBottom: "20px"}}>
        <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>Future Footer1</Box>
                <Box>
                    <Link href={"/"} color={"inherit"}>Home Page</Link>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>Future Footer2</Box>
                <Box>
                    <Link href={"/"} color={"inherit"}>Home Page</Link>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box borderBottom={1}>Future Footer3</Box>
                <Box>
                    <Link href={"/"} color={"inherit"}>Home Page</Link>
                </Box>
            </Grid>
        </Grid>
    </Container>
    </footer>
    );


export default Footer;
