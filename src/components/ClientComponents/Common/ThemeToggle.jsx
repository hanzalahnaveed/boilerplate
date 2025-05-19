"use client"
import React from 'react'
import { Switch } from 'antd';
import UseThemeHook from "@/customHooks/UseThemeHook";

const ThemeToggle = () => {
    const { theme, currentTheme, toggleTheme } = UseThemeHook();

    const isDarkMode = currentTheme === "dark";

    return (
        <>
            <Switch
                checked={isDarkMode}
                checkedChildren="Light"
                unCheckedChildren="Dark"
                onClick={toggleTheme}
            />
        </>
    )
}

export default ThemeToggle