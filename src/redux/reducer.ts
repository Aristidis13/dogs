import {Action} from './actions/actions';
import {actionType} from './actions/action-types'
import {combineReducers} from 'redux'

let initialState: Object = {
    apiResults :"",
};

const reducer = (state:Object=initialState, action: Action) => {
    switch(action.type) {
        case actionType.HOMEPAGE :
            return state;
        case actionType.BREEDS :
            return state;
        case actionType.ATOMICBREED :
            return state;
        default : return state;
    }
}

const combinedReducer =  combineReducers({
    photos : reducer
})

export default combinedReducer;