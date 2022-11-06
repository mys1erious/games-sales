import React, {useEffect, useMemo, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {Box, CssBaseline, ThemeProvider} from "@mui/material";

import Sales from "pages/Sales";
import SaleDetail from "pages/SaleDetail";
import SignIn from "pages/SignIn";
import SignOut from "pages/SignOut";
import SignUp from "pages/SignUp";
import Reports from "pages/Reports";
import ReportBuilder from "pages/ReportBuilder";

import Header from "features/core/components/Header";
import Footer from "features/core/components/Footer";
import {darkTheme, lightTheme} from "features/core/themes";
import {handleUser, User} from "features/auth/utils";
import {UserContext} from "features/auth/UserContext";

import "App.css";
import Home from "./pages/Home";
import Alert from "./features/core/components/Alert";
import {AlertContext} from "./features/core/AlertContext";
import {initAlertData} from "./features/core/constants";


function App() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const [user, setUser] = useState(User({}));
    const userProvider = useMemo(
        () => ({user, setUser}),
        [user, setUser]);

    const [alert, setAlert] = useState(initAlertData);

    useEffect(() => {
        handleUser(setUser);
    }, []);

    return (
        <Router>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <UserContext.Provider value={userProvider}>
            <AlertContext.Provider value={{alert, setAlert}}>
                <CssBaseline />
                <Alert/>
                <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>
                <Box sx={{minHeight: "92vh"}}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />

                        <Route path="/sales/" element={<Sales />}/>
                        <Route path="/sales/:saleSlug/" element={<SaleDetail />} />

                        <Route path="/reports/" element={<Reports />} />
                        <Route path="/report-builder/" element={<ReportBuilder />}/>

                        <Route path="/signin/" element={<SignIn />}/>
                        <Route path="/sign-out/" element={<SignOut />}/>
                        <Route path="/signup/" element={<SignUp />}/>
                    </Routes>
                </Box>
                <Footer />
            </AlertContext.Provider>
            </UserContext.Provider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
