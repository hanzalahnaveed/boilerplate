import React, { useState } from "react";
import EditUserPersonalInformation from "@/components/ClientComponents/Pages/Dashboard/Profile/UserEditModals/EditUserProfileInformation";
import EditUserAddressInformation from "@/components/ClientComponents/Pages/Dashboard/Profile/UserEditModals/EditUserAddressInformation";
import EditAgentPersonalInformation from "@/components/ClientComponents/Pages/Dashboard/Agent/Individual/IndividualsEditModals/EditAgentPersonalInformation";
import EditAgentAddressInformation from "@/components/ClientComponents/Pages/Dashboard/Agent/Individual/IndividualsEditModals/EditAgentAddressInformation";
import EditCompanyPersonalInformation from "@/components/ClientComponents/Pages/Dashboard/Agent/Company/CompanyEditModals/EditCompanyPersonalInformation";
import EditCompanyAddressInformation from "@/components/ClientComponents/Pages/Dashboard/Agent/Company/CompanyEditModals/EditCompanyAddressInformation";
import ActionBlockUnblock from "@/components/ReUseAbleComponents/RbacActions/ActionBlockUnblock";
import HorizontalLine from "@/components/ReUseAbleComponents/Lines/HorizontalLine";
import ButtonSecondary from "../CustomButton/ButtonSecondary";
import { toast, ToastContainer } from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEdit } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import { formatDate } from "@/utils/dateHelper";

