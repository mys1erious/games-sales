import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";

import ExpandButton from "features/core/components/ExpandButton";
import {getReportBody} from "../services";


const ReportsListItemPreview = ({url}) => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        const getHtmlText = async () => {
            const response = await getReportBody(url);
            const blob = new Blob([response.data]);
            return await blob.text();
        };
        getHtmlText().then(text => setHtml(text));
    }, [url])

    return (
        <ExpandButton text="Preview"
            sx={{paddingY: "15px"}}>
            <Box width="100%" height="100%" overflow="hidden">
                <iframe title="Preview" srcDoc={html}
                        width="100%" height="600px"
                        content="initial-scale=1"
                        style={{
                            border: 0,
                            overflowY: "scroll",
                            paddingLeft: "16px",
                            boxSizing: "content-box"}}
                />
            </Box>
        </ExpandButton>
    )
};


export default ReportsListItemPreview;
