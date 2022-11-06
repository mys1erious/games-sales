import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {Box} from "@mui/material";

import {UserContext} from "features/auth/UserContext";
import ReportsList from "features/reports/components/ReportsList";


const Reports = () => {
    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    useEffect(() => {
        if (!user.isLoggedIn)
            navigate('/signin/');
    }, [user]);

    return (
        <Box minWidth="300px" textAlign="center">
            <ReportsList />
        </Box>
    )
};


export default Reports;
