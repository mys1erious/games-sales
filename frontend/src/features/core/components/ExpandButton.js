import React, {useState} from "react";
import {Box, Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import {Button} from "./Button";


const ExpandButton = ({children, sx, buttonId, text}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () =>
        setIsExpanded(currIsExpanded => !currIsExpanded);

    return(
        <Box textAlign="center" sx={sx}>
            <Button id={buttonId} onClick={handleExpandClick} sx={{marginY: "10px"}}>
                {text} {isExpanded ? <ExpandLess/> : <ExpandMore/>}
            </Button>
            <Collapse in={isExpanded} timeout="auto">
                {children}
            </Collapse>
        </Box>
    );
};


export default ExpandButton;
