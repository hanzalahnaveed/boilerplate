"use client";

import React, { useEffect, useState } from "react";
import UseThemeHook from "@/customHooks/UseThemeHook";
import DashboardHeaderWithUserInfo from "@/components/ClientComponents/Common/DashboardHeaderWithUserInfo";
import CompanyTable from "@/components/ReUseAbleComponents/CustomTable/CompanyTable";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from 'next/navigation';
import { Input } from "antd";
import Image from "next/image";
import { Get } from "@/axios/Get";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL, COMPANY_ENDPOINTS } from "@/axios/EndPoints";
import PageLoader from "@/components/ReUseAbleComponents/CustomLoaders/PageLoader/PageLoader";
import RemoveModal from "@/components/ReUseAbleComponents/CustomModals/RemoveModal";
import { Delete } from "@/axios/Delete";
import ActionAdd from "@/components/ReUseAbleComponents/RbacActions/ActionAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconPdfExport from "@/assets/icons/icon-pdf-export.svg";
import IconCsvExport from "@/assets/icons/icon-csv-export.svg";
import IconXlsxExport from "@/assets/icons/icon-xlsx-export.svg";
import ButtonPrimary from "@/components/ReUseAbleComponents/CustomButton/ButtonPrimary";
import { IoSearchOutline } from "react-icons/io5";

