import {Button} from "@mui/material";

const AuthButton = ({children, onClick}) => {
    return(
        <Button variant="outlined" size="large"
                fullWidth onClick={onClick}
                sx={{borderRadius: "20px"}}>
            {children}
        </Button>
    );
};


export default AuthButton;
