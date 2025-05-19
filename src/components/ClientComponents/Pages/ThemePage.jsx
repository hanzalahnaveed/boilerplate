"use client"
import React from 'react'
import Link from "next/link";
import UseThemeHook from "@/customHooks/UseThemeHook";
import ThemeToggle from "@/components/ClientComponents/Common/ThemeToggle";

const ThemePage = () => {
    const {theme} = UseThemeHook();

    return (
        <>
            <div
                className="tw-h-screen tw-w-screen tw-flex tw-flex-col tw-items-center tw-justify-center"
                style={{ backgroundColor: theme.themeBackgroundColor }}
            >
                <ThemeToggle/>
                <div className={"inter-bold tw-text-[40px]"} style={{ color: theme.themeTextColor }}>Theme</div>
                <Link href="/">Home</Link>
            </div>
        </>
    )
}

export default ThemePage