import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {createTheme, ThemeProvider} from "@mui/material";

import "./assets/App.css";

import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Header from "./features/core/components/Header";
import Footer from "./features/core/components/Footer";



function App() {
    const darkTheme = createTheme({
        palette: {mode: "dark"}
    });
    const lightTheme = createTheme({
        palette: {mode: "light"}
    });

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [sales, setSales] = useState([]);

    return (
        <Router>
        <ThemeProvider theme={isDarkTheme? darkTheme: lightTheme}>
            <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
            <div className="body-container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/sales/" element={<Sales
                        sales={sales} setSales={setSales} />}
                    />
                </Routes>
            </div>
            <Footer />
        </ThemeProvider>
        </Router>
    );
}

export default App;
