import React from "react";
import {useSearchParams} from "react-router-dom";

import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {Button} from "features/core/components/Button";
import {slugify} from "features/core/utils";
import {initialHighlightedState} from "../constants";


const handleButtonsWidth = "100px";


const SalesFilterMainSidebar = (
    filterFields, toggleMain, toggleSub,
    setCurrPage, highlighted, setHighlighted
) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const resetFilters = () => {
        setHighlighted(initialHighlightedState);
        setCurrPage(1);
        setSearchParams({page: '1'});
    };

    return(
         <Box role="presentation" minWidth="216px" width="25vw">
            <Box padding="8px" height="48px"
                 sx={{display: "flex", justifyContent: "space-between"}}>
                <Button sx={{width: handleButtonsWidth}} onClick={toggleMain(false)}>
                    <NavigateBeforeIcon/> Filter
                </Button>
                <Button sx={{width: handleButtonsWidth}} onClick={resetFilters}
                        color="error">
                    Reset all
                </Button>
            </Box>
            <List disablePadding sx={{
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray"
            }}>
                {filterFields.map((field) => (
                    <ListItem key={field} disablePadding>
                        <ListItemButton onClick={toggleSub(true, field)}>
                            <ListItemText primary={field} secondary={
                                highlighted[slugify(field)]
                                    ? highlighted[slugify(field)]
                                    : 'None'
                            }/>
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
