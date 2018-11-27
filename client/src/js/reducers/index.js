import { NAV_MOVE_PAGE, CONTAINER_MOVE_PAGE } from '../constants/action-types';

const initialState = {
    curPage: 'main',
    userInfo: {
        name: '노기린',
        email: 'nohtaesang@naver.com',
        pw: '',
        birth: '19930105',
        sex: 'm',
    },
    cardList: {
        curCategory: 'best',
        filterOption: [
            {
                id: '',
                content: '',
                sex: '',
                hashTag: '',
                orderBy: '',
            },
        ],
        cards: [
            {
                id: '0',
                thumbnail: 'thumbnail',
                title: 'first title',
                writer: '노기린',
                explain: '내용1',
                like: '5',
                comment: '2',
                view: '27',
                content: '',
            },
            {
                id: '1',
                thumbnail: 'thumbnail',
                title: 'second title',
                writer: '노기린',
                explain: '내용2',
                like: '2',
                comment: '0',
                view: '5',
                content: '',
            },
        ],
    },
};

const rootReducer = (state = initialState, action) => {
    // console.log(state);
    switch (action.type) {
    case NAV_MOVE_PAGE:
        return { ...state, curPage: action.payload };
    case CONTAINER_MOVE_PAGE:
        return { ...state, cardList: { ...state.cardList, curCategory: action.payload } };
    default:
        return state;
    }
};

export default rootReducer;
