import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import {AxiosError} from "axios";
import {Alert, Collapse, Container, createTheme, IconButton, useTheme} from "@mui/material";

import { BaseButton as Button } from "../features/sales/components/BaseButton";
import * as PropTypes from "prop-types";


function CloseIcon(props) {
    return null;
}

CloseIcon.propTypes = {fontSize: PropTypes.string};
const SaleDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {saleSlug} = useParams();
    const [sale, setSale] = useState({});

    useEffect(() => {
        getSale();
    }, [saleSlug]);

    async function getSale() {
        try {getSaleFromState();}
        catch (e) {
            await getSaleFromAPI();
        }
    }

    function getSaleFromState() {
        try {setSale(location.state.sale);}
        catch (e) {
            if (e.name === 'TypeError')
                throw new TypeError('Sale hasn\'t been passed through the state.');
        }
        return sale;
    }

    async function getSaleFromAPI() {
        try{
            let response = await axiosInstance.get(`/sales/${saleSlug}/`);
            let data = await response.data;
            setSale(data);
        }
        catch (e) {
            if (e.name === 'AxiosError')
                throw new AxiosError('Probably wrong url.');
        }
    }

    async function handleEdit () {
        console.log('Soon');
    }

    async function handleDelete () {
       await axiosInstance.delete(`/sales/${saleSlug}`);
       navigate(-1);
    }

    // Rework to look normally (like a table or sth)
    return(
        <React.Fragment>
            <Container component="main" maxWidth="xl" >
                <Button text={"Back"} color={"red"} onClick={() => navigate(-1)}/>
                <Button text={"Edit"} color={"red"} onClick={handleEdit}/>
                <Button text={"Delete"} color={"red"} onClick={handleDelete}/>
                <h3>Sale info:</h3>
                <pre>
                    {JSON.stringify(sale, {}, 4)}
                </pre>
            </Container>
        </React.Fragment>
    )
};


export default SaleDetail;
