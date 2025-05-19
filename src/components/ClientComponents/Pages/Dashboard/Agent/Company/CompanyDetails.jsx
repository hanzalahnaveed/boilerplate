"use client";
import React, {useEffect, useState} from "react";
import UseThemeHook from "@/customHooks/UseThemeHook";
import {useDispatch, useSelector} from "react-redux";
import DashboardHeaderWithUserInfo from "@/components/ClientComponents/Common/DashboardHeaderWithUserInfo";
import NotesCard from "@/components/ReUseAbleComponents/CustomCards/NotesCard";
import {useParams} from "next/navigation";
import CounterWithIconCard from "@/components/ReUseAbleComponents/DashboardComponents/CounterWithIconCard";
import {TbCalendarStats} from "react-icons/tb";
import {RiExchangeDollarLine} from "react-icons/ri";
import Image from "next/image";
import IconBookingValues from "@/assets/icons/icon-booking-values.svg";
import IconSales from "@/assets/icons/icon-sales.svg";
import {Table, Form, Modal, message} from "antd";
import ProfileCard from "@/components/ReUseAbleComponents/DashboardComponents/ProfileCard";
import DetailsCard from "@/components/ReUseAbleComponents/DashboardComponents/DetailsCard";
import Link from "next/link";
import {FaUser} from "react-icons/fa";
import {formatNumber} from "@/utils/formatNumber";
import {AiOutlineEye} from "react-icons/ai";
import LinkSecondary from "@/components/ReUseAbleComponents/CustomButton/LinkSecondary";
import {useRouter} from "nextjs-toploader/app";
import {Get} from "@/axios/Get";
import IconView from "@/assets/icons/icon-view.svg";
import IconFileUpload from "@/assets/icons/icon-file-upload.svg";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import {DOCUMENTS_BASE_URL, COMPANY_ENDPOINTS, PAYMENT_ENDPOINTS} from "@/axios/EndPoints";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import {formatDate} from "@/utils/dateHelper";
import {HiDownload} from "react-icons/hi";
import {truncateFileName} from "@/utils/truncateFileName";
import ButtonPrimary from "@/components/ReUseAbleComponents/CustomButton/ButtonPrimary";
import AddNoteModal from "@/components/ReUseAbleComponents/CustomModals/AddNoteModal";
import HorizontalLine from "@/components/ReUseAbleComponents/Lines/HorizontalLine";
import {TiAttachmentOutline} from "react-icons/ti";
import {Post} from "@/axios/Post";
import {Put} from "@/axios/Put";
import CompanyFinancialTabs from "@/components/ClientComponents/Pages/Dashboard/Agent/Company/CompanyFinancialTabs";

