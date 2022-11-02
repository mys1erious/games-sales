import axiosInstance from "lib/axiosInstance";
import {GAMES_BY_FIELDS, TOP_FIELDS} from "./constants";
import {setMultSearchParams} from "features/core/utils";
import axios from "axios";


export const getGamesByFieldsData = async(searchParams, props={}) => {
    const data = {};
    for (const field of GAMES_BY_FIELDS) {
        const res = await getGamesByFieldData(searchParams, {...props, field: field});
        data[field] = res.data;
    }

    return data;
};

export const getGamesByFieldData = async(searchParams, props={}) => {
    const allowedProps = ['field', 'sales_type', 'n'];
    const params = setMultSearchParams(searchParams, allowedProps, props);
    return await axiosInstance.get(`/sale-analysis/games-by-field/?${params}`);
};

export const getGamesAnnuallyData = async(searchParams, props={}) => {
    return await axiosInstance.get(`/sale-analysis/games-annually/?${searchParams}`);
};

export const getScoreData = async(searchParams, props={}) => {
    const params = setMultSearchParams(
        searchParams,
        ['n'],
        props
    );
    return await axiosInstance.get(`/sale-analysis/score/?${params}`);
};

export const getDescribeData = async(searchParams) => {
    return await axiosInstance.get(`/sale-analysis/describe/?${searchParams}`);
};

export const getTopFieldsData = async(searchParams, props={}) => {
    const data = {};
    for (const field of TOP_FIELDS) {
        const res = await getTopFieldData(searchParams, {...props, field: field});
        data[field] = res.data;
    }

    return data;
};

export const getTopFieldData = async(searchParams, props={}) => {
    const allowedProps = ['field', 'sales_type', 'n'];
    const params = setMultSearchParams(searchParams, allowedProps, props);
    return await axiosInstance.get(`/sale-analysis/top-field/?${params}`);
};

export const postReport = async(data) => {
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-analysisData';
    try {
        const res = await axiosInstance.post('/reports/', data);
        console.log('created')
        return res;
    } catch (e) {console.log(e);}
    finally {axiosInstance.defaults.headers['Content-Type'] = 'application/json';}
};

export const getReports = async() => {
    return await axiosInstance.get(`/reports/`);
};


export const getReportBody = async(url) =>
    await axios.get(url, {responseType: 'blob'});

export const deleteReport = async(slug) => {
    return await axiosInstance.delete(`/reports/${slug}/`)
};
