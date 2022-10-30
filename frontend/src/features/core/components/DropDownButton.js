import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {zip} from "../utils";


const DropDownButton = ({
    curValue, valuesList, reprValuesList,
    labelText, labelId, id, onChange,
    align="start"
}) => {
    return (
        <Box textAlign={align}>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id={labelId}>{labelText}</InputLabel>
                <Select
                    labelId={labelId}
                    id={id}
                    value={curValue}
                    label={labelText}
                    onChange={onChange}>
                    {zip(valuesList, reprValuesList).map(([value, text]) =>
                        <MenuItem key={value} value={value}>
                            {text}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
};


export default DropDownButton;
