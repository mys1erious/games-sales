export const FIELDS = {
    ORDER_BY: 'order_by',
    GENRE: 'genre',
    ESRB_RATING: 'esrb_rating',
    YEAR_OF_RELEASE: 'year_of_release',
};

export const initSubFieldsData = {
    [FIELDS.ORDER_BY]: [],
    [FIELDS.GENRE]: [],
    [FIELDS.ESRB_RATING]: [],
    [FIELDS.YEAR_OF_RELEASE]: []
};

export const initYearParam = [0, new Date().getFullYear()+1];
