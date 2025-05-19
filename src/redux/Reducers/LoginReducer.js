import { LoginActionType } from "../Constants/LoginActionType";


const initialState = {
    isLogin: false,
    token: null,
    user: null,
    userModules: [],
};

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginActionType.SET_IS_LOGIN:
            return {...state, isLogin: action.payload};
        case LoginActionType.SET_TOKEN:
            return {...state, token: action.payload};
        case LoginActionType.SET_USER:
            return {...state, user: action.payload};
        case LoginActionType.UPDATE_USER:
            return {...state, user: action.payload};
        case LoginActionType.SET_USER_MODULES:
            return {...state, userModules: action.payload};
        case LoginActionType.UPDATE_USER_MODULES:
            return {...state, userModules: action.payload};
        case LoginActionType.LOGOUT:
            return initialState; // Reset the state to the initial state
        default:
            return state;
    }
};
