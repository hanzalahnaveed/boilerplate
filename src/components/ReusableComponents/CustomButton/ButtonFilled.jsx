"use client";

import React from "react";
import UseThemeHook from "@/customHooks/UseThemeHook";
import {Button, Spin} from 'antd';

const ButtonFilled = (props) => {
    const {
        htmlType,
        typeTheme,
        text,
        onClick,
        height,
        width,
        loading
    } = props;

    const {theme} = UseThemeHook();

    return (
        <>
            <Button
                htmlType={htmlType ? htmlType : "button"}
                // className={`arial-bold tw-text-[20px] tw-rounded-2 tw-border-0 tw-outline-none ${height} ${width} `}
                className={`custom-button-filled arial-bold tw-text-[12px] sm:tw-text-[12px] md:tw-text-[14px] lg:tw-text-[14px] xl:tw-text-[16px] 2xl:tw-text-[18px] tw-rounded-md tw-border-0 tw-border-transparent ${height} ${width}`}
                onClick={onClick}
                disabled={loading ? loading : null}
                style={{
                    background:
                        typeTheme === "theme-primary" ?
                            `linear-gradient(90deg, ${theme.themLinearColor1}, ${theme.themLinearColor2})`
                            :
                            typeTheme === "theme-secondary" ?
                                theme.buttonThemeSecondary :
                                theme.buttonThemePrimary,
                    color: typeTheme === "theme-primary" ? theme.textColorWhite : theme.textColorWhite
                }}
            >
                {
                    loading ?
                        <>
                            <Spin size="small" className={`tw-text-black`}/>
                        </>
                        :
                        <>
                            {text}
                        </>
                }
            </Button>
        </>
    );
};

export default ButtonFilled;
