"use client";

import React, {useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {Form, message, Modal} from 'antd';
import UseThemeHook from "@/customHooks/UseThemeHook";
import { GENERAL_REQUESTS_ENDPOINTS } from "@/axios/EndPoints";
import LogoLight from "@/assets/images/logo/logo-light.png";
import LogoDark from "@/assets/images/logo/logo-dark.png";
import ButtonFilled from "@/components/ReUseAbleComponents/CustomButton/ButtonFilled";
import {Post} from "@/axios/Post";
import RegisterDemoModal from "./RegisterDemoModal";
import LoginModal from "@/components/ClientComponents/Common/LoginModal";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/redux/Actions/LoginActions";
import {useRouter} from "nextjs-toploader/app";

const NavBar = () => {
    const dispatch = useDispatch();
    const UserData = useSelector((state) => state?.LoginReducer);
    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith("/dashboard");
    const {theme, currentTheme} = UseThemeHook();
    const router = useRouter();
    const isDarkMode = currentTheme === "dark";
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [requestDemoModalOpen, setRequestDemoModalOpen] = useState(false);

    const handleLogin = () => {
        setLoginModalOpen(true);
    }
    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
    }
    const handleNavigateDashboard = () => {
        router.push('/dashboard/home');
    }
    const handleRegister = () => {
        setRequestDemoModalOpen(true);
    }
    const handleRegistrationSubmit = async() => {
        try {
            setLoading(true);
            let endpoint = GENERAL_REQUESTS_ENDPOINTS.CREATE_GENERAL_REQUEST;
            const values = await form?.validateFields();
            const formData = {
                first_name: values?.firstName,
                last_name: values?.lastName,
                email: values?.email,
                phone_number: values?.phoneNumber,
                company: values?.companyName,
                position: values?.position,
                type: 0,    // 0 for register && 1 for the  demo
            }  
            Post(endpoint, formData, true, UserData?.token, dispatch, "", false)
                .then((response) => {
                    form.resetFields(); // Clear the form
                    setLoading(false);
                    setRequestDemoModalOpen(false);
                    message.success(response?.data?.message);
                })
                .catch((error) => {
                    console.log("Error while sending request:", error?.response?.data);
                });
        } catch (error) {
            console.error("Validation Failed:", error);
            message.error("Please fill all required fields.");
        }
    }

    const renderLink = (linkUrl, name) => {
        return (<>
            <Link
                href={linkUrl}
                className={`tw-no-underline tw-text-[12px] sm:tw-text-[12px] md:tw-text-[14px] lg:tw-text-[16px] xl:tw-text-[18px] 2xl:tw-text-[20px] ${pathname === linkUrl ? "montserrat-medium gradient-text" : "montserrat-regular"}`}
                style={{
                    color: pathname === linkUrl ? "" : theme.themeTextColor,
                    position: "relative",
                    display: "inline-block",
                }}
            >
                {name}
                {pathname === linkUrl && (<span
                    style={{
                        display: "block",
                        width: "32px",
                        height: "6px", // backgroundColor: theme.themeActiveLink,
                        background: `linear-gradient(90deg, ${theme.themLinearColor1}, ${theme.themLinearColor2})`,
                        borderRadius: "9999px",
                        position: "absolute",
                        bottom: "-8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                ></span>)}
            </Link>
        </>)
    }

    return (<>
        {!isDashboardRoute && <>
            <div className={``}>
                <nav
                    // className="tw-h-20 tw-sticky tw-top-0 tw-z-10"
                    className="tw-h-20"
                    style={{backgroundColor: theme.themeBackgroundColor}}
                >
                    <div
                        className={`tw-w-full tw-h-full tw-flex tw-items-center tw-justify-between tw-px-4 sm:tw-px-6 md:tw-px-8 lg:tw-px-12`}
                        style={{color: theme.themeTextColor}}
                    >
                        <Link href={"/"}>
                            <Image
                                priority={true}
                                src={isDarkMode ? LogoDark : LogoLight}
                                // width={87}
                                // height={37}
                                // className={`tw-h-[28px]  tw-w-[198px]`}
                                className={`tw-h-[20px] tw-w-[140px] sm:tw-h-[20px] sm:tw-w-[120px] md:tw-h-[24px] md:tw-w-[180px] lg:tw-h-[28px] lg:tw-w-[198px]`}
                                alt="logo"
                            />
                        </Link>
                        <div
                            className={`tw-flex tw-flex-row tw-items-center tw-gap-2 sm:tw-gap-4 md:tw-gap-6 lg:tw-gap-10`}>
                            {renderLink("/", "Home")}
                            {renderLink("/about", "About Us")}
                            {renderLink("/what-we-do", "What We do")}
                            {renderLink("/services", "Services")}
                            {renderLink("/contact-us", "Contact us")}
                        </div>
                        <div
                            className={`tw-flex tw-flex-row tw-items-center tw-gap-1 sm:tw-gap-2 md:tw-gap-3 lg:tw-gap-3 xl:tw-gap-3 2xl:tw-gap-5`}>
                            {
                                UserData?.isLogin && UserData?.token ?
                                    <>
                                        <ButtonFilled
                                            typeTheme={'theme-primary'}
                                            text={'Dashboard'}
                                            onClick={handleNavigateDashboard}
                                            height={`tw-h-[30px] md:tw-h-[35px] lg:tw-h-[40px] xl:tw-h-[45px] 2xl:tw-h-[50px]`}
                                            width={`tw-w-[90px] md:tw-w-[100px] lg:tw-w-[110px] xl:tw-w-[140px] 2xl:tw-w-[175px]`}
                                        />
                                        <ButtonFilled
                                            typeTheme={'theme-secondary'}
                                            text={'Logout'}
                                            onClick={handleLogout}
                                            height={`tw-h-[30px] md:tw-h-[35px] lg:tw-h-[40px] xl:tw-h-[45px] 2xl:tw-h-[50px]`}
                                            width={`tw-w-[90px] md:tw-w-[100px] lg:tw-w-[110px] xl:tw-w-[140px] 2xl:tw-w-[175px]`}
                                        />
                                    </>
                                    :
                                    <>
                                        <ButtonFilled
                                            typeTheme={'theme-primary'}
                                            text={'Login'}
                                            onClick={handleLogin}
                                            height={`tw-h-[30px] md:tw-h-[35px] lg:tw-h-[40px] xl:tw-h-[45px] 2xl:tw-h-[50px]`}
                                            width={`tw-w-[90px] md:tw-w-[100px] lg:tw-w-[110px] xl:tw-w-[140px] 2xl:tw-w-[175px]`}
                                        />
                                        <ButtonFilled
                                            typeTheme={'theme-secondary'}
                                            text={'Register'}
                                            onClick={handleRegister}
                                            height={`tw-h-[30px] md:tw-h-[35px] lg:tw-h-[40px] xl:tw-h-[45px] 2xl:tw-h-[50px]`}
                                            width={`tw-w-[90px] md:tw-w-[100px] lg:tw-w-[110px] xl:tw-w-[140px] 2xl:tw-w-[175px]`}
                                        />
                                    </>
                            }

                        </div>
                    </div>
                </nav>
            </div>
            {
                loginModalOpen &&
                <LoginModal
                    loginModalOpen={loginModalOpen}
                    setLoginModalOpen={setLoginModalOpen}

                />
            }
            {
                requestDemoModalOpen &&
                <RegisterDemoModal
                    title={"Registration Form"}
                    form={form}
                    loading={loading}
                    registerDemoModalOpen={requestDemoModalOpen}
                    setRegisterDemoModalOpen={setRequestDemoModalOpen}
                    onFinish={handleRegistrationSubmit}
                />
            }
        </>}
    </>);
};

export default NavBar;