const CompanyDetails = () => {
    const {theme} = UseThemeHook();
    const dispatch = useDispatch();
    const router = useRouter();
    const UserData = useSelector((state) => state?.LoginReducer);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [companyDetails, setCompanyDetails] = useState(null);
    // console.log("company details >>>", companyDetails)
    const [companyAgents, setCompanyAgents] = useState([]);
    const [companyStats, setCompanyStats] = useState(null);
    const [companyNotes, setCompanyNotes] = useState([]);
    const [companyNoteLoading, setCompanyNoteLoading] = useState(false);
    const [statementOfAccount, setStatementOfAccount] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDescriptionModal, setIsDescriptionModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [notesPage, SetNotesPage] = useState(1);
    const notesLimit = 6;

    const titleClass = "arial-bold tw-text-[22px] lg:tw-text-[24px] xl:tw-text-[26px] tw-text-[#231F20]"
    const headingClass = "arial-bold tw-text-[20px] tw-text-[#231F20]";
    const labelClass = "arial-bold tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px] tw-text-[#231F20]"
    const dataClassMedium = "montserrat-medium tw-text-[16px] tw-text-[#231F20]"
    const dataClass = "montserrat-regular tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px] tw-text-[#231F20]"

    const getCompanyDetails = () => {
        let endpoint = COMPANY_ENDPOINTS.GET_COMPANY_BY_ID;
        endpoint = endpoint.replace("__COMPANY_ID__", params?.id);
        Get(endpoint, true, UserData?.token, dispatch, "")
            .then((response) => {
                setCompanyDetails(response?.data?.data || null);
            })
            .catch((error) => {
                console.log("error while getting company's details: ", error);
            });
    };
    const getCompanyStats = () => {
        let endpoint = COMPANY_ENDPOINTS.COMPANY_STATS;
        endpoint = endpoint.replace("__COMPANY_ID__", params?.id);
        Get(endpoint, true, UserData?.token, dispatch, "")
            .then((response) => {
                setCompanyStats(response?.data?.data || null);
            })
            .catch((error) => {
                console.log("error while getting company's stats: ", error);
            });
    };
    const getCompanyAgents = () => {
        let endpoint = COMPANY_ENDPOINTS.GET_COMPANY_AGENTS;
        endpoint = endpoint.replace("__COMPANY_ID__", params?.id);
        Get(
            endpoint + `?page=${1}&limit=${10}`,
            true,
            UserData?.token,
            dispatch,
            ""
        )
            .then((response) => {
                setCompanyAgents(response?.data?.data?.users);
            })
            .catch((error) => {
                console.log("error while getting company's details: ", error);
            });
    };
    const getCompanyStatementOfAccount = () => {
        setLoading(true);
        let endpoint = PAYMENT_ENDPOINTS.GET_STATEMENT_OF_ACCOUNT;
        Get(endpoint + `?company_id=${companyDetails?.company_id}&page=1&limit=5`, true, UserData?.token, dispatch, "")
            .then((response) => {
                setStatementOfAccount(response?.data?.data?.statement || []);
                // setTransactionsPagination(response?.data?.data?._metadata);
                setLoading(false);
            })
            .catch((error) => {
                console.log("error while getting all transactions: ", error);
                setLoading(false);
            });
    }
    const getCompanyInvoices = () => {
        let endpoint = PAYMENT_ENDPOINTS.GET_INVOICES;
        Get(endpoint + `?company_id=${companyDetails?.company_id}&page=1&limit=5`, true, UserData?.token, dispatch, "")
            .then((response) => {
                setInvoiceList(response?.data?.data?.invoice || []);
                // setTransactionsPagination(response?.data?.data?._metadata);
            })
            .catch((error) => {
                console.log("error while getting all transactions: ", error);
            });
    }

    const getCompanyNotes = () => {
        let endpoint = COMPANY_ENDPOINTS.GET_COMPANY_NOTES
        endpoint = endpoint.replace("__COMPANY_ID__", params?.id);

        setCompanyNoteLoading(true);
        Get(endpoint + `?page=${notesPage}&limit=${notesLimit}`, true, UserData?.token, dispatch, "")
            .then((response) => {
                setCompanyNotes(response?.data?.data?.userNotes || null);
                setCompanyNoteLoading(false);
            })
            .catch((error) => {
                console.log("error while getting customer's notes: ", error);
                setCompanyNoteLoading(false);
            });
    };

    useEffect(() => {
        if (params?.id) {
            getCompanyDetails();
            getCompanyAgents();
            getCompanyNotes();
            const timer = setTimeout(() => {
                getCompanyStats();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (companyDetails) {
            getCompanyStatementOfAccount();
            getCompanyInvoices();
        }
    }, [companyDetails]);

    const handleEditModalOk = async () => {
        try {
            const values = await form?.validateFields();
            const formData = {
                name: values?.companyName,
                legal_name: values?.companyLegalName,
                ntn_no: values?.companyNTN,
                sec_reg_no: values?.companySecRegNo,
                email: values?.companyEmail,
                phone: values?.companyPhone,
                about: values?.companyAbout,
                website: values?.companyWebsite
            };
            let endpoint = COMPANY_ENDPOINTS.EDIT_COMPANY_DETAILS;
            endpoint = endpoint.replace("__COMPANY_ID__", companyDetails?.company_id);
            Put(endpoint, formData, true, UserData?.token, dispatch, "", false)
                .then((response) => {
                    getCompanyDetails();
                })
                .catch((error) => {
                    console.log(
                        "Error while editing company details:",
                        error?.response?.data
                    );
                });
        } catch (error) {
            // message.error('Please complete all required fields.');
            // toast.error('Please complete all required fields.');
            console.log("Please complete all required fields.");
        }
    };
    const handleAddressModalOk = async () => {
        try {
            const values = await form?.validateFields();
            const formData = {
                complete_address: values?.completeAddress,
                city: values?.city,
                state: values?.state,
                country: values?.country,
                zipcode: values?.zip
            };
            let endpoint = COMPANY_ENDPOINTS.EDIT_COMPANY_ADDRESS_DETAILS;
            endpoint = endpoint.replace("__COMPANY_ID__", companyDetails?.company_id);
            Put(endpoint, formData, true, UserData?.token, dispatch, "", false)
                .then((response) => {
                    getCompanyDetails();
                })
                .catch((error) => {
                    console.log(
                        "Error while editing company address:",
                        error?.response?.data
                    );
                });
        } catch (error) {
            // message.error('Please complete all required fields.');
            // toast.error('Please complete all required fields.');
            console.log("Please complete all required fields.");
        }
    };

    const handleFinancialModalOk = async () => {
        try {
            const values = await form?.validateFields();
            const formData = {
                preferred_payment_method: values?.preferredPaymentMethod,
                account_title: values?.accountTitle,
                bank_name: values?.bankName,
                account_iban_number: values?.ibanNumber,
                swift_code: values?.swiftCode,
            };
            let endpoint = COMPANY_ENDPOINTS.EDIT_COMPANY_FINANCIAL_DETAILS;
            endpoint = endpoint.replace("__COMPANY_ID__", companyDetails?.company_id);
            Put(endpoint, formData, true, UserData?.token, dispatch, "", false)
                .then((response) => {
                    getCompanyDetails();
                })
                .catch((error) => {
                    console.log(
                        "Error while editing company details:",
                        error?.response?.data
                    );
                });
        } catch (error) {
            // message.error('Please complete all required fields.');
            // toast.error('Please complete all required fields.');
            console.log("Please complete all required fields.");
        }
    };

    const handlePackagesModalOk = async () => {
        try {
            const values = await form?.validateFields();
            const formData = {
                payment_relation: values?.paymentRelation,
                credit_amount: values?.creditAmount,
                low_credit_warning_type: values?.warningType,
                warning_value: values?.warningValue,
                payment_frequency: values?.paymentFrequency,
                payment_due_after: values?.dueAfter,
                default_currency: values?.currency,
            };
            let endpoint = COMPANY_ENDPOINTS.EDIT_COMPANY_PACKAGES_DETAILS;
            endpoint = endpoint.replace("__COMPANY_ID__", companyDetails?.company_id);
            Put(endpoint, formData, true, UserData?.token, dispatch, "", false)
                .then((response) => {
                    getCompanyDetails();
                })
                .catch((error) => {
                    console.log(
                        "Error while editing company address:",
                        error?.response?.data
                    );
                });
        } catch (error) {
            // message.error('Please complete all required fields.');
            // toast.error('Please complete all required fields.');
            console.log("Please complete all required fields.");
        }
    };

    const handleActionBlockUnblock = (user, action, note) => {
        let data = {note: note};
        let endpoint =
            action === "block"
                ? COMPANY_ENDPOINTS.BLOCK_COMPANY
                : COMPANY_ENDPOINTS.UN_BLOCK_COMPANY;
        endpoint = endpoint.replace("__COMPANY_ID__", params?.id);
        Put(endpoint, data, true, UserData?.token, dispatch, "", false)
            .then((response) => {
                console.log("response is:",response)
                // toast?.success(response?.data?.message);
                // toast?.success("Success!");
                getCompanyDetails();
                getCompanyNotes();
            })
            .catch((error) => {
                console.log("Error while blocking or unblocking agent:",error?.response);
            });
    };

    const agentColumns = [
        {
            title: <span className={`${labelClass}`}>Agent Name</span>,
            dataIndex: "name",
            key: "name",
            width: 300,
            render: (_, data) => (
                <div
                    className={`tw-flex tw-flex-row tw-items-center tw-gap-1 tw-flex-wrap`}
                >
                    <FaUser color={"#5F606B"} size={25}/>
                    <div
                        className={`${dataClass} tw-text-nowrap`}
                    >
                        {data?.name}
                    </div>
                    {data?.title_name && (
                        <>
                            <div
                                className={`${dataClass} tw-text-nowrap`}
                            >
                                ({data?.title_name})
                            </div>
                        </>
                    )}
                </div>
            )
        },
        {
            title: <span className={`${labelClass}`}>Location</span>,
            dataIndex: "location",
            key: "location",
            width: 400,
            render: (location) => (
                <div className={`${dataClass}`}>
                    {location?.city} {location?.state} {location?.country}
                </div>
            )
        },
        {
            title: <span className={`${labelClass}`}>Matured Bookings</span>,
            dataIndex: "mature_booking",
            key: "mature_booking",
            width: 200,
            render: (mature_booking) => (
                <div
                    className={`${dataClass} montserrat-bold tw-text-[#45BB8F] tw-text-right`}
                >
                    {formatNumber(mature_booking)}
                </div>
            )
        },
        {
            title: <span className={`${labelClass}`}>No of Bookings</span>,
            dataIndex: "number_of_booking",
            key: "number_of_booking",
            width: 200,
            render: (number_of_booking) => (
                <div
                    className={`${dataClass} montserrat-bold tw-text-right`}
                >
                    {formatNumber(number_of_booking)}
                </div>
            )
        },
        {
            title: <span className={`${labelClass}`}>Revenue Generated</span>,
            dataIndex: "revenue_generated",
            width: 200,
            key: "revenue_generated",
            render: (revenue_generated) => (
                <div
                    className={`${dataClass} montserrat-bold tw-text-[#D60000] tw-text-right`}
                >
                    {formatNumber(revenue_generated)}
                </div>
            )
        },
        {
            title: <span className={`${labelClass}`}>Actions</span>,
            key: "actions",
            width: 200,
            render: (data) => (
                <>
                    <div className={`tw-flex tw-flex-row tw-items-center tw-gap-2`}>
                        {/*<div*/}
                        {/*    className={`tw-flex tw-flex-row tw-items-center tw-gap-1`}*/}
                        {/*    role={"button"}*/}
                        {/*    onClick={(e) => {*/}
                        {/*        e.preventDefault();*/}
                        {/*        handleRemove(data)*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Image src={IconDelete} alt={"remove"} height={24} width={24}/>*/}
                        {/*</div>*/}
                        <div
                            className={`tw-flex tw-flex-row tw-items-center tw-gap-1`}
                            role={"button"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleView(data);
                            }}
                        >
                            <Image src={IconView} alt={"remove"} height={24} width={24}/>
                        </div>
                    </div>
                </>
            )
        }
    ];

    const handleView = (data) => {
        router.push(`/dashboard/agent/company/${params?.id}/agents/${data?.id}`);
    };

    const handleDownload = (fileName) => {
        const url = `${DOCUMENTS_BASE_URL}${fileName}`;
        fetch(url, {
            method: "GET"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob();
            })
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = blobUrl;
                anchor.download = fileName; // Set the downloaded file name
                anchor.click();
                URL.revokeObjectURL(blobUrl); // Clean up the URL object
            })
            .catch((error) => {
                console.error("Download error:", error);
            });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleModalCancel = () => {
        setIsModalVisible(false);
    };
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const values = await form.validateFields();
            const data = {
                ...values,
                attachments: fileList?.map((file) => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    file: file.originFileObj || file
                }))
            };
            const formData = new FormData();
            formData.append("title", data?.modalTitle);
            formData.append("note", data?.modalDescription);
            data?.attachments?.forEach((attachment, index) => {
                formData.append(`attachments`, attachment?.file);
            });
            let endpoint = COMPANY_ENDPOINTS.ADD_COMPANY_NOTES
            endpoint = endpoint.replace("__COMPANY_ID__", params?.id);
            Post(endpoint, formData, true, UserData?.token, dispatch, "", true)
                .then((response) => {
                    // toast.success("Note added successfully!");
                    getCompanyNotes();
                    setIsModalVisible(false);
                    setFileList([]);
                    form.resetFields();
                })
                .catch((error) => {
                    console.log("Error while adding notes:", error?.response);
                });
        } catch (error) {
            console.error("Validation Failed:", error);
            message.error("Please fill all required fields.");
        }
    };
    const handleChange = ({fileList: newFileList}) => setFileList(newFileList);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        if (file.type.startsWith("image/")) {
            const imageUrl = file.url || file.preview;
            if (imageUrl) {
                const newTab = window.open();
                newTab.document.body.innerHTML = `
            <html>
              <head>
                <style>
                  body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f0f0f0;
                  }
                  img {
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                  }
                </style>
              </head>
              <body>
                <img src="${imageUrl}" />
              </body>
            </html>
          `;
            }
        } else if (file.type === "application/pdf") {
            const pdfUrl = file.url || file.preview;
            if (pdfUrl) {
                window.open(pdfUrl, "_blank");
            }
        } else if (
            file.type === "application/msword" ||
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const docUrl = file.url || file.preview;
            if (docUrl) {
                const link = document.createElement("a");
                link.href = docUrl;
                link.download = file.name;
                link.click();
            }
        }
    };

    const handleRemoveFile = (index) => {
        const updatedFileList = fileList.filter((_, i) => i !== index);
        setFileList(updatedFileList);
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleNoteReadMoreClick = (noteDetails) => {
        setSelectedNote(noteDetails);
        setIsDescriptionModal(true);
    };

    const handleNoteModalCancel = () => {
        setIsDescriptionModal(false);
        setSelectedNote(null);
    };

    const downloadAllAttachments = (note) => {
        const {CompanyNoteAttachments} = note;
        CompanyNoteAttachments?.forEach((attachment) => {
            const fileName = attachment?.attachment;
            const url = `${DOCUMENTS_BASE_URL}${fileName}`;

            fetch(url, {
                method: "GET"
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then((blob) => {
                    const blobUrl = URL.createObjectURL(blob);
                    const anchor = document.createElement("a");
                    anchor.href = blobUrl;
                    anchor.download = fileName; // Set the downloaded file name
                    anchor.click();
                    URL.revokeObjectURL(blobUrl); // Clean up the URL object
                })
                .catch((error) => {
                    console.error("Download error:", error);
                });
        });
    };

    return (
        <>
            <div
                className={`tw-h-full tw-px-4`}
                style={{
                    // backgroundColor: theme.themeBackgroundColor,
                    color: theme.themeTextColor
                }}
            >
                <div className={"tw-pb-5"}>
                    <DashboardHeaderWithUserInfo showUserInfo={false}/>
                    <div
                        className={`tw-grid tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-pt-4 tw-gap-4 tw-h-fit`}
                    >
                        <CounterWithIconCard
                            heading={companyStats?.bookings}
                            description={"No of Bookings"}
                            icon={<TbCalendarStats size={56} color={`#327CC0`}/>}
                        />
                        <CounterWithIconCard
                            isRemainingLimit={true}
                            heading={companyStats?.total_revenue}
                            description={"Total Revenue"}
                            icon={<RiExchangeDollarLine size={56} color={`#45BB8F`}/>}
                        />
                        <CounterWithIconCard
                            isRemainingLimit={true}
                            heading={companyStats?.min_booking_value}
                            description={"Minimum Booking"}
                            icon={
                                <>
                                    <Image src={IconBookingValues} alt={"icon"}/>
                                </>
                            }
                        />
                        <CounterWithIconCard
                            isRemainingLimit={true}
                            heading={companyStats?.max_booking_value}
                            description={"Maximum Booking"}
                            icon={
                                <>
                                    <Image src={IconSales} alt={"icon"}/>
                                </>
                            }
                        />
                    </div>
                    <div
                        className={`tw-grid tw-grid-cols-4 tw-my-5 tw-px-5 tw-py-5 tw-min-h-[80vh] tw-rounded-md`}
                        style={{
                            boxShadow: "0px 0px 15px 0px #0000001A"
                        }}
                    >
                        <div className={`tw-col-span-4 lg:tw-col-span-2 xl:tw-col-span-1`}>
                            <ProfileCard
                                theme={theme}
                                data={companyDetails}
                                userType={"company"}
                                form={form}
                                handleEditModalOk={handleEditModalOk}
                                handleAddressModalOk={handleAddressModalOk}
                                handleActionBlockUnblock={handleActionBlockUnblock}
                            />
                        </div>
                        <div
                            className={`tw-col-span-4 lg:tw-col-span-2 lg:tw-px-5 xl:tw-col-span-3 tw-mt-2 lg:tw-mt-0`}
                        >
                            <div
                                className={`${titleClass}`}
                            >
                                About
                            </div>
                            <div
                                className={`${dataClass} tw-text-justify`}
                                style={{
                                    color: theme.textLightGray
                                }}
                            >
                                {companyDetails?.description}
                            </div>
                            <div>
                                <DetailsCard
                                    theme={theme}
                                    data={companyDetails}
                                    userType={"company"}
                                    form={form}
                                    handleFinancialModalOk={handleFinancialModalOk}
                                    handlePackagesModalOk={handlePackagesModalOk}
                                />
                            </div>
                            <div
                                className={`${titleClass}`}
                            >
                                Documents
                            </div>
                            <div className={`tw-w-full tw-mb-2`}>
                                <HorizontalLine theme={theme} height={2}/>
                            </div>
                            <div
                                className="tw-grid tw-grid-cols-6 md:tw-grid-cols-3 lg:tw-grid-cols-2 xl:tw-grid-cols-4 2xl:tw-grid-cols-6 tw-gap-[15px]">
                                {companyDetails?.documents.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                "tw-relative tw-w-fit tw-h-[60px] tw-border tw-border-[#BBBABF] tw-rounded-md tw-group"
                                            }
                                        >
                                            <div className={`tw-grid tw-grid-cols-3`}>
                                                <div
                                                    className={`tw-col-span-1 tw-justify-center tw-items-center`}
                                                >
                                                    <Image
                                                        src={IconFileUpload}
                                                        alt={"icon"}
                                                        className={`tw-size-[60px]`}
                                                    />
                                                </div>
                                                <div
                                                    className={`tw-col-span-2 tw-flex tw-flex-col tw-justify-center`}
                                                >
                                                    <div className={`${dataClassMedium}`}>
                                                        {truncateFileName(data?.document_type)}
                                                    </div>
                                                    <div className={`${dataClass}`}>
                                                        {formatDate(data?.created_at, "DD-MMM-YYYY")}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="tw-absolute hover:tw-bg-[#327CC026] tw-top-0 tw-left-0 tw-w-full tw-h-full tw-flex
                        tw-items-center tw-justify-center tw-gap-[10px] tw-opacity-0 group-hover:tw-opacity-100 tw-rounded-md tw-duration-300"
                                            >
                                                <Link
                                                    href={`${DOCUMENTS_BASE_URL}${data?.attachment}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-p-1 tw-shadow-md hover:tw-text-white tw-transition-all"
                                                >
                                                    <AiOutlineEye size={18} color={"#231F20"}/>
                                                </Link>
                                                <button
                                                    onClick={() => handleDownload(data?.attachment)}
                                                    className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-p-1 tw-shadow-md hover:tw-text-white tw-transition-all"
                                                >
                                                    <HiDownload size={18} color={"#231F20"}/>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={`tw-flex tw-flex-col tw-rounded-md tw-py-4 tw-my-5 tw-max-h-[1589px]`}
                        style={{
                            boxShadow: "0px 0px 15px 0px #0000001A"
                        }}>
                        <div
                            className={`tw-flex tw-flex-row tw-items-center tw-justify-between tw-px-5`}
                        >
                            <div className={`${headingClass}`}>
                                Company Agents
                            </div>
                            <LinkSecondary
                                href={`/dashboard/agent/company/${params?.id}/agents`}
                                text={"See All"}
                                width={"103px"}
                                height={"30px"}
                            />
                        </div>
                        <div className={`tw-w-full tw-my-1`}>
                            <HorizontalLine theme={theme} height={2}/>
                        </div>
                        <div className={`tw-w-full tw-px-5`}>
                            <Table
                                rowKey={(record) => record?.id}
                                columns={agentColumns}
                                dataSource={companyAgents}
                                bordered
                                rowClassName={(record, index) =>
                                    index % 2 === 0 ? "tw-bg-[#FFFFFF]" : "tw-bg-[#F4F4F4]"
                                }
                                pagination={false}
                                scroll={{
                                    x: "max-content"
                                }}
                                className="tw-w-full tw-overflow-x-auto"
                            />
                        </div>
                    </div>
                    <div className={`tw-mb-5`}>
                        <CompanyFinancialTabs
                            statementOfAccount={statementOfAccount}
                            statementOfAccountPagination={false}

                            invoiceList={invoiceList}
                            invoicePagination={false}

                            organizationId={companyDetails?.company_id}
                        />
                    </div>
                    {/* <NotesCard
                        form={form}
                        fileList={fileList}
                        setFileList={setFileList}
                        notes={companyNotes}
                        handleSave={handleSave}
                        loading={companyNoteLoading}
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                    /> */}
                    <div
                        className={`tw-flex tw-flex-col tw-rounded-md tw-py-4 tw-max-h-[1589px]`}
                        style={{
                            boxShadow: "0px 0px 15px 0px #0000001A"
                        }}
                    >
                        <div className={`tw-flex tw-px-5 tw-justify-between tw-items-center`}>
                            <div className={`${headingClass}`}>
                                All Notes
                            </div>
                            <ButtonPrimary
                                typeTheme={"theme-primary"}
                                onClick={showModal}
                                text={"Add"}
                                width={"111px"}
                                height={"33px"}
                                size={"16px"}
                            />
                        </div>
                        <div className={`tw-w-full tw-mt-1 tw-mb-2`}>
                            <HorizontalLine theme={theme} height={2}/>
                        </div>
                        <div
                            className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-auto-rows-auto tw-px-5 tw-gap-[10px]">
                            {companyNotes?.map((note, id) => (
                                <div
                                    key={id}
                                    className={`tw-flex tw-flex-col tw-justify-between tw-rounded-md tw-border-l-8 ${(note?.title === "New Status 2" || note?.title === "New Status 1") ? `tw-border-[#D60000]` : `tw-border-[#327CC0]` } tw-shadow-sm tw-p-4 tw-min-h-[150px] tw-text-justify`}
                                    style={{
                                        boxShadow: "0px 0px 15px 0px #0000001A"
                                    }}
                                >
                                    <div>
                                        <div className={`${labelClass}`}>
                                            {note?.title}
                                        </div>
                                        <div
                                            className={`${dataClass} tw-truncate tw-overflow-hidden tw-whitespace-pre-line`}
                                            role={"button"}
                                            onClick={() => handleNoteReadMoreClick(note)}
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical"
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(note?.note || "")
                                            }}
                                        ></div>
                                    </div>
                                    <div
                                        className="tw-flex tw-flex-row tw-gap-[10px] tw-py-3 overflow-x-auto no-scrollbar">
                                        {note?.CompanyNoteAttachments?.map((data, index) => (
                                            <div
                                                key={index}
                                                className="tw-relative tw-border tw-group tw-flex tw-flex-row tw-border-none tw-rounded-[6px] tw-items-center tw-justify-center tw-bg-[#327CC00D] tw-px-[10px] tw-py-[10px] tw-gap-[3px]"
                                            >
                                                <div
                                                    className={`tw-flex tw-flex-row tw-items-center tw-gap-1`}
                                                >
                                                    <TiAttachmentOutline
                                                        className={`tw-size-[16] lg:tw-size-[18] 2xl:tw-size-[20]`}
                                                        color={"#327CC0"}/>
                                                    <div className={`${dataClassMedium} tw-text-[#327CC0]`}>
                                                        {truncateFileName(data?.attachment)}
                                                    </div>
                                                </div>
                                                <div
                                                    className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-gap-[10px] tw-opacity-0 group-hover:tw-opacity-100 tw-bg-[#327CC026] tw-rounded-md tw-transition-opacity tw-duration-300">
                                                    <Link
                                                        href={`${DOCUMENTS_BASE_URL}${data?.attachment}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-p-1 tw-shadow-md hover:tw-text-white tw-transition-all"
                                                    >
                                                        <AiOutlineEye size={18} color={"#231F20"}/>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDownload(data?.attachment)}
                                                        className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-rounded-full tw-p-1 tw-shadow-md hover:tw-text-white tw-transition-all"
                                                    >
                                                        <HiDownload size={18} color={"#231F20"}/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="tw-flex tw-justify-between tw-items-center">
                                        <div className={`${dataClass} montserrat-bold tw-text-[#898891]`}>
                                            {formatDate(note?.created_at, "DD/MM/YYYY - h:mm a")}
                                        </div>
                                        {note?.CompanyNoteAttachments?.length > 0 && (
                                            <div
                                                role={"button"}
                                                className="tw-flex tw-justify-center tw-items-center tw-border tw-border-black tw-rounded-md tw-w-[24px] tw-h-full"
                                                onClick={() => {
                                                    downloadAllAttachments(note);
                                                }}
                                            >
                                                <HiDownload size={15} color={"black"}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer/>
            <AddNoteModal
                isModalVisible={isModalVisible}
                form={form}
                handleSave={handleSave}
                fileList={fileList}
                handlePreview={handlePreview}
                handleRemoveFile={handleRemoveFile}
                handleChange={handleChange}
                handleModalCancel={handleModalCancel}
                theme={theme}
            />
            <Modal
                centered
                title={
                    <span className={`arial-bold tw-text-[20px] tw-text-[#231F20]`}>
            {selectedNote?.title || "Note"}
          </span>
                }
                open={isDescriptionModal}
                onCancel={handleNoteModalCancel}
                footer={null}
            >
                <div
                    className="montserrat-regular tw-text-[16px] tw-text-[#898891] tw-border-[1px] tw-border-[#BBBABF] tw-rounded-[6px] tw-p-2"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(selectedNote?.note || "")
                    }}
                ></div>
            </Modal>
        </>
    );
};

export default CompanyDetails;
