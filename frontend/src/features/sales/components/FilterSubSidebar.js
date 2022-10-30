import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import {slugify, unslugify} from "features/core/utils";
import {Button} from "features/core/components/Button";

import {FIELDS, initYearParam} from "../constants";


const DefaultListItem = ({field, subField, searchParams, setSearchParams, sx}) => {
    const onClick = () => {
        searchParams.set(field, slugify(subField));
        setSearchParams(searchParams);
    };

    return (
        <ListItem disablePadding sx={sx}>
            <ListItemButton onClick={onClick}>
                <ListItemText primary={subField}/>
            </ListItemButton>
        </ListItem>
    );
};


const YORListItem = ({searchParams, setSearchParams}) => {
    const [state, setState] = useState([
        searchParams.get('yor_gt') || initYearParam[0],
        searchParams.get('yor_lt') || initYearParam[1]
    ]);

    const onClick = () => {
        searchParams.set('yor_gt', state[0] || initYearParam[0]);
        searchParams.set('yor_lt', state[1] || initYearParam[1]);
        setSearchParams(searchParams);
    };

    return (
        <ListItem sx={{display: "flex", justifyContent: "center"}}>
            <TextField size="small" variant="standard"
                       type="tel" value={state[0]}
                       onInput={e => setState([e.target.value, state[1]])}
            />
            <HorizontalRuleIcon/>
            <TextField size="small" variant="standard"
                       type="tel" value={state[1]}
                       onInput={e => setState([state[0], e.target.value])}
            />
            <Button sx={{marginLeft: "20px"}}
                    onClick={onClick}>
                OK
            </Button>
        </ListItem>
    );
};


const FilterSubSidebar = (field, toggleSub, subFieldData) => {
     const [searchParams, setSearchParams] = useSearchParams({});

     const resetFilterParam = () => {
         if (field === FIELDS.YEAR_OF_RELEASE){
             searchParams.delete('yor_lt');
             searchParams.delete('yor_gt');
         }
         else searchParams.delete(slugify(field));

         setSearchParams(searchParams);
     };

    const listItemSx = (text) =>
        searchParams.get(field) === text
            ? {color: 'green', border: '1px solid green'}
            : {};

    const ListItems = () => {
        const listItemTemplates = {
            'default': (subField) =>
                <DefaultListItem
                    key={subField}
                    field={field}
                    subField={subField}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    sx={listItemSx(slugify(subField))}
                />,
            [FIELDS.YEAR_OF_RELEASE]:
                <YORListItem searchParams={searchParams}
                             setSearchParams={setSearchParams}
                />
        };
        const uniqueFields = [FIELDS.YEAR_OF_RELEASE];

        if (!uniqueFields.includes(field))
            return(
                subFieldData.map((subField) =>
                    listItemTemplates['default'](subField)
                )
            );

        return listItemTemplates[field];
    };

     return(
         <Box role="presentation" minWidth="216px" width="25vw">
             <Box padding="8px" sx={{display: "flex", justifyContent: "space-between"}}>
                 <Button sx={{width: "100px"}} onClick={toggleSub(false)}>
                     <NavigateBeforeIcon />Back
                 </Button>
                 <Button color="error" sx={{width: "100px"}} onClick={resetFilterParam}>
                     Reset
                 </Button>
             </Box>
             <Typography padding="8px" textAlign="center" borderTop="1px solid gray">
                 {unslugify(field)}
             </Typography>
             <List sx={{borderTop: "1px solid gray", borderBottom: "1px solid gray"}}>
                 {field ? <ListItems /> : null}
             </List>
         </Box>
     );
};


export default FilterSubSidebar;
