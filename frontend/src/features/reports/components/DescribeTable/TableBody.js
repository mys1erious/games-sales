import {TableCell, TableRow, TableBody as BaseTableBody} from "@mui/material";
import {unslugify} from "features/core/utils";
import React from "react";


const RowCells = ({row}) => (
    Object.values(row).map((val, count) => (
        <TableCell key={count}>
            {Math.round((val + Number.EPSILON) * 100) / 100}
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
