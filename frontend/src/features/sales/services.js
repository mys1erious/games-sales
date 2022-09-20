import axiosInstance from "../../lib/axiosInstance";
import {AxiosError} from "axios";


export const getSales = async(currPage) => {
    return await axiosInstance.get(`/sales/?page=${currPage}`);
};

export const getSale = async(saleSlug) => {
    try{
        return await axiosInstance.get(`/sales/${saleSlug}/`);
    }
    catch (e) {
        if (e.name === 'AxiosError')
            throw new AxiosError('Probably wrong url.');
    }
};

export const editSale = async(saleSlug) => {
    console.log('Soon');
};

export const deleteSale = async(saleSlug) => {
   return await axiosInstance.delete(`/sales/${saleSlug}`);
};
