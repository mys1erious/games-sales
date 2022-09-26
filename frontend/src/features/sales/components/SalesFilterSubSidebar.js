import React, {useEffect, useState} from "react";
import {Box, List, ListItem, ListItemButton, ListItemText, TextField, Typography} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {useSearchParams} from "react-router-dom";
import {handleObjectStateChange, slugify} from "../../core/utils";

import {BaseButton as Button} from "../../core/components/BaseButton";
import {getFilterFieldsData} from "../services";


// Remove all hardcoded values by making them the constants
const SalesFilterSubSidebar = (field, toggleSub, highlighted, setHighlighted) => {
     const [searchParams, setSearchParams] = useSearchParams({});
     const [fieldChoices, setFieldChoices] = useState({
         'order_by': [],
         'genre': [],
         'esrb_rating': [],
         'year_of_release': []
     });
     const [yearParam, setYearParam] = useState([0, new Date().getFullYear()]);

     const initFieldsData = async() => {
         let fields = await getFilterFieldsData();
         fields = await fields.data;

         handleObjectStateChange({
                 'genre': fields['genres'],
                 'order_by': fields['order_by'],
                'esrb_rating': fields['esrb_ratings']
             },
             fieldChoices,
             setFieldChoices
         );
     };

     useEffect(() => {
         initFieldsData();
     }, []);

     const highlight = (text) => {
         setHighlighted({...highlighted, [slugify(field)]: text});
     };

     const unhighlight = () => {
         const temp = highlighted;
         delete temp[slugify(field)];
         setHighlighted(temp);
     };

     // Remove hard coded field checks
     const setFilterParam = (text) => {
         highlight(text);

         if (field === 'Year of Release'){
             searchParams.set('yor_gt', yearParam[0].toString());
             searchParams.set('yor_lt', yearParam[1].toString());
             setSearchParams(searchParams);
             return;
         }
         else if (field === 'Order By')
             text = slugify(text);


         searchParams.set(slugify(field), text);
         setSearchParams(searchParams);
     };

     const resetFilterParam = () => {
         unhighlight();

         searchParams.delete(slugify(field));
         setSearchParams(searchParams);
     };

     const listItemSx = (text) =>
         highlighted[slugify(field)] === text
         ? {color: 'green', border: '1px solid green'}
         : {};

     const handleYearParam = (min, max) => {
         setYearParam([min, max]);
     };

     const getListItems = () => {
         const specialFields = ['Year of Release'];
         const fieldItemsMap = {
             'default':
                 fieldChoices[slugify(field)].map((text) => (
                     <ListItem key={text} disablePadding sx={listItemSx(text)}>
                         <ListItemButton onClick={() => setFilterParam(text)}>
                             <ListItemText primary={text}/>
                         </ListItemButton>
                     </ListItem>
                 )),
             'Year of Release':
                 <ListItem key={'Year of Release'} sx={{display: "flex", justifyContent: "center"}}>
                     <TextField size="small" type="tel" variant="standard"
                                onInput={(e) =>
                                    handleYearParam(e.target.value, yearParam[1])}
                     />
                     <HorizontalRuleIcon/>
                     <TextField size="small" type="tel" variant="standard"
                                onInput={(e) =>
                                    handleYearParam(yearParam[0], e.target.value)}
                     />
                     <Button content={"OK"} sx={{marginLeft: "20px"}}
                             onClick={() => setFilterParam(yearParam)}/>
                 </ListItem>
         };

         let fieldType = field;
         if (!specialFields.includes(fieldType))
             fieldType = 'default';

         return fieldItemsMap[fieldType];
     };

     return(
         <React.Fragment>
         <Box role="presentation" minWidth="216px" width="25vw">
             <Box padding="8px" sx={{display: "flex", justifyContent: "space-between"}}>
                 <Button content={<><NavigateBeforeIcon />Back</>} sx={{width: "100px"}}
                         onClick={toggleSub(false, field)} />
                 <Button content="Reset" color="error" sx={{width: "100px"}}
                         onClick={() => resetFilterParam()} />
             </Box>
             <Typography padding="8px" textAlign="center" borderTop="1px solid gray">
                 {field}
             </Typography>
             <List sx={{borderTop: "1px solid gray", borderBottom: "1px solid gray"}}>
                 {field ? getListItems() : null}
             </List>
         </Box>
         </React.Fragment>
     )
};


export default SalesFilterSubSidebar;