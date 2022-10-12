import React, {useState} from 'react';
import {Button, Drawer} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {arrToObj} from "../../core/utils";
import {highlightedInitState} from "../constants";
import SalesFilterMainSidebar from "./SalesFilterMainSidebar";
import SalesFilterSubSidebar from "./SalesFilterSubSidebar";


const SalesFilterSidebar = ({setCurrPage}) => {
    const anchor = 'left';

    // For now hard-coded, later make like with Genres for each field
    const filterFields = ['Order By', 'Genre', 'ESRB Rating', 'Year of Release'];

    const [isOpenMain, setIsOpenMain] = useState(false);
    const [isOpenSub, setIsOpenSub] = useState(arrToObj(filterFields, false));
    const [curSubField, setCurSubField] = useState('');
    const [highlighted, setHighlighted] = useState(highlightedInitState);

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
        <React.Fragment>
            <Button sx={{border: "2px solid gray"}} color="primary"
                    size="small" onClick={toggleMainSidebar(true)}>
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
        </React.Fragment>
    )
};


export default SalesFilterSidebar;
