import {Button} from "@mui/material";

const AuthButton = ({text, onClick}) => {
    return(
        <Button variant="outlined" color="primary" size="large"
                fullWidth onClick={onClick} sx={{borderRadius: "20px"}}>
            {text}
        </Button>
    );
};


export default AuthButton;
