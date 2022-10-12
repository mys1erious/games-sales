import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import {Container} from "@mui/material";

import {Button} from "features/core/components/Button";
import {deleteSale, editSale, getSale} from "features/sales/services";


const buttonWidth = "70px";


const SaleDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {saleSlug} = useParams();
    const [sale, setSale] = useState({});

    function getSaleFromState() {
        try {
            setSale(location.state.sale);
        } catch (e) {
            if (e.name === 'TypeError')
                throw new TypeError('Sale hasn\'t been passed through the state.');
        }
        return sale;
    }

    async function handleGetSale() {
        try {getSaleFromState();}
        catch (e) {
            await getSale(saleSlug);
        }
    }

    useEffect(() => {
        handleGetSale();
    }, [saleSlug]);

    async function handleEditSale () {
        // Implement alert
        await editSale();
    }

    async function handleDeleteSale () {
        // Implement alert
        await deleteSale(saleSlug);
        navigate('/sales/');
    }

    // Rework to look normally (like a table or sth)
    return(
        <Container component="main" maxWidth="xl">
            <Button sx={{width: buttonWidth}} onClick={() => navigate(-1)}>
                Back
            </Button>
            <Button sx={{width: buttonWidth}} onClick={handleEditSale}>
                Edit
            </Button>
            <Button sx={{width: buttonWidth}} onClick={handleDeleteSale}
                    color="error">
                Delete
            </Button>
            <h3>Sale info:</h3>
            <pre>
                {JSON.stringify(sale, {}, 4)}
            </pre>
        </Container>
    )
};


export default SaleDetail;
