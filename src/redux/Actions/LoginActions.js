import { LoginActionType } from "../Constants/LoginActionType";


export const setIsLogin = (data) => {
    return {
        type: LoginActionType.SET_IS_LOGIN,
        payload: data,
    };
};

export const setToken = (data) => {
    return {
        type: LoginActionType.SET_TOKEN,
        payload: data,
    };
};

export const setUser = (data) => {
    return {
        type: LoginActionType.SET_USER,
        payload: data,
    };
};

export const updateUser = (userData) => {
    return {
        type: LoginActionType.UPDATE_USER,
        payload: userData,
    };
};

export const setUserModules = (data) => {
    return {
        type: LoginActionType.SET_USER_MODULES,
        payload: data,
    };
};

export const updateUserModules = (data) => {
    return {
        type: LoginActionType.UPDATE_USER_MODULES,
        payload: data,
    };
};

export const logout = () => {
    return {
        type: LoginActionType.LOGOUT,
    };
};