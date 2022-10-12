import React, {useEffect, useMemo, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {Box, ThemeProvider} from "@mui/material";

import Home from "pages/Home";
import Sales from "pages/Sales";
import SaleDetail from "pages/SaleDetail";
import SignIn from "pages/SignIn";
import SignOut from "pages/SignOut";
import SignUp from "pages/SignUp";
import Profile from "pages/Profile";
import Reports from "pages/Reports";
import ReportBuilder from "pages/ReportBuilder";

import Header from "features/core/components/Header";
import Footer from "features/core/components/Footer";
import {darkTheme, lightTheme} from "features/core/themes";
import {handleUser, User} from "features/auth/utils";
import {UserContext} from "features/auth/UserContext";

import "App.css";


function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const [user, setUser] = useState(User({}));
    const userProvider = useMemo(
        () => ({user, setUser}),
        [user, setUser]);

    useEffect(() => {
        handleUser(setUser);
    }, []);

    return (
        <Router>
            <UserContext.Provider value={userProvider}>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
                <Box sx={{minHeight: "92vh", padding: "10px 20px 10px 20px"}}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />

                        <Route path="/sales/" element={<Sales />}/>
                        <Route path="/sales/:saleSlug/" element={<SaleDetail />} />

                        <Route path="/reports/" element={<Reports />} />
                        <Route path="/report-builder/" element={<ReportBuilder />}/>

                        <Route path="/signin/" element={<SignIn />}/>
                        <Route path="/sign-out/" element={<SignOut />}/>
                        <Route path="/signup/" element={<SignUp />}/>
                        <Route path="/profile/" element={<Profile />} />
                    </Routes>
                </Box>
                <Footer />
            </ThemeProvider>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
