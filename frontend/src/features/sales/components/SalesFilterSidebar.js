import React, {useState} from 'react';

import {Drawer} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import {arrToObj} from "features/core/utils";
import {Button} from "features/core/components/Button";

import {filterFields, initialHighlightedState} from "../constants";
import SalesFilterMainSidebar from "./SalesFilterMainSidebar";
import SalesFilterSubSidebar from "./SalesFilterSubSidebar";


const SalesFilterSidebar = ({setCurrPage}) => {
    const anchor = 'left';

    const [isOpenMain, setIsOpenMain] = useState(false);
    const [isOpenSub, setIsOpenSub] = useState(arrToObj(filterFields, false));
    const [curSubField, setCurSubField] = useState('');
    const [highlighted, setHighlighted] = useState(initialHighlightedState);

    const skipSidebarToggle = (e) => {
        return (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift'));
    };

    const toggleMainSidebar = (open) => (e) => {
        if (skipSidebarToggle(e)) return;
        setIsOpenMain(open);
    };

    const toggleSubSidebar = (open, field) => (e) => {
        if (skipSidebarToggle(e)) return;

        if (open === true) setCurSubField(field);
        else setCurSubField('');

        setIsOpenSub({...isOpenSub, [field]: open});
    };

    return(
        <>
        <Button onClick={toggleMainSidebar(true)}>
            <FilterAltIcon /> Filters
        </Button>
        <Drawer anchor={anchor} open={isOpenMain}
                ModalProps={{keepMounted: true}}
                onClose={toggleMainSidebar(false)}>
            {SalesFilterMainSidebar(
                filterFields, toggleMainSidebar, toggleSubSidebar,
                setCurrPage, highlighted, setHighlighted)}
        </Drawer>
        <Drawer anchor={anchor} open={isOpenSub[curSubField]}
                ModalProps={{keepMounted: true}}
                onClose={toggleSubSidebar(false, curSubField)}
                componentsProps={{backdrop :{invisible: true}}}>
            {SalesFilterSubSidebar(curSubField, toggleSubSidebar, highlighted, setHighlighted)}
        </Drawer>
        </>
    )
};


export default SalesFilterSidebar;
