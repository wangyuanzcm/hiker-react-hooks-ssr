import {createStore} from 'redux';
const initState={
    name:""
};
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ACTION_TYPE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return {...state}
    }
}

export const createClientStore=()=>{
    console.log(window.REDUX_STATE,"window")
    return createStore(reducer,window.REDUX_STATE);
}
export const createServerStore=()=>{
    return createStore(reducer);
}