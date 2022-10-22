import {Button as BaseButton} from "@mui/material";


const Button = ({
    size="small",
    color="primary",
    variant="outlined",
    sx,
    onClick,
    children
}) => (
    <BaseButton size={size} variant={variant} color={color}
                onClick={onClick} sx={sx}>
        {children}
    </BaseButton>
);


export {Button};
