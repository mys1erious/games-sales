import React from "react";
import {styled, Switch} from "@mui/material";


const barImg = `url('data:image/svg+xml;utf8,` +
    `<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24">` +
        `<path fill="${encodeURIComponent('#fff',)}" ` +
              `d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"/>` +
    `</svg>')`;

const pieImg = `url('data:image/svg+xml;utf8,` +
    `<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24">` +
        `<path fill="${encodeURIComponent('#fff',)}" ` +
              `d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>` +
    `</svg>')`;


const MaterialUISwitch = styled(Switch)(({theme}) => ({
    width: 50,
    height: 28,
    padding: 6,
    '& .MuiSwitch-switchBase': {
        marginTop: 4,
        marginLeft: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#1976d2',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: barImg
            },
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#1976d2',
        width: 20,
        height: 20,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: pieImg,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 0.5,
        backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
        borderRadius: 7,
    },
}));


const SwitchButton = ({sx, onChange}) => (
    <MaterialUISwitch sx={sx} defaultChecked onChange={onChange} />
);


export default SwitchButton;
