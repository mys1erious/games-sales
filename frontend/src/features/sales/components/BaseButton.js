import {Button, createTheme, ThemeProvider} from "@mui/material";
import React from "react";


const theme = createTheme({
  palette: {
    red: {
      light: '#fe5641',
      main: '#c41a17',
      dark: '#8b0000',
      contrastText: '#000',
    },
  },
});

const BaseButton = ({text, color, onClick}) => {
    return(
        <ThemeProvider theme={theme}>
            <Button size="small" variant="contained" color={color}
                    onClick={onClick} sx={{width: "70px"}}
            >{text}
            </Button>
        </ThemeProvider>
    )
};


export {BaseButton};