const CompanyIndex = () => {

  const { theme } = UseThemeHook();
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state?.LoginReducer);
  const router = useRouter();
  const searchParams = useSearchParams();
  // const success = searchParams.get("success");
  const [loading, setLoading] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [companiesPagination, setCompaniesPagination] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const limit = 10;

  const titleClass =
    "arial-bold tw-text-[22px] lg:tw-text-[24px] xl:tw-text-[26px] tw-text-[#231F20]";
  const headingClass = "arial-bold tw-text-[20px] tw-text-[#231F20]";
  const labelClass =
    "arial-bold tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px] tw-text-[#231F20]";
  const dataClassMedium = "montserrat-medium tw-text-[16px] tw-text-[#231F20]";
  const dataClass =
    "montserrat-regular tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px] tw-text-[#231F20]";

  const getAllCompanies = (searchQuery, pageNumber) => {
    setLoading(true);
    const queryParam = searchQuery ? `&q=${searchQuery}` : ``;
    Get(
      COMPANY_ENDPOINTS.GET_ALL_COMPANIES +
        `?page=${pageNumber}&limit=${limit}${queryParam}`,
      true,
      UserData?.token,
      dispatch,
      ""
    )
      .then((response) => {
        setAllCompanies(response?.data?.data?.organizations || []);
        setCompaniesPagination(response?.data?.data?._metadata);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error while getting all companies: ", error);
        setLoading(false);
      });
  };

  // On component mount, check for query params in the URL
  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const searchQuery = params?.get("q") || "";

    setQuery(searchQuery); // Update state with the query from the URL
    if (page >= 1) {
      getAllCompanies(searchQuery, page);
    } else {
      getAllCompanies(searchQuery, 1);
    }
  }, [page]);

  // useEffect(() => {
  //   if (success) {
  //       toast.success("Company added successfully!");
  //       // Remove the query parameter from the URL after displaying the toast
  //       router.replace("/dashboard/agent/company", { shallow: true });
  //   }
  // }, [success]);

  const handleAddCompany = () => {
    router.push("/dashboard/agent/company/registration");
  };
  const showModal = (data) => {
    setSelectedCompany(data);
    setIsModalVisible(true);
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedCompany(null);
  };
  const handleRemove = (data) => {
    showModal(data);
  };
  const handleSearch = () => {
    if (query) {
      router.push(`?q=${query}`);
    }
    getAllCompanies(query, 1); // Reset to page 1 on new search
  };

  const handleView = (data) => {
    router.push(`/dashboard/agent/company/${data?.company_id}`);
  };

  const handleModalOk = () => {
    let endpoint = COMPANY_ENDPOINTS.DELETE_COMPANY_BY_ID;
    endpoint = endpoint.replace("__COMPANY_ID__", selectedCompany?.company_id);
    setLoadingDelete(true);
    Delete(endpoint, true, UserData?.token, dispatch, "", false)
      .then((response) => {
        if (response?.data) {
          const timer = setTimeout(() => {
            getAllCompanies("", 1);
            toast.success("Company retrieved successfully!");
            setSelectedCompany(null);
            setIsModalVisible(false);
            setLoadingDelete(false);
          }, 4000);
          return () => clearTimeout(timer);
        }
      })
      .catch((error) => {
        console.log("Error while deleting company:", error?.response);
        setLoadingDelete(false);
      });
  };

  const handleDownload = (fileName) => {
    const url = `${BASEURL}/user/${fileName}`;
    fetch(url, {
      method: "GET",
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

  const handleExport = (fileType) => {
    let endpoint = COMPANY_ENDPOINTS.EXPORT_COMPANIES_LIST;
    endpoint = endpoint.replace("__DOCUMENT_TYPE__", fileType);
    Get(endpoint, true, UserData?.token, dispatch, "")
      .then((response) => {
        const fileName = response?.data?.data;
        handleDownload(fileName);
      })
      .catch((error) => {
        console.log("error while exporting customers: ", error);
      });
  };

  return (
    <div
      className={`tw-h-full tw-px-4`}
      style={{
        color: theme.themeTextColor,
      }}
    >
      <DashboardHeaderWithUserInfo showUserInfo={false} />
      <div
        className={`tw-h-fit tw-flex tw-flex-col tw-border-none tw-rounded-md tw-w-full tw-px-4 tw-py-5 tw-bg-white tw-mt-5 tw-gap-5`}
        style={{
          color: theme.themeTextColor,
          boxShadow: "0px 0px 15px 0px #0000001A",
        }}
      >
        {allCompanies?.length > 0 && (
          <div
            className={`tw-flex tw-flex-row tw-items-center tw-justify-between`}
          >
            <div className={`tw-flex tw-flex-row tw-items-center tw-gap-2`}>
              <Input
                placeholder="Search"
                value={query}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuery(value);
                  if (value.trim() === "") {
                    // Call the initial API if the input is cleared
                    router.push(`?`);
                    getAllCompanies("", 1);
                  }
                }}
              />
              <ButtonPrimary
                typeTheme={"theme-primary"}
                text={""}
                onClick={handleSearch}
                height={`tw-h-[33px]`}
                width={`tw-w-[33px]`}
                icon={<IoSearchOutline size={20} />}
              />
            </div>

            <div className={`tw-flex tw-flex-row tw-items-center tw-gap-3`}>
              <div className={`${headingClass}`}>Export Company List</div>
              <div className={`tw-flex tw-flex-row tw-items-center tw-gap-3`}>
                <Image
                  src={IconPdfExport}
                  alt={"pdf"}
                  onClick={() => handleExport("pdf")}
                  className="tw-cursor-pointer tw-size-[40px]"
                />
                <Image
                  src={IconCsvExport}
                  alt={"csv"}
                  onClick={() => handleExport("csv")}
                  className="tw-cursor-pointer tw-size-[40px]"
                />
                <Image
                  src={IconXlsxExport}
                  alt={"xlsx"}
                  onClick={() => handleExport("xlsx")}
                  className="tw-cursor-pointer tw-size-[40px]"
                />
              </div>
            </div>
          </div>
        )}
        <div
          className={`tw-flex tw-flex-row tw-items-center tw-justify-between`}
        >
          <div className={`${headingClass}`}>Company List</div>
          <ActionAdd
            typeTheme={"theme-primary"}
            text={"Add Company"}
            onClick={handleAddCompany}
            height={`tw-h-[33px]`}
            width={`tw-w-[183px]`}
          />
        </div>
        {loading ? (
          <>
            <div
              className={`tw-w-full tw-h-[80vh] tw-flex tw-items-center tw-justify-center`}
            >
              <PageLoader />
            </div>
          </>
        ) : (
          <CompanyTable
            data={allCompanies}
            handleRemove={(data) => {
              handleRemove(data);
            }}
            handleView={(data) => {
              handleView(data);
            }}
            pagination={{
                current: companiesPagination?.page || 1,
                pageSize: companiesPagination?.perPage || limit,
                total: companiesPagination?.totalRecords || 0,
                onChange: (page) => setPage(page), // Handle page change
              }}
          />
        )}
      </div>
      <RemoveModal
        isModalVisible={isModalVisible}
        message={"Are you sure you want to remove this company?"}
        handleModalOk={handleModalOk}
        handleModalCancel={handleModalCancel}
        loading={loadingDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default CompanyIndex;
