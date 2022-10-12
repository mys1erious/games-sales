import React from "react";
import {useSearchParams} from "react-router-dom";

import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {Button} from "features/core/components/Button";
import {highlightedInitState} from "../constants";


const SalesFilterMainSidebar = (
    filterFields, toggleMain, toggleSub,
    setCurrPage, highlighted, setHighlighted
) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const resetFilters = () => {
        setHighlighted(highlightedInitState);

        setCurrPage(1);
        setSearchParams({page: '1'});
    };

    return(
        <Box role="presentation" minWidth="216px" width="25vw">
            <Box padding="8px" height="48px"
                 sx={{display: "flex", justifyContent: "space-between"}}>
                <Button sx={{width: "100px"}} onClick={toggleMain(false)}>
                    <NavigateBeforeIcon/> Filter
                </Button>
                <Button sx={{width: "100px"}} onClick={resetFilters}
                        color="error">
                    Reset all
                </Button>
            </Box>
            <List disablePadding sx={{borderTop: "1px solid gray", borderBottom: "1px solid gray"}}>
                {filterFields.map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={toggleSub(true, text)}>
                            <ListItemText primary={text} secondary="current"/>
                            <ListItemText align="right">All</ListItemText>
                            <NavigateNextIcon />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};


export default SalesFilterMainSidebar;
