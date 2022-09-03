import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./features/core/components/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Footer from "./features/core/components/Footer";



function App() {
    const darkTheme = createTheme({
        palette: {mode: "dark"}
    });
    const lightTheme = createTheme({
        palette: {mode: "light"}
    });

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
        <Router>
        <ThemeProvider theme={isDarkTheme? darkTheme: lightTheme}>
            <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
            <div className="body-container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </div>
            <Footer />
        </ThemeProvider>
        </Router>
    );
}

export default App;
