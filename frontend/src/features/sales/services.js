import axiosInstance from "lib/axiosInstance";


export const getSales = async(query_params) => {
    return await axiosInstance.get(`/sales/${query_params}`,
        {headers: {Authorization: null}}
    );
};

export const getSale = async(saleSlug) => {
    return await axiosInstance.get(`/sales/${saleSlug}/`,
        {headers: {Authorization: null}}
    );
};

export const getFilterFieldsData = async() => {
    return await axiosInstance.get('/sale-filters/',
        {headers: {Authorization: null}}
    );
};
