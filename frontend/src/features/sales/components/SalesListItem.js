import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    Collapse, styled, ListItemButton,
    ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import gameIconSrc from "assets/game_icon.svg";
import Image from "features/core/components/Image";


const ListItemSubText = styled(ListItemText)({
    paddingLeft: '70px'
});


const SalesListItem = ({sale}) => {
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);

    const handleItemClick = () => {
        navigate(`/sales/${sale.slug}`, {state: {sale: sale}});
    };

    const handleExpandClick = () => {
        setIsExpanded(currIsExpanded => !currIsExpanded);
    };

    const listItemTextSx = !isExpanded
        ? {whiteSpace: 'nowrap', overflow: 'hidden'}
        : {};

    return(
        <>
        <ListItem component="nav" divider={true} disablePadding>
            <ListItemButton sx={{width: '90%'}} onClick={handleItemClick}>
                <ListItemIcon>
                    <Image src={gameIconSrc} alt="Game Icon"
                           maxHeight={24} maxWidth={32}/>
                </ListItemIcon>
                <ListItemText primary={sale.game.name} sx={listItemTextSx}/>
            </ListItemButton>
            <ListItemButton onClick={handleExpandClick} sx={{paddingRight: 0}}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
        </ListItem>
        <Collapse in={isExpanded} timeout={'auto'} unmountOnExit>
            <ListItemSubText secondary={`Developer: ${sale.game.developer}`}/>
            <ListItemSubText secondary={`Genre: ${sale.game.genre}`}/>
            <ListItemSubText secondary={`Platform: ${sale.game.platform}`}/>
            <ListItemSubText secondary={`Year of Release: ${sale.game.year_of_release}`}/>
            <ListItemSubText secondary={`Global Sales: ${sale.global_sales}`}/>
        </Collapse>
        </>
    )
};


export default SalesListItem;
