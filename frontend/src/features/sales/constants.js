export const initialHighlightedState = {
    'order_by': '',
    'genre': '',
    'esrb_rating': ''
};

export const filterFields = ['Order By', 'Genre', 'Esrb Rating', 'Year of Release'];

export const initialFieldChoices = {
    'order_by': [],
    'genre': [],
    'esrb_rating': [],
    'year_of_release': []
};

export const yearParamInitState = [0, new Date().getFullYear()];
