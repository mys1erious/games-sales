import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {unslugify} from "../../core/utils";
import React from "react";

const SaleDetailTable = ({obj, exclude=[]}) => (
    <TableContainer component={Paper}>
        <Table sx={{minWidth: "25vw", border: "1px solid gray"}}>
            <TableHead>
                <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.entries(obj).map(([field, value]) => (
                        !exclude.includes(field)
                            ?
                            <TableRow key={field}>
                                <TableCell>{unslugify(field)}</TableCell>
                                <TableCell>{value || 'null'}</TableCell>
                            </TableRow>
                            : null
                    )
                )}
            </TableBody>
        </Table>
    </TableContainer>
);


export default SaleDetailTable;
