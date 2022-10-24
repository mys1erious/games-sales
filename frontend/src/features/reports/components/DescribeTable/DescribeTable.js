import React, {useState} from "react";
import {Box, Collapse, Paper, Table, TableContainer} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import {Button} from "features/core/components/Button";


const DescribeTable = ({data}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () =>
        setIsExpanded(currIsExpanded => !currIsExpanded);

    const sx = isExpanded
        ? {border: "1px solid gray"}
        : {borderTop: "1px solid gray"}

    return(
        <Box textAlign="center" marginTop="10px" paddingTop="15px" sx={sx}>
            <Button onClick={handleExpandClick}>
                Describe Table {isExpanded ? <ExpandLess/> : <ExpandMore/>}
            </Button>

            <Collapse in={isExpanded} timeout="auto">
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}}>
                        <TableHeader data={data}/>
                        <TableBody data={data}/>
                    </Table>
                </TableContainer>
            </Collapse>
        </Box>
    );
};


export default React.memo(DescribeTable);
