import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Container} from "@mui/material";
import { BaseButton as Button } from "../features/core/components/BaseButton";
import {deleteSale, editSale, getSale} from "../features/sales/services";


const SaleDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {saleSlug} = useParams();
    const [sale, setSale] = useState({});

    useEffect(() => {
        handleGetSale();
    }, [saleSlug]);

    async function handleGetSale() {
        try {getSaleFromState();}
        catch (e) {
            await getSale(saleSlug);
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

    async function handleEditSale () {
        await editSale();
    }

    async function handleDeleteSale () {
        await deleteSale(saleSlug);
        navigate(-1);
    }

    // Rework to look normally (like a table or sth)
    // Better way of having same width?
    return(
        <Container component="main" maxWidth="xl" >
            <Button content="Back" color="primary" sx={{width: "70px"}}
                    onClick={() => navigate(-1)}
            />
            <Button content="Edit" color="primary" sx={{width: "70px"}}
                    onClick={handleEditSale}
            />
            <Button content="Delete" color="error" sx={{width: "70px"}}
                    onClick={handleDeleteSale}
            />
            <h3>Sale info:</h3>
            <pre>
                {JSON.stringify(sale, {}, 4)}
            </pre>
        </Container>
    )
};


export default SaleDetail;
