import React from "react";
import UseThemeHook from "@/customHooks/UseThemeHook";
import {Button, Spin} from 'antd';

const ButtonPrimary = (props) => {
    const {
        typeTheme,
        onClick,
        text,
        width,
        height,
        icon,
        loading,
    } = props;

    const {theme} = UseThemeHook();

    return (
        <>
            {
                typeTheme === "theme-table" ?
                    <Button
                        onClick={onClick}
                        className={`arial-bold tw-text-[12px] sm:tw-text-[12px] md:tw-text-[14px] lg:tw-text-[16px] xl:tw-text-[16px] 2xl:tw-text-[18px] tw-border-2 tw-rounded-t-md tw-rounded-b-none tw-z-20 tw-border-[#CACFD5]`}
                        style={{
                            width: width,
                            height: height,
                            borderColor: "#CACFD5",
                            borderBottomColor: "#FFFFFF",
                            color: "black"
                        }}
                    >
                        {text}
                    </Button>
                    :
                    <Button
                        onClick={onClick}
                        disabled={loading ? loading : null}
                        className={`custom-button-filled arial-medium tw-text-[12px] sm:tw-text-[12px] md:tw-text-[14px] lg:tw-text-[16px] xl:tw-text-[16px] 2xl:tw-text-[16px] tw-rounded-md ${loading ? "tw-border-2":"tw-border-0"} tw-border-transparent tw-px-3 tw-py-2`}
                        style={{
                            width: width,
                            height: height,
                            background:
                                loading ?
                                    theme.buttonThemeQuaternary
                                :
                                    typeTheme === "theme-primary" ?
                                        `linear-gradient(90deg, ${theme.themLinearColor1}, ${theme.themLinearColor2})`
                                        :
                                        typeTheme === "theme-secondary" ?
                                            theme.buttonThemeSecondary :
                                            theme.buttonThemePrimary
                                ,
                            color: typeTheme === "theme-primary" ? theme.textColorWhite : theme.textColorWhite
                        }}
                    >
                        {
                            icon ?
                                <div className={`tw-flex tw-justify-between tw-items-center tw-w-full`}>
                                    {text}
                                    {icon && <span style={{marginLeft: '3px'}}>{icon}</span>}
                                </div>
                                :
                                <>
                                    {
                                        loading ?
                                            <>
                                                <Spin size="default" className={`tw-text-black`}/>
                                            </>
                                            :
                                            <>
                                                {text}
                                            </>
                                    }
                                </>
                        }

                    </Button>
            }
        </>
    );
};

export default ButtonPrimary;
