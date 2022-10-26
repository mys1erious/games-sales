import BarPieChart from "./components/BarPieChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import ScatterPlot from "./components/ScatterPlot";


export const initReportHeaders = {
    name: '',
    remarks: ''
};

export const initialAnalysisData = {
    description: '',
    top_platforms: [],
    top_genres: [],
    top_publishers: [],
    top_developers: [],
    score_correlation: ''
};

export const PLOTS = {
    TOP10_PLATFORMS: 'Top10Platforms',
    TOP10_GENRES: 'Top10Genres',
    TOP10_PUBLISHERS: 'Top10Publishers',
    TOP10_DEVELOPERS: 'Top10Developers',
    SCORE_CORRELATION: 'ScoreCorrelation'
};

export const initChartsVal = {
    [PLOTS.TOP10_PLATFORMS]: {
        isVisible: true,
        title: 'Top 10 Platforms',
        xTitle: 'platform',
        yTitle: 'count',
        dataProp: 'top_platforms',
        component: BarPieChart
    },
    [PLOTS.TOP10_GENRES]: {
        isVisible: true,
        title: 'Top 10 Genres',
        xTitle: 'genre',
        yTitle: 'count',
        dataProp: 'top_genres',
        component: BarPieChart
    },
    [PLOTS.TOP10_PUBLISHERS]: {
        isVisible: true,
        title: 'Top 10 Publishers',
        xTitle: 'publisher',
        yTitle: 'count',
        dataProp: 'top_publishers',
        component: BarPieChart
    },
    [PLOTS.TOP10_DEVELOPERS]: {
        isVisible: true,
        title: 'Top 10 Developers',
        xTitle: 'developer',
        yTitle: 'count',
        dataProp: 'top_developers',
        component: BarPieChart
    },
    [PLOTS.SCORE_CORRELATION]: {
        isVisible: true,
        title: 'Score Correlation',
        xTitle: 'Critic Score',
        yTitle: 'User Score',
        dataProp: 'score_correlation',
        component: ScatterPlot
    }
};

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

export const DEFAULT_COLOR = '#1696d2';

export const PLOT_DATA_COLORS = [
    '#1278a8', '#45abdb', '#1696d2',
    '#5cb6e0', '#0d5a7e', '#0f6993',
    '#1487bd', '#73c0e4', '#2da1d7'
];

export const PLOT_BREAKPOINTS = {
    [BarChart]: {xs: 12, md: 6, xl: 4},
    [PieChart]: {xs: 12, md: 6, xl: 4},
    [ScatterPlot]: {xs: 9}
};
