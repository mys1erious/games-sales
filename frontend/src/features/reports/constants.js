import BarPieChart from "./components/BarPieChart";


export const initReportHeaders = {
    name: '',
    remarks: ''
};
export const initialAnalysisData = {
    description: '',
    top_platforms: [],
    top_genres: [],
    top_publishers: [],
    top_developers: []
};

export const CHARTS = {
    TOP10_PLATFORMS: 'Top10Platforms',
    TOP10_GENRES: 'Top10Genres',
    TOP10_PUBLISHERS: 'Top10Publishers',
    TOP10_DEVELOPERS: 'Top10Developers'
};

export const initChartsVal = {
    [CHARTS.TOP10_PLATFORMS]: {
        isVisible: true,
        title: 'Top 10 Platforms',
        xTitle: 'platform',
        yTitle: 'count',
        dataProp: 'top_platforms',
        component: BarPieChart
    },
    [CHARTS.TOP10_GENRES]: {
        isVisible: true,
        title: 'Top 10 Genres',
        xTitle: 'genre',
        yTitle: 'count',
        dataProp: 'top_genres',
        component: BarPieChart
    },
    [CHARTS.TOP10_PUBLISHERS]: {
        isVisible: true,
        title: 'Top 10 Publishers',
        xTitle: 'publisher',
        yTitle: 'count',
        dataProp: 'top_publishers',
        component: BarPieChart
    },
    [CHARTS.TOP10_DEVELOPERS]: {
        isVisible: true,
        title: 'Top 10 Developers',
        xTitle: 'developer',
        yTitle: 'count',
        dataProp: 'top_developers',
        component: BarPieChart
    },
};
