import React from "react";
import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {BaseButton as Button} from "../../core/components/BaseButton";
import {useSearchParams} from "react-router-dom";
import {highlightedInitState} from "../../core/utils";


const SalesFilterMainSidebar = (filterFields, toggleMain, toggleSub,
                                setCurrPage, highlighted, setHighlighted) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const resetFilters = () => {
        setHighlighted(highlightedInitState);

        setCurrPage(1);
        setSearchParams({page: '1'});
    };

    return(
        <React.Fragment>
        <Box role="presentation" minWidth="216px" width="25vw">
            <Box padding="8px" height="48px"
                 sx={{display: "flex", justifyContent: "space-between"}}>
                <Button content={<><NavigateBeforeIcon /> Filter</>} sx={{width: "100px"}}
                        onClick={toggleMain(false)}
                />
                <Button content="Reset all" color="error" sx={{width: "100px"}}
                        onClick={() => resetFilters()}
                />
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
        </React.Fragment>
    );
};


export default SalesFilterMainSidebar;
