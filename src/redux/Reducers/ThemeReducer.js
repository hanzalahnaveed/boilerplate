import {ThemeActionType} from "../Constants/ThemeActionType.js";

const initialState = {
    theme: "light", // Default theme
};

export const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ThemeActionType.SET_THEME:
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};