const ProfileCard = (props) => {
  const {
    theme,  
    data,
    userType,
    form,
    handleEditModalOk,
    handleAddressModalOk,
    handleActionBlockUnblock,
    showEdit,
    showBlockUnBlock,
    isUserProfile
  } = props;
  
  const UserData = useSelector((state) => state?.LoginReducer);
  
  const [editUserDetails, setEditUserDetails] = useState(false);
  const [editUserAddressDetails, setEditUserAddressDetails] = useState(false);
  const [editAgentDetails, setEditAgentDetails] = useState(false);
  const [editAgentAddressDetails, setEditAgentAddressDetails] = useState(false);
  const [editCompanyDetails, setEditCompanyDetails] = useState(false);
  const [editCompanyAddressDetails, setEditCompanyAddressDetails] = useState(false);

  const titleClass = "montserrat-bold tw-text-[22px] lg:tw-text-[24px] xl:tw-text-[26px] tw-text-[#231F20]"
  const headingClass = "montserrat-medium tw-text-[20px] tw-text-[#231F20]";
  const labelClass = "montserrat-bold tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px] tw-text-[#231F20]"
  const dataClassMedium = "montserrat-medium tw-text-[16px] tw-text-[#231F20]"
  const dataClass = "montserrat-regular tw-text-[12px] lg:tw-text-[14px] xl:tw-text-[16px] tw-text-[#231F20]"

  const handlePersonalDetails = () => {
    if (userType === "user") {
      setEditUserDetails(true);
    } else if (userType === "agent") {
      setEditAgentDetails(true);
    } else if (userType === "company") {
      setEditCompanyDetails(true);
    }
  };

  const handleAddressDetails = () => {
    if (userType === "user") {
      setEditUserAddressDetails(true);
    } else if (userType === "agent") {
      setEditAgentAddressDetails(true);
    } else if (userType === "company") {
      setEditCompanyAddressDetails(true);
    }
  };

  const handleModalCancel = () => {
    if (userType === "user") {
      setEditUserDetails(false);
      setEditUserAddressDetails(false);
    } else if (userType === "agent") {
      setEditAgentDetails(false);
      setEditAgentAddressDetails(false);
    } else if (userType === "company") {
      setEditCompanyDetails(false);
      setEditCompanyAddressDetails(false);
    }
  };

  const handleEditModalOkWrapper = () => {
    if (handleEditModalOk) {
      handleEditModalOk();
    }
    if (userType === "user") {
      setEditUserDetails(false);
    } else if (userType === "agent") {
      setEditAgentDetails(false);
    } else if (userType === "company") {
      setEditCompanyDetails(false);
    }
  };

  const handleAddressModalOkWrapper = () => {
    if (handleAddressModalOk) {
      handleAddressModalOk();
    }
    if (userType === "user") {
      setEditUserAddressDetails(false);
    } else if (userType === "agent") {
      setEditAgentAddressDetails(false);
    } else if (userType === "company") {
      setEditCompanyAddressDetails(false);
    }
  };

  const renderData = (heading, description) => {
    return (
      <div className="tw-grid tw-grid-cols-9 tw-gap-2 tw-px-1">
        <div className={`tw-col-span-4 ${dataClassMedium} tw-whitespace-normal tw-break-words`}>
          {heading}
        </div>
        <div className={`tw-col-span-5 tw-items-center tw-justify-center`}>
          {heading === "Website" ? (
            <a
              className={`${dataClass} tw-text-[#898891] tw-w-full tw-max-w-full tw-whitespace-normal tw-break-words tw-overflow-hidden tw-inline-block`}
              href={description}
              target="_blank"
              title={description}
            >
              {description}
            </a>
          ) : (
            <div className={`${dataClass} tw-text-[#898891] tw-whitespace-normal tw-break-words tw-w-full tw-max-w-full`}>
              {description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderUser = (userType, value) => {
    if (userType === "user") {
      if (value === "personalDetails") {
        return (
          <>
            {renderData("Cnic", data?.cnic)}
            {renderData("Contact", data?.contact)}
            {renderData("Email", data?.email)}
            {renderData("Organization", data?.organization_name)}
          </>
        );
      }
      if (value === "addressDetails") {
        return (
          <>
            {renderData("Address", data?.complete_address)}
            {renderData("City", data?.city)}
            {renderData("State", data?.state)}
            {renderData("Country", data?.country)}
            {renderData("Zip Code", data?.zipcode)}
          </>
        );
      }
    }
    if (userType === "agent") {
      if (value === "personalDetails") {
        return (
          <>
            {renderData("User Name", data?.username)}
            {renderData("Cnic", data?.cnic || data?.details?.ntn_number)}
            {renderData("Contact", data?.contact)}
            {renderData("Email", data?.email)}
            {renderData("Organization", data?.organization_name)}
          </>
        );
      }
      if (value === "addressDetails") {
        return (
          <>
            {renderData("Address", data?.location?.address)}
            {renderData("City", data?.location?.city)}
            {renderData("State", data?.location?.state)}
            {renderData("Country", data?.location?.country)}
            {renderData("Zip Code", data?.location?.zipcode)}
          </>
        );
      }
    }
    if (userType === "company") {
      if (value === "personalDetails") {
        return (
          <>
            {renderData("Legal Name", data?.legal_name)}
            {renderData("NTN No", data?.details?.ntn_number)}
            {renderData("SEC Reg No", data?.details?.sec_registration_number)}
            {renderData("Contact", data?.details?.phone)}
            {renderData("Email", data?.details?.email)}
            {renderData("Website", data?.details?.website)}
          </>
        );
      }
      if (value === "addressDetails") {
        return (
          <>
            {renderData("Address", data?.address?.complete_address)}
            {renderData("City", data?.address?.city)}
            {renderData("State", data?.address?.state)}
            {renderData("Country", data?.address?.country)}
            {renderData("Zip Code", data?.address?.zipcode)}
          </>
        );
      }
    }
    if (userType === "organization") {
      if (value === "personalDetails") {
        return (
          <>
            {renderData("Legal Name", data?.legal_name)}
            {renderData("NTN No", data?.details?.ntn_number)}
            {renderData("SEC Reg No", data?.details?.sec_registration_number)}
            {renderData("Contact", data?.details?.phone)}
            {renderData("Email", data?.details?.email)}
            {renderData("Website", data?.details?.website)}
          </>
        );
      }
      if (value === "addressDetails") {
        return (
          <>
            {renderData("Address", data?.address?.complete_address)}
            {renderData("City", data?.address?.city)}
            {renderData("State", data?.address?.state)}
            {renderData("Country", data?.address?.country)}
            {renderData("Zip Code", data?.address?.zipcode)}
          </>
        );
      }
    }
  };

  const renderRelationShip = (data) => {
    return (
        <>
          {renderData("Name", data?.user?.name)}
          {renderData("Role", data?.title?.name)}
        </>
    );
  };

  return (
    <>
      <div
        className={`tw-bg-white tw-min-h-[95vh] tw-px-4 tw-py-3 tw-rounded-md`}
        style={{
          boxShadow: "0px 0px 15px 0px #0000001A"
        }}
      >
        <div className={`tw-flex tw-flex-col tw-gap-2 tw-pb-4 tw-pt-2`}>
          <div
            className={`tw-flex tw-flex-col tw-items-center tw-justify-center`}
          >
            <div
              className={`tw-size-[100px] tw-rounded-full tw-relative`}
            >
              {data?.image ? (
                <>
                  <div
                    className={`tw-flex tw-items-center tw-justify-center tw-h-full tw-w-full`}
                  >
                    <Image
                      priority={true}
                      src={data?.image}
                      className={`img-fluid`}
                      alt="icon"
                    />
                  </div>
                </>
              ) : (
                <>
                  <FaRegUserCircle size={"100%"} />
                </>
              )}
            </div>
            <div className={`${titleClass} tw-text-[#327CC0] tw-text-center`}>
              {data?.name}
            </div>
            <div
              className={`${headingClass} tw-text-[#898891]`}
            >
              {data?.title_name || data?.title}
            </div>
            {
              ((userType === "agent")||(userType === "company" && UserData?.user?.organization?.company_id === "GTT")) &&
              <>
                <div className={"tw-mt-2"}>
                  <ActionBlockUnblock
                      isTableView={false}
                      status={data?.status}
                      data={data}
                      handleActionBlockUnblock={(data, action, note) => {
                        handleActionBlockUnblock(data, action, note);
                      }}
                  />
                </div>
                <div className={`tw-w-full`}>
                  <HorizontalLine theme={theme} height={2} />
                </div>
                {
                  data?.status_log &&
                  <>
                    <div className="tw-w-full tw-border-2 tw-border-[#BBBABF] tw-rounded-md tw-px-1  tw-flex tw-flex-col tw-gap-2">
                      <div className={`${dataClass} tw-p-2 tw-rounded-md tw-text-wrap tw-break-words tw-whitespace-pre-wrap tw-overflow-hidden`}>
                        {(data?.status_log?.note)} 
                      </div>
                      <div className="tw-flex tw-justify-between tw-items-center tw-p-2 tw-rounded-md">
                        <div className="montserrat-regular tw-text-[10px] sm:tw-text-[11px] md:tw-text-[12px] tw-text-[#898891] tw-break-words">
                          Blocked by {data?.status_log?.status_changed_by}
                        </div>
                        <div className="montserrat-regular tw-text-[10px] sm:tw-text-[11px] md:tw-text-[12px] tw-text-[#898891] tw-break-words">
                          {formatDate(data?.status_log?.status_changed_at, "DD-MM-YYYY")}
                        </div>
                      </div>
                    </div>
                    <div className={`tw-w-full`}>
                      <HorizontalLine theme={theme} height={2} />
                    </div>
                  </>
                }
              </>
            }
          </div>
          <div className={`tw-flex tw-flex-row tw-items-center tw-justify-between`}>
            <div className={`${labelClass}`}>
              Primary Details
            </div>
            {
              (!showEdit && UserData?.user?.organization?.company_id === "GTT") && 
              <div className={`tw-flex tw-flex-row tw-items-center tw-gap-5`}>
                <ButtonSecondary
                    onClick={handlePersonalDetails}
                    text={"Edit"}
                    width={"100px"}
                    height={"30px"}
                    size={"16px"}
                    icon={<FaRegEdit className={`tw-text-xl`} />}
                />
            </div>
            }
          </div>
          <div className={`tw-flex tw-flex-col tw-gap-[5px]`}>
            {renderUser(userType,"personalDetails")}
          </div>
          <div className={`tw-w-full`}>
            <HorizontalLine theme={theme} height={2} />
          </div>
          <div className={`tw-flex tw-flex-row tw-items-center tw-justify-between`}>
            <div className={`${labelClass}`}>
              Address Details
            </div>
            {
              (!showEdit && UserData?.user?.organization?.company_id === "GTT") && 
              <div className={`tw-flex tw-flex-row tw-items-center tw-gap-5`}>
                <ButtonSecondary
                    onClick={handleAddressDetails}
                    text={"Edit"}
                    width={"100px"}
                    height={"30px"}
                    size={"16px"}
                    icon={<FaRegEdit className={`tw-text-xl`} />}
                />
              </div>
            }
          </div>
          <div className={`tw-flex tw-flex-col tw-gap-[5px]`}>
            {renderUser(userType,"addressDetails")}
          </div>
          <div className={`tw-w-full`}>
            <HorizontalLine theme={theme} height={2} />
          </div>
          {
            data?.relationship?.title?.name &&
              <>
                <div className={`${labelClass}`}>
                  Account Manager
                </div>
                <div className={`tw-flex tw-flex-col tw-gap-[5px]`}>
                  {renderRelationShip(data?.relationship)}
                </div>
              </>
          }

        </div>
      </div>

      {/* user edit modals */}
      {editUserDetails && (
        <EditUserPersonalInformation
          isUpdateCompanyDetails={editUserDetails}
          handleEditIndividualModalCancel={handleModalCancel}
          handleEditModalOk={handleEditModalOkWrapper}
          form={form}
          data={data}
        />
      )}
      {editUserAddressDetails && (
        <EditUserAddressInformation
          isUpdateAddressDetails={editUserAddressDetails}
          handleEditAddressModalCancel={handleModalCancel}
          handleEditAddressModalOk={handleAddressModalOkWrapper}
          form={form}
          data={data}
        />
      )}

      {/* {agent edit modals} */}
      {editAgentDetails && (
        <EditAgentPersonalInformation
          isUpdateCompanyDetails={editAgentDetails}
          handleEditIndividualModalCancel={handleModalCancel}
          handleEditModalOk={handleEditModalOkWrapper}
          form={form}
          data={data}
        />
      )}
      {editAgentAddressDetails && (
        <EditAgentAddressInformation
          isUpdateAddressDetails={editAgentAddressDetails}
          handleEditAddressModalCancel={handleModalCancel}
          handleEditAddressModalOk={handleAddressModalOkWrapper}
          form={form}
          data={data}
        />
      )}

      {/* {company edit modals} */}
      {editCompanyDetails && (
        <EditCompanyPersonalInformation
          isUpdateCompanyDetails={editCompanyDetails}
          handleEditCompanyModalCancel={handleModalCancel}
          handleEditCompanyModalOk={handleEditModalOkWrapper}
          form={form}
          data={data}
        />
      )}
      {editCompanyAddressDetails &&
        <EditCompanyAddressInformation
          isUpdateAddressDetails={editCompanyAddressDetails}
          handleEditAddressModalCancel={handleModalCancel}
          handleEditAddressModalOk={handleAddressModalOkWrapper}
          form={form}
          data={data}
        />
      }
      <ToastContainer />
    </>
  );
};

export default ProfileCard;