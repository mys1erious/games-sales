import React, {useState, useEffect} from "react";

import {Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

import {ReactComponent as GameIcon} from "../../../assets/game_icon.svg";
import '../SalesListItem.css';
import {useNavigate} from "react-router-dom";


const ListItemSubText = styled(ListItemText)({
    paddingLeft: '70px'
});


const SalesListItem = ({sale, currPage}) => {
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setIsExpanded(false);
    }, [currPage]);

    const handleItemClick = () => {
        navigate(`/sales/${sale.slug}`, {state: {sale: sale}});
    };

    const handleExpandClick = () => {
        setIsExpanded(currIsExpanded => !currIsExpanded);
    };

    return(
        <React.Fragment>
            <ListItem
                      component="nav"
                      divider={true}
                      disablePadding>
                <ListItemButton sx={{width: '90%'}}
                                onClick={handleItemClick}>
                    <ListItemIcon><GameIcon className="icon" /></ListItemIcon>
                    <ListItemText primary={sale.game.name} />
                </ListItemButton>
                <ListItemButton onClick={handleExpandClick}>
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
        </React.Fragment>
    )
};


export default SalesListItem;
