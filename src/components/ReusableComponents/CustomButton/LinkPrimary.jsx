import React from "react";
import UseThemeHook from "@/customHooks/UseThemeHook";
import Link from "next/link";

const LinkPrimary = (props) => {
    const {
        typeTheme,
        href,
        text,
        width,
        height,
        icon,
        target
    } = props;

    const { theme } = UseThemeHook();

    return (
        <Link
            target={target ? target : null}
            href={href}
            className={`custom-button-filled arial-regular tw-text-[12px] sm:tw-text-[12px] md:tw-text-[14px] lg:tw-text-[16px] xl:tw-text-[16px] 2xl:tw-text-[18px] tw-rounded-md tw-border-0 tw-border-transparent tw-px-2 tw-py-1`}
            style={{
                width: width,
                height: height,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    typeTheme === "theme-primary"
                        ? `linear-gradient(90deg, ${theme.themLinearColor1}, ${theme.themLinearColor2})`
                        : typeTheme === "theme-secondary"
                        ? theme.buttonThemeSecondary
                        : theme.buttonThemePrimary,
                color: theme.textColorWhite,
                textAlign: "center",
            }}
        >
            {icon ? (
                <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-p-2 ">
                    {text}
                    {icon && <span style={{ marginLeft: "3px" }}>{icon}</span>}
                </div>
            ) : (
                <div className="tw-w-full tw-flex tw-justify-center tw-items-center">
                    {text}
                </div>
            )}
        </Link>
    );
};

export default LinkPrimary;
