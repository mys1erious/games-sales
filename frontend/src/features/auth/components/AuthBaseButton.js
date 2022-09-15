import {Button} from "@mui/material";

const AuthBaseButton = ({text, onClick}) => {
    return(
        <Button variant="outlined" color="primary" size="large"
                fullWidth onClick={onClick} sx={{borderRadius: "20px"}}>
            {text}
        </Button>
    );
};


export default AuthBaseButton;
