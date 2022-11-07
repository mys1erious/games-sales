import {Box} from "@mui/material";


const Image = ({
        src, alt,
        maxWidth, maxHeight
}) => (
    <Box component="img"
         sx={{
             maxWidth: maxWidth,
             maxHeight: maxHeight,
         }}
         alt={alt} src={src}
    />
);


export default Image;
