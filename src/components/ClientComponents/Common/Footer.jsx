"use client";

import React from "react";
import {usePathname} from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import UseThemeHook from "@/customHooks/UseThemeHook";

import Logo from "@/assets/images/logo/Icon-Logo.png";
import {FaFacebookF, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

const Footer = () => {
    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith("/dashboard");

    const {theme} = UseThemeHook();

    const renderLink = (linkUrl, name) => {
        return (
            <>
                <Link
                    href={linkUrl}
                    className={`tw-no-underline montserrat-regular tw-text-[12px] sm:tw-text-[12px] md:tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px]`}
                    style={{
                        color: pathname === linkUrl ? "" : theme.themeTextColor,
                    }}
                >
                    {name}
                </Link>
            </>
        )
    }

    return (
        <>
            {
                !isDashboardRoute &&
                <>
                    <div className={``}>
                        <div
                            className={`tw-pt-20 tw-pb-10`}
                            style={{backgroundColor: theme.themeBackgroundColor, color: theme.themeTextColor}}
                        >
                            <div
                                className={`tw-w-full tw-h-full tw-flex tw-items-start tw-justify-between tw-px-4 sm:tw-px-8 md:tw-px-12 lg:tw-px-16 xl:tw-px-20`}
                            >
                                <div
                                    className={`tw-flex tw-flex-col sm:tw-flex-row tw-items-start tw-gap-4 sm:tw-gap-8 md:tw-gap-12 lg:tw-gap-16 xl:tw-gap-20`}>
                                    <Link href={"/"}>
                                        <Image
                                            priority={true}
                                            src={Logo}
                                            className={`tw-h-[58px] tw-w-[58px]`}
                                            alt="logo"
                                        />
                                    </Link>
                                    <div
                                        className={`tw-w-full sm:tw-w-[30%] md:tw-w-[50%] lg:tw-w-[45%] xl:tw-w-[40%] tw-flex tw-flex-col tw-items-start tw-gap-4 sm:tw-gap-6 md:tw-gap-8 lg:tw-gap-10`}>
                                        <div className={`tw-flex tw-flex-row tw-items-center tw-gap-3`}>
                                            <FaFacebookF size={20}/>
                                            <FaXTwitter size={20}/>
                                            <FaInstagram size={20}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tw-flex tw-flex-row tw-items-center tw-gap-10`}>
                                    <div className={`tw-flex tw-flex-col tw-gap-2`}>
                                        <div
                                            className={`arial-bold tw-text-[14px] sm:tw-text-[15px] md:tw-text-[16px] lg:tw-text-[18px] xl:tw-text-[20px]`}>Heading
                                        </div>
                                        <div className={`tw-flex tw-flex-col tw-gap-3`}>
                                            {renderLink("/", "Home")}
                                            {renderLink("/about", "About Us")}
                                            {renderLink("/what-we-do", "What We do")}
                                            {renderLink("/services", "Services")}
                                            {renderLink("/contact-us", "Contact us")}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={` tw-flex tw-items-center tw-justify-center tw-px-20 tw-pt-10 montserrat-regular tw-text-[16px]`}>
                                Global Travel Technologies - GTT {new Date().getFullYear()} © All Rights Reserved

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default Footer;
