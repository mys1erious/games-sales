export const initialHighlightedState = {
    'order_by': '',
    'genre': '',
    'esrb_rating': ''
};

export const initialFieldChoices = {
    'order_by': [],
    'genre': [],
    'esrb_rating': [],
    'year_of_release': []
};

export const yearParamInitState = [0, new Date().getFullYear()];

export const filterFields = ['Order By', 'Genre', 'ESRB Rating', 'Year of Release'];
