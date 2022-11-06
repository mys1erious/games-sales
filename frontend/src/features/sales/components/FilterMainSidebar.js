import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {
    Box, Drawer, List,
    ListItem as BaseListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {Button} from "features/core/components/Button";
import {setObjState, unslugify} from "features/core/utils";

import {FIELDS, initSubFieldsData} from "../constants";
import {getFilterFieldsData} from "../services";
import FilterSubSidebar from "./FilterSubSidebar";
import {skipSidebarToggle} from "./FilterSidebar";


const buttonsWidth = "100px";


const ListItem = ({field, searchParams, onClick}) => {
    let subField = '';
    if (field === FIELDS.YEAR_OF_RELEASE) {
        const gt = searchParams.get('yor_gt');
        const lt = searchParams.get('yor_lt');
        if (gt && lt)
            subField = `${gt}-${lt}`;
    }
    else subField = searchParams.get(field);


    return (
        <BaseListItem disablePadding>
            <ListItemButton onClick={onClick}>
                <ListItemText primary={unslugify(field)} secondary={
                    subField ? unslugify(subField) : 'None'}
                />
                <ListItemText align="right">All</ListItemText>
                <NavigateNextIcon/>
            </ListItemButton>
        </BaseListItem>
    );
};


const FilterMainSidebar = (toggleMain) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isOpenSub, setIsOpenSub] = useState(false);
    const [curSubField, setCurSubField] = useState('');
    const [subFieldsData, setSubFieldsData] = useState(initSubFieldsData);

    useEffect(() => {
        getFilterFieldsData()
            .then(r => setObjState({
                    [FIELDS.GENRE]: r.data['genres'],
                    [FIELDS.ORDER_BY]: r.data['order_by'],
                    [FIELDS.ESRB_RATING]: r.data['esrb_ratings']},
                subFieldsData,
                setSubFieldsData)
            )
    }, []);

    const toggleSub = (open, field='') => (e) => {
        if (skipSidebarToggle(e)) return;

        if (open === true) setCurSubField(field);
        else setCurSubField('');

        setIsOpenSub(open);
    };

    return(
        <>
         <Box role="presentation" minWidth="216px" width="25vw">
            <Box padding="8px" height="48px"
                 sx={{display: "flex", justifyContent: "space-between"}}>
                <Button sx={{width: buttonsWidth}} onClick={toggleMain(false)}>
                    <NavigateBeforeIcon/> Filter
                </Button>
                <Button sx={{width: buttonsWidth}}
                        onClick={() => setSearchParams({page: '1'})}
                        color="error">
                    Reset all
                </Button>
            </Box>
            <List disablePadding sx={{
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray"
            }}>
                {useMemo(() => (
                    Object.values(FIELDS).map((field) => (
                        <ListItem key={field} field={field}
                                  onClick={toggleSub(true, field)}
                                  searchParams={searchParams}
                        />
                    ))), [searchParams]) }
            </List>
         </Box>
        <Drawer anchor="left" open={isOpenSub}
                ModalProps={{keepMounted: true}}
                onClose={() => setIsOpenSub(false)}
                componentsProps={{backdrop: {invisible: true}}}>
            {FilterSubSidebar(curSubField, toggleSub, subFieldsData[curSubField])}
        </Drawer>
        </>
    );
};


export default FilterMainSidebar;
