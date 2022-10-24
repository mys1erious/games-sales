import {TableHead, TableCell, TableRow} from "@mui/material";
import React from "react";


const getTableHeaders = (data) => {
    const row = Object.values(data)[0];
    return Object.keys(row);
};


const RowCells = ({row}) => (
    Object.values(row).map((val) => (
        <TableCell key={val}>{val}</TableCell>)
    )
);


const TableHeader = ({data}) => {
    const tableHeaders = getTableHeaders(data);

    return (
        <TableHead>
            <TableRow>
                <TableCell />
                <RowCells row={tableHeaders} />
            </TableRow>
        </TableHead>
    );
};


export default React.memo(TableHeader);
