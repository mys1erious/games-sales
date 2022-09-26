import {Button} from "@mui/material";
import React from "react";


const BaseButton = ({content, color, onClick, sx}) => {
    return(
            <Button size="small" variant="outlined" color={color}
                    onClick={onClick} sx={sx}
            >{content}
            </Button>
    )
};


export {BaseButton};
