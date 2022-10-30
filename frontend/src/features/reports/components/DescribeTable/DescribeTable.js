import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Collapse, Paper, Table, TableContainer} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import {getDescribeData} from "../../services";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import {Button} from "features/core/components/Button";


const DescribeTable = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        getDescribeData(searchParams)
            .then(r => setData(r.data));
    }, [searchParams]);

    const handleExpandClick = () =>
        setIsExpanded(currIsExpanded => !currIsExpanded);
    
    return(
        <Box textAlign="center" marginTop="10px" paddingY="15px" borderTop="1px solid gray" >
            <Button onClick={handleExpandClick}>
                Describe Table {isExpanded ? <ExpandLess/> : <ExpandMore/>}
            </Button>

            <Collapse in={isExpanded} timeout="auto">
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
            </Collapse>
        </Box>
    );
};


export default DescribeTable;
