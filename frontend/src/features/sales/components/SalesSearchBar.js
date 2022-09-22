import React from 'react';
import {IconButton, TextField} from "@mui/material";
import {Search} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";


const SalesSearchBar = ({searchText, setSearchText}) => {
    const navigate = useNavigate();

    const search = () => {
        navigate(`/sales/?text=${searchText}`, {state:{newSearch: true}});
    };

    return(
        <React.Fragment>
            <TextField id="salesSearchBar" onInput={
                (e) => setSearchText(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' ? search() : null}
                       variant="outlined"
                       placeholder="Search..."
                       size="small" sx={{marginLeft: "30px"}}
            />
            <IconButton type="submit" aria-label="search"
                        onClick={search}>
                <Search />
            </IconButton>
        </React.Fragment>
    )
};


export default SalesSearchBar;
