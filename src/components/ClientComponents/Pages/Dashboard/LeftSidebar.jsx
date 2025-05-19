'use client'
import React, {useEffect, useState} from "react";
import UseThemeHook from "@/customHooks/UseThemeHook";
import LogoWhite from "@/assets/images/logo/logo-white.png";
import Image from "next/image";
import IconLogout from "@/assets/icons/icon-logout.svg";
import {usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout, setUserModules} from "@/redux/Actions/LoginActions";
import Link from "next/link";
import {useRouter} from 'nextjs-toploader/app';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {Get} from "@/axios/Get";
import {AUTHENTICATION_ENDPOINTS} from "@/axios/EndPoints";
import SidebarLoader from "@/components/ReUseAbleComponents/CustomLoaders/SideBarLoader/SidebarLoader";
import {dashboardLefSidebarConfig} from "@/utils/configuration/dashboardLefSidebarConfig";
import IconSupport from "@/assets/icons/icon-support.svg";

const LeftSidebar = () => {
    const UserData = useSelector((state) => state?.LoginReducer);
    // console.log("UserData on left sidebar is >>>>", UserData)

    const {theme} = UseThemeHook();
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();

    const [sideMenu, setSidebarMenu] = useState([]);
    // console.log("Side menu >>>", sideMenu)
    const [loading, setLoading] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(null);

    const getSidebarMenu = () => {
        setLoading(true);
        Get(AUTHENTICATION_ENDPOINTS.GET_SIDEBAR_MENU_NEW, true, UserData?.token, dispatch, "")
            .then((response) => {
                // console.log("response from api is >>>", response?.data?.data?.modules);
                setSidebarMenu(response?.data?.data?.sidebar || [])
                dispatch(setUserModules(response?.data?.data?.sidebar))
                setLoading(false);
            })
            .catch((error) => {
                console.log("error while getting sidebar menu: ", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (UserData?.token) {
            setLoading(true);
            const timer = setTimeout(() => {
                getSidebarMenu();
                setLoading(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleDropdown = (menuName) => {
        setOpenDropdown(openDropdown === menuName ? null : menuName);
    };

    const renderLinkSideBar = (link, icon, name) => {
        const isActive = pathname.startsWith(link);
        return (
            <Link
                href={link}
            >
                <div className={`tw-flex tw-flex-row tw-justify-start tw-gap-2 tw-items-center`}>
                    {
                        icon &&
                        <>
                            <Image
                                priority={true}
                                src={dashboardLefSidebarConfig[icon]?.icon}
                                height={40}
                                width={40}
                                className={`tw-w-[20px] 2xl:tw-w-[40px] tw-h-[20px] 2xl:tw-h-[40px]`}
                                alt="icon"
                            />
                        </>
                    }

                    <div
                        className={`tw-text-[12px] 2xl:tw-text-[16px] tw-text-white ${isActive ? "montserrat-bold" : "montserrat-regular"}`}
                    >
                        {name}
                    </div>
                </div>
            </Link>
        )
    }

    const renderLinkSideBarWithDropdown = (icon, name, childLinks) => {
        const isOpen = openDropdown === name;
        return (
            <>
                <div
                    className={`tw-flex tw-flex-row tw-justify-between tw-items-center tw-pe-0 2xl:tw-pe-4`}
                    role={"button"}
                    onClick={() => handleToggleDropdown(name)}
                >
                    <div className={`tw-flex tw-flex-row tw-justify-start tw-gap-2 tw-items-start 2xl:tw-items-center`}>
                        <Image
                            priority={true}
                            src={dashboardLefSidebarConfig[icon]?.icon}
                            height={40}
                            width={40}
                            className={`tw-w-[20px] 2xl:tw-w-[40px] tw-h-[20px] 2xl:tw-h-[40px]`}
                            alt="icon"
                        />
                        <div
                            className={`tw-text-[12px] 2xl:tw-text-[16px] tw-text-white`}
                        >
                            {name}
                        </div>
                    </div>
                    <div>
                        {isOpen ? <FaAngleUp color={"#FFFFFF"} size={15}/> : <FaAngleDown color={"#FFFFFF"} size={15}/>}
                    </div>
                </div>
                {isOpen && (
                    <div className="tw-ms-3 tw-flex tw-flex-col tw-gap-2">
                        {childLinks?.map((child, index) => (
                            <React.Fragment key={child?.id}>
                                {renderLinkSideBar(child?.route, child?.icon, child?.sidebar_name)}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </>
        )
    }

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <>
            <div
                className="tw-h-screen tw-flex tw-flex-col tw-justify-between tw-gap-10 tw-px-3 tw-py-5 tw-w-[150px] 2xl:tw-w-[277px] tw-overflow-y-auto no-scrollbar"
                style={{
                    background: `linear-gradient(90deg, ${theme.themLinearColor1}, ${theme.themLinearColor2})`,
                }}
            >
                <div className={`tw-flex tw-flex-col tw-gap-10`}>
                    <Image
                        priority={true}
                        src={LogoWhite}
                        className={`tw-h-[20px] tw-w-[140px] sm:tw-h-[17px] sm:tw-w-[120px] md:tw-h-[26px] md:tw-w-[180px] lg:tw-h-[32px] lg:tw-w-[227px]`}
                        alt="logo"
                    />
                    <div className={`tw-flex tw-flex-col tw-gap-3`}>
                        {
                            loading ?
                                <>
                                    <div className={`tw-w-full`}>
                                        <SidebarLoader/>
                                    </div>
                                </>
                                :
                                <>
                                    {
                                        sideMenu && sideMenu?.length > 0 &&
                                        <>
                                            {
                                                sideMenu?.map((menu, index) => (
                                                    <React.Fragment key={menu?.id}>
                                                        {
                                                            menu?.is_menu === 1 &&
                                                            <>
                                                                {menu?.children?.length > 0
                                                                    ? renderLinkSideBarWithDropdown(menu?.icon, menu?.sidebar_name, menu?.children)
                                                                    : renderLinkSideBar(menu?.route, menu?.icon, menu?.sidebar_name)}
                                                            </>
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                        </>
                                    }

                                </>
                        }

                    </div>
                </div>
                <div className={`tw-flex tw-flex-col tw-gap-2`}>
                    <Link
                        href={`/dashboard/support`}
                    >
                        <div className={`tw-flex tw-flex-row tw-justify-start tw-gap-2 tw-items-center`}>
                            <Image
                                priority={true}
                                src={IconSupport}
                                height={40}
                                width={40}
                                className={`tw-w-[20px] 2xl:tw-w-[40px] tw-h-[20px] 2xl:tw-h-[40px]`}
                                alt="icon"
                            />
                            <div
                                className={`tw-text-[12px] 2xl:tw-text-[16px] tw-text-white ${pathname.startsWith(`/dashboard/support`) ? "montserrat-bold" : "montserrat-regular"}`}
                            >
                                Support
                            </div>
                        </div>
                    </Link>
                    <div
                        className={`tw-flex tw-flex-row tw-justify-start tw-gap-2 tw-items-center`}
                        role={'button'}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                    >
                        <Image
                            priority={true}
                            src={IconLogout}
                            height={40}
                            width={40}
                            className={`tw-w-[20px] 2xl:tw-w-[40px] tw-h-[20px] 2xl:tw-h-[40px]`}
                            alt="icon"
                        />
                        <div
                            className={`tw-text-[12px] 2xl:tw-text-[16px] tw-text-white montserrat-regular`}
                        >
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftSidebar