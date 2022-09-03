import React from "react";
import {Box, Container, Grid, Link} from "@mui/material";


const Footer = () => {
    return(
        <Box>
            <Container maxWidth={"lg"}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Future Footer</Box>
                        <Box>
                            <Link href={"/"} color={"inherit"}>Home Page</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Future Footer</Box>
                        <Box>
                            <Link href={"/"} color={"inherit"}>Home Page</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Future Footer</Box>
                        <Box>
                            <Link href={"/"} color={"inherit"}>Home Page</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};


export default Footer;
