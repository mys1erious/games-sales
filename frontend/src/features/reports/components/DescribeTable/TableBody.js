import {TableCell, TableRow, TableBody as BaseTableBody} from "@mui/material";
import React from "react";
import {roundVal} from "features/core/utils";
import {unslugify} from "../../../core/utils";


const RowCells = ({row}) => (
    Object.values(row).map((val, count) => (
        <TableCell key={count}>
            {roundVal(val)}
        </TableCell>
    ))
);


const Row = ({name, data}) => (
    <TableRow>
        <TableCell>{unslugify(name)}</TableCell>
        <RowCells row={data}/>
    </TableRow>
);


const Rows = ({data}) => (
    Object.entries(data).map(([name, row]) => (
        <Row key={name} data={row} name={name} />
    ))
);


const TableBody = ({data}) => (
    <BaseTableBody>
        <Rows data={data} />
    </BaseTableBody>
);


export default React.memo(TableBody);
