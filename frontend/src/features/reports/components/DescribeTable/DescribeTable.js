import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Paper, Table, TableContainer} from "@mui/material";

import {getDescribeData} from "../../services";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

import ExpandButton from "features/core/components/ExpandButton";


const DescribeTable = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState({});

    useEffect(() => {
        getDescribeData(searchParams)
            .then(r => setData(r.data));
    }, [searchParams]);

    return (
        <ExpandButton
            sx={{marginTop: "10px",
                paddingY: "15px",
                borderTop: "1px solid gray"}}
            buttonId="describeTableExpandBtn"
            text="Describe Table">
            <TableContainer component={Paper}>
                {Object.keys(data).length > 0
                    ?
                    <Table sx={{minWidth: 650}}>
                        <TableHeader data={data}/>
                        <TableBody data={data}/>
                    </Table>
                    : null
                }
            </TableContainer>
        </ExpandButton>
    )
};


export default DescribeTable;
