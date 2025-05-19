import {ThemeActionType} from "../Constants/ThemeActionType.js";

export const setTheme = (theme) => {
    return {
        type: ThemeActionType.SET_THEME,
        payload: theme,
    };
};