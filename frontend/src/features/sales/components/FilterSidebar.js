import React, {useState} from 'react';

import {Drawer} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import {Button} from "features/core/components/Button";
import FilterMainSidebar from "./FilterMainSidebar";


export const skipSidebarToggle = (e) => {
    return (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift'));
};


const FilterSidebar = () => {
    const [isOpenMain, setIsOpenMain] = useState(false);

    const toggleMainSidebar = (open) => (e) => {
        if (skipSidebarToggle(e)) return;
        setIsOpenMain(open);
    };

    return(
        <>
        <Button onClick={toggleMainSidebar(true)}>
            <FilterAltIcon /> Filters
        </Button>
        <Drawer anchor="left" open={isOpenMain}
                ModalProps={{keepMounted: true}}
                onClose={toggleMainSidebar(false)}>
            {FilterMainSidebar(toggleMainSidebar)}
        </Drawer>
        </>
    )
};


export default React.memo(FilterSidebar);
