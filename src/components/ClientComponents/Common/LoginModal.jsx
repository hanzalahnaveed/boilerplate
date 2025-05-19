'use client'

import React, {useState} from 'react';
import {Form, Modal} from "antd";
import {Post} from "@/axios/Post";
import {AUTHENTICATION_ENDPOINTS} from "@/axios/EndPoints";
import {setIsLogin, setToken, setUser} from "@/redux/Actions/LoginActions";
import { useRouter } from 'nextjs-toploader/app';
import Image from "next/image";
import IconLogin from "@/assets/icons/icon-logo-popup.png";
import LoginForm from "@/components/ClientComponents/Common/LoginForm";
import {useDispatch} from "react-redux";

const LoginModal = (props) => {
    const {
        loginModalOpen,
        setLoginModalOpen,
        isDashboard, //only user for dashboard routes if user is not logged in but want to access dashboard routes
    } = props;
    const dispatch = useDispatch();
    const router = useRouter()
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const handleLoginCancel = () => {
        if(isDashboard){

        } else{
        setLoginModalOpen(false);
        handleReset();

        }
    };

    const handleReset = () => {
        form.resetFields();
    };
    const onFinishLogin = (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("email", values?.email);
        formData.append("password", values?.password);

        Post(AUTHENTICATION_ENDPOINTS.LOGIN, formData, false, "", dispatch, "", true)
            .then((response) => {
                // console.log("response is >>>>", response?.data?.data)
                dispatch(setToken(response?.data?.data?.token));
                dispatch(setUser(response?.data?.data?.user));
                dispatch(setIsLogin(true));
                router.push('/dashboard/home');
                setLoginModalOpen(false);
                handleReset();
                setLoading(false);
            })
            .catch((error) => {
                // console.log("Error while logging in:",error?.response?.data?.message)
                setLoginErrorMessage(error?.response?.data?.message || "Invalid Credentials!");
                setLoading(false);
            })
    };
    const onFinishForget = (values) => {
        const formData = new FormData();
        formData.append("email", values);

        Post(AUTHENTICATION_ENDPOINTS?.FORGET_PASSWORD, formData, false, "", dispatch, "", true)
            .then((response) => {
                setLoginErrorMessage(response?.data?.message);
            })
            .catch((error) => {
                // console.log("Error while logging in:",error?.response?.data?.message)
                // setLoginErrorMessage(error?.response?.data?.message || "Invalid Credentials!");
                // setLoading(false);
            })
    };

    return (
        <>
            <Modal
                centered={true}
                closable={false}
                footer={false}
                title=""
                open={loginModalOpen}
                onCancel={handleLoginCancel}
            >
                <div
                    className={`tw-flex tw-flex-col tw-py-[2vh] lg:tw-py-[10vh] tw-gap-5 tw-items-center`}
                >
                    <Image
                        priority={true}
                        src={IconLogin}
                        className={`tw-h-[162px] tw-w-[162px]`}
                        alt="icon"
                    />
                    <div className={`tw-w-[80%]`}>
                        {
                            loginErrorMessage &&
                            <div className={`tw-text-center montserrat-regular tw-text-[12px] lg:tw-text-[16px] tw-text-[#F31212] tw-mb-3`}>{loginErrorMessage}</div>
                        }
                        <LoginForm
                            form={form}
                            setLoginModalOpen={setLoginModalOpen}
                            onFinishLogin={onFinishLogin}
                            onFinishForget={onFinishForget}
                            setLoginErrorMessage={setLoginErrorMessage}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default LoginModal;