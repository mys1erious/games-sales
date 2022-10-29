import BarPieChart from "./components/BarPieChart";
import ScatterPlot from "./components/ScatterPlot";
import LineChart from "./components/LineChart";
import GBG from "./components/ScatterBarPlot";


export const initReportHeaders = {
    name: '',
    remarks: ''
};

export const PLOTS = {
    TOP10_PLATFORMS: 'Top10Platforms',
    TOP10_GENRES: 'Top10Genres',
    TOP10_PUBLISHERS: 'Top10Publishers',
    TOP10_DEVELOPERS: 'Top10Developers',
    SCORE_CORRELATION: 'ScoreCorrelation',
    GAMES_ANNUALLY: 'GamesAnnually',
    TOP_GAMES_BY_GENRE: 'TopGamesByGenre',
    TOP_GAMES_BY_PLATFORM: 'TopGamesByPlatform'
};


export const initPlotVals = {
    [PLOTS.TOP10_PLATFORMS]: {
        isVisible: true,
        title: 'Top 10 Platforms',
        xTitle: 'platform',
        yTitle: 'sales',
        component: BarPieChart
    },
    [PLOTS.TOP10_GENRES]: {
        isVisible: true,
        title: 'Top 10 Genres',
        xTitle: 'genre',
        yTitle: 'sales',
        component: BarPieChart
    },
    [PLOTS.TOP10_PUBLISHERS]: {
        isVisible: true,
        title: 'Top 10 Publishers',
        xTitle: 'publisher',
        yTitle: 'sales',
        component: BarPieChart
    },
    [PLOTS.TOP10_DEVELOPERS]: {
        isVisible: true,
        title: 'Top 10 Developers',
        xTitle: 'developer',
        yTitle: 'sales',
        component: BarPieChart
    },
    [PLOTS.GAMES_ANNUALLY]: {
        isVisible: true,
        title: 'Games Published Annually',
        xTitle: 'year_of_release',
        yTitle: 'count',
        component: LineChart
    },
    [PLOTS.SCORE_CORRELATION]: {
        isVisible: true,
        title: 'Score Correlation',
        xTitle: 'critic_score',
        yTitle: 'user_score',
        component: ScatterPlot
    },
    [PLOTS.TOP_GAMES_BY_GENRE]: {
            isVisible: true,
            title: 'Top Games By Genre',
            xTitle: 'genre',
            yTitle: 'sales',
            xyTitle: 'name',
            component: GBG
        },
    [PLOTS.TOP_GAMES_BY_PLATFORM]: {
            isVisible: true,
            title: 'Top Games By Platform',
            xTitle: 'platform',
            yTitle: 'sales',
            xyTitle: 'name',
            component: GBG
        }
};

export const TOP_FIELDS = ['platform', 'genre', 'publisher', 'developer'];
export const GAMES_BY_FIELDS = ['genre', 'platform'];

export const DEFAULT_COLOR = '#1696d2';
export const PLOT_DATA_COLORS = [
    '#1278a8', '#45abdb', '#1696d2',
    '#5cb6e0', '#0d5a7e', '#0f6993',
    '#1487bd', '#73c0e4', '#2da1d7'
];

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
