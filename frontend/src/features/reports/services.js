import axiosInstance from "lib/axiosInstance";

export const getAnalysisData = async(searchParams) => {
    return await axiosInstance.get(`/sale-analysis/?${searchParams}`);
};

export const postReport = async(data) => {
    return await axiosInstance.post('/reports/', data,
        {headers: {'Content-Type': 'multipart/form-analysisData'}}
    );
};
