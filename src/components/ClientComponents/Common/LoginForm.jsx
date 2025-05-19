'use client'

import React from 'react';
import {Checkbox, Form, Input} from 'antd';
import {FaRegUser} from "react-icons/fa";
import ButtonFilled from "@/components/ReUseAbleComponents/CustomButton/ButtonFilled";
import Link from "next/link";
import {GoLock} from "react-icons/go";

const LoginForm = (props) => {
    const {
        form,
        setLoginModalOpen,
        onFinishLogin,
        onFinishForget,
        setLoginErrorMessage,
    } = props;
    return (
        <Form
            form={form}
            name="login"
            className={"tw-w-full tw-flex tw-flex-col tw-gap-1"}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinishLogin}
            autoComplete={"off"}
            onChange={()=>{
                setLoginErrorMessage("")
            }}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Email is not valid email!',
                    },
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input
                    prefix={<FaRegUser size={16} color={"#BBBABF"} className={"tw-me-2"}/>}
                    placeholder="Email Address"
                    className={`montserrat-regular tw-text-[12px] lg:tw-text-[16px] tw-py-2 tw-mb-0`}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
                className={`montserrat-regular tw-text-[12px] lg:tw-text-[16px]`}
            >
                <Input.Password
                    prefix={<GoLock size={18} color={"#BBBABF"} className={"tw-me-2"}/>}
                    type="password"
                    placeholder="Password"
                    rootClassName={`montserrat-regular tw-text-[12px] lg:tw-text-[16px] tw-py-2`}
                />
            </Form.Item>
            <Form.Item>
                <div className={`tw-flex tw-items-center tw-justify-between`}>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox rootClassName={'montserrat-regular tw-text-[12px] lg:tw-text-[16px]'}>Remember me</Checkbox>
                    </Form.Item>
                    <Link
                        href={"/"}
                        className={`tw-no-underline montserrat-regular tw-text-[12px] lg:tw-text-[16px]`}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent page navigation
                            const email = form.getFieldValue('email');
                            if (email) {
                                onFinishForget(email); // Pass only the email value
                            } else {
                                setLoginErrorMessage('Please enter your email before resetting password.');
                            }
                        }}
                    >
                        Forgot password?
                    </Link>
                </div>
            </Form.Item>

            <Form.Item className={`tw-flex tw-items-center tw-justify-center`}>
                <ButtonFilled
                    htmlType={"submit"}
                    typeTheme={'theme-primary'}
                    text={'Login'}
                    height={`tw-h-[30px] md:tw-h-[35px] lg:tw-h-[40px] xl:tw-h-[45px] 2xl:tw-h-[50px]`}
                    width={`tw-w-[90px] md:tw-w-[100px] lg:tw-w-[110px] xl:tw-w-[140px] 2xl:tw-w-[244px]`}
                />
            </Form.Item>
        </Form>
    );
};
export default LoginForm;