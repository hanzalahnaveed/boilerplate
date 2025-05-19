"use client"
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/redux/Actions/ThemeActions";
import {darkTheme, lightTheme} from "@/assets/styles/js/ThemeConfig";

const useThemeHook = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state?.ThemeReducer?.theme);

    const toggleTheme = () => {
        const newTheme = currentTheme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    // Determine the active theme based on the current state
    const theme = currentTheme === "light" ? lightTheme : darkTheme;

    return {
        theme,
        currentTheme,
        toggleTheme,
    };
};

export default useThemeHook;
