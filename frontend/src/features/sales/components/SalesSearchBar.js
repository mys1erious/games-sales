import React, {useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {Search} from '@mui/icons-material';
import {useNavigate, useSearchParams} from "react-router-dom";


const SalesSearchBar = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({});

    const [searchText, setSearchText] = useState('');

    const search = () => {
        if (searchText) {
            searchParams.set('text', searchText);
            setSearchParams(searchParams);
            navigate(`/sales/?${searchParams.toString()}`, {state: {newSearch: true}});
        }
        else {
            searchParams.delete('text');
            setSearchParams(searchParams);
        }
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
            <IconButton type="submit" aria-label="search" color="primary"
                        onClick={search}>
                <Search />
            </IconButton>
        </React.Fragment>
    )
};


export default SalesSearchBar;
