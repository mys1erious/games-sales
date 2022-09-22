import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {createTheme, ThemeProvider} from "@mui/material";

import "./assets/App.css";

import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Header from "./features/core/components/Header";
import Footer from "./features/core/components/Footer";
import SaleDetail from "./pages/SaleDetail";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";



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
                    <Route path="/sales/:saleSlug/" element={<SaleDetail />} />*/}

                    <Route path="/signin/" element={<SignIn />}/>
                    <Route path="/sign-out/" element={<SignOut />}/>
                    <Route path="/signup/" element={<SignUp />}/>
                    <Route path="/profile/" element={<Profile />} />
                </Routes>
            </div>
            <Footer />
        </ThemeProvider>
        </Router>
    );
}

export default App;
