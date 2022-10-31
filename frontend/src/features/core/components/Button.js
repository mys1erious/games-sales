import {Button as BaseButton} from "@mui/material";


const Button = ({
    size="small",
    color="primary",
    variant="outlined",
    sx,
    onClick,
    children,
    id
}) => (
    <BaseButton id={id} size={size}
                variant={variant}
                color={color} sx={sx}
                onClick={onClick}>
        {children}
    </BaseButton>
);


export {Button};
