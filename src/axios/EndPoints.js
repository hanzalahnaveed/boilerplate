export const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
export const BASE_URL_STRAPI = process.env.NEXT_PUBLIC_BASE_URL_STRAPI_API;
export const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
export const DOCUMENTS_BASE_URL = process.env.NEXT_PUBLIC_DOCUMENTS_BASE_URL;

export const STRAPI_ENDPOINTS = {
    HOME_HERO_SECTION: "/api/hero-sections?populate=*", //?populate=* is used where there is image in an api
    HOME_WHY_CHOOSE_US: "/api/why-chooses?populate=*",
    HOME_PRICING: "/api/pricings",
    HOME_HOW_IT_WORKS: "/api/how-it-works?populate=*",
    HOME_CLIENTS: "/api/clients?populate=*",

    ABOUT_US: {
        OUR_VISION_AND_MISSION: "/api/our-vision-and-missions?populate=*",
        SEC_2: "/api/about-us-section-2s",
    },
    
    WHAT_WE_DO: {
        SEC_1_JSON: "/api/what-we-do-section-1-jsons?populate=*",
        SEC_2: "/api/what-we-do-section-2s",
    },

    SERVICES: {
        SEC_1_JSON: "/api/service-section-1-jsons",
        SEC_2: "/api/services-section-2s",
    },
    
    CONTACT_US: {
        SEC_1: "/api/contact-us-section-ones",
        SEC_2: "/api/contact-us-section-2s",
    },
    
}

export const GENERAL_REQUESTS_ENDPOINTS = {
    CREATE_GENERAL_REQUEST: "/auth/api/v1/general/request",
}

export const AUTHENTICATION_ENDPOINTS = {
    LOGIN: "/auth/api/v1/login",
    FORGET_PASSWORD: `/auth/api/v1/forget/password`,
    GET_SIDEBAR_MENU: "/auth/api/v1/get/sidebar/menu",
    GET_SIDEBAR_MENU_NEW: "/auth/api/v1/get/sidebar/menu/new",
}

export const SYSTEM_USER_ENDPOINTS = {
    GET_ALL_TITLES: "/user/api/v1/title",
    // GET_TITLE_PERMISSIONS: "/user/api/v1/title/__TITLE_ID__/permissions",
    GET_TITLE_PERMISSIONS: "/user/api/v1/title/__TITLE_ID__/permissions",
    GET_CURRENT_USER_PROFILE: '/user/api/v1/user/profile',
    GET_CURRENT_USER_STATS: `/user/api/v1/user/booking/stats`,
}

export const USER_COMMS_ENDPOINTS = {
    CREATE_BOOKING: `/user/api/v1/comms/user/booking`,
    CREATE_RESERVATION: `/user/api/v1/comms/user/reservation`,
    CHECK_CREDIT_LIMIT: `/user/api/v1/comms/user/check`,
}

export const COMPANY_ENDPOINTS = {
    GET_ALL_COMPANIES: "/user/api/v1/company",
    DELETE_COMPANY_BY_ID: "/user/api/v1/company/__COMPANY_ID__",
    GET_COMPANY_BY_ID: "/user/api/v1/company/__COMPANY_ID__",
    GET_COMPANY_AGENTS: "/user/api/v1/company/__COMPANY_ID__/agent",
    GET_COMPANY_AGENT_BY_ID: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__",
    EXPORT_COMPANIES_LIST: "/user/api/v1/company/export?type=__DOCUMENT_TYPE__",

    BLOCK_AGENT: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/block",
    UN_BLOCK_AGENT: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/unblock",
    
    BLOCK_COMPANY : "/user/api/v1/company/__COMPANY_ID__/block",
    UN_BLOCK_COMPANY : "/user/api/v1/company/__COMPANY_ID__/unblock",

    GET_COMPANY_AGENT_BOOKINGS: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/bookings",
    GET_COMPANY_AGENT_BOOKING_ACTIVITY: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/booking_activity",

    CREATE_COMPANY: "/user/api/v1/company/create",
    UPLOAD_COMPANY_DOCUMENTS: "/user/api/v1/company/__COMPANY_ID__/upload", //__COMPANY_ID__ wil be in response of create company
    UPDATE_COMPANY: "/user/api/v1/company/__COMPANY_ID__",
    COMPANY_STATS: "/user/api/v1/company/__COMPANY_ID__/stats",
    COMPANY_AGENT_STATS: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/stats",

    EDIT_COMPANY_DETAILS :"/user/api/v1/company/__COMPANY_ID__/details",
    EDIT_COMPANY_ADDRESS_DETAILS :"/user/api/v1/company/__COMPANY_ID__/address",
    EDIT_COMPANY_FINANCIAL_DETAILS : `/user/api/v1/company/__COMPANY_ID__/financial`,
    EDIT_COMPANY_PACKAGES_DETAILS : `/user/api/v1/company/__COMPANY_ID__/packages`,
    EDIT_COMPANY_AREA_REGION_DETAILS : "/user/api/v1/company/__COMPANY_ID__/area_regions",

    ADD_COMPANY_NOTES: "/user/api/v1/company/__COMPANY_ID__/notes",
    GET_COMPANY_NOTES: "/user/api/v1/company/__COMPANY_ID__/notes",

    GET_COMPANY_AGENTS_NOTES: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/notes",
    ADD_COMPANY_AGENTS_NOTES: "/user/api/v1/company/__COMPANY_ID__/agent/__AGENT_ID__/notes",

    GET_ALL_COMPANY_USERS: "/user/api/v1/user",
    GET_COMPANY_USER_BY_ID: "/user/api/v1/user/__USER_ID__", // __USER_ID__ wiil be user?.id
    GET_USER_MANAGERS:"/user/api/v1/user/__USER_ID__/manager",
    ASSIGN_USER_MANAGERS:"/user/api/v1/user/__USER_ID__/manager/__MANAGER_ID__", //__MANAGER_ID__ will be from select dropdown list  
    REMOVE_USER_MANAGERS:"/user/api/v1/user/__USER_ID__/manager/__MANAGER_ID__", //__MANAGER_ID__ will be from table row id 

    DELETE_COMPANY_USER_BY_ID: "/user/api/v1/user/__USER_ID__",
    EXPORT_COMPANY_USERS_LIST: "",
    GET_COMPANY_MANAGERS: "/user/api/v1/company/__COMPANY_ID__/managers",
    CREATE_COMPANY_USER: "/user/api/v1/company/__COMPANY_ID__/agent",
}
export const INDIVIDUAL_ENDPOINTS = {
    CREATE_INDIVIDUAL : "/user/api/v1/individual/create",
    UPDATE_INDIVIDUAL : "/user/api/v1/individual/__INDIVIDUAL_ID__",
    UPLOAD_INDIVIDUAL_DOCUMENTS: "/user/api/v1/individual/__INDIVIDUAL_ID__/upload", //__INDIVIDUAL_ID__ wil be in response of create individual's user?.id
    DELETE_INDIVIDUAL_BY_ID: "/user/api/v1/individual/__INDIVIDUAL_ID__",
    GET_ALL_INDIVIDUALS: "/user/api/v1/individual/list",
    GET_INDIVIDUAL_BY_ID : "/user/api/v1/individual/__INDIVIDUAL_ID__", //__INDIVIDUAL_ID__ is agent id
    INDIVIDUAL_STATS:"/user/api/v1/individual/__INDIVIDUAL_ID__/stats",
    EXPORT_INDIVIDUALS_LIST: "/user/api/v1/individual/export?type=__DOCUMENT_TYPE__",

    BLOCK_INDIVIDUAL : "/user/api/v1/company/__COMPANY_ID__/agent/__INDIVIDUAL_ID__/block",
    UN_BLOCK_INDIVIDUAL : "/user/api/v1/company/__COMPANY_ID__/agent/__INDIVIDUAL_ID__/unblock",

    EDIT_INDIVIDUAL_DETAILS : "/user/api/v1/individual/__INDIVIDUAL_ID__/details",
    EDIT_INDIVIDUAL_ADDRESS_DETAILS : "/user/api/v1/individual/__INDIVIDUAL_ID__/address",
    EDIT_INDIVIDUAL_FINANCIAL_DETAILS : "/user/api/v1/individual/__INDIVIDUAL_ID__/financial",
    EDIT_INDIVIDUAL_PACKAGE_DETAILS : "/user/api/v1/individual/__INDIVIDUAL_ID__/packages",
    EDIT_INDIVIDUAL_AREA_REGION_DETAILS : "/user/api/v1/individual/__INDIVIDUAL_ID__/area_regions",
    
    ADD_INDIVIDUAL_NOTES: "/user/api/v1/individual/__INDIVIDUAL_ID__/notes",
    GET_INDIVIDUAL_NOTES: "/user/api/v1/individual/__INDIVIDUAL_ID__/notes",
}

export const META_DATA_ENDPOINTS = {
    GET_DOCUMENT_TYPES: "/user/api/v1/metadata/documentTypes",
    GET_RELATIONSHIP_TITLES: "/user/api/v1/organization/relationship_titles",

    GET_ALL_COUNTRIES: "/hotel/search/api/v1/world/countries",
    GET_ALL_CITIES: "/hotel/search/api/v1/world/cities",
    GET_ALL_STATES: "/hotel/search/api/v1/world/states",

}
export const CUSTOMER_ENDPOINTS = {
    CREATE_CUSTOMER: "/customer/api/v1",
    GET_ALL_CUSTOMERS: "/customer/api/v1",
    EXPORT_CUSTOMERS_LIST: "/customer/api/v1/export?type=__DOCUMENT_TYPE__", //Replace type of document with __DOCUMENT_TYPE__
    GET_CUSTOMER_BY_ID: "/customer/api/v1/__CUSTOMER_ID__",
    GET_CUSTOMER_STATS: "/customer/api/v1/__CUSTOMER_ID__/stats",
    GET_CUSTOMER_BOOKINGS: "/customer/api/v1/__CUSTOMER_ID__/bookings",
    ADD_CUSTOMER_NOTES: "/customer/api/v1/__CUSTOMER_ID__/notes",
    GET_CUSTOMER_NOTES: "/customer/api/v1/__CUSTOMER_ID__/notes",
    UPDATE_CUSTOMER: "/customer/api/v1/__CUSTOMER_ID__", //Replace id with __CUSTOMER_ID__ while using api
    DELETE_CUSTOMER_BY_ID: "/customer/api/v1/__CUSTOMER_ID__",
}

export const HOTEL_ENDPOINTS = {
    GET_ALL_CITIES: "/hotel/search/api/v1/cities",
    GET_ALL_COUNTRIES: "/hotel/search/api/v1/countries",
    GET_ALL_STATES: "/hotel/search/api/v1/states?page=1&limit=20",
    GET_ALL_HOTELS: "hotels?page=1&limit=20",
    GET_HOTEL_DETAILS: "/hotels/__HOTEL_ID__/details/", //HOTEL_ID will be hotelId from hotels

    HOTEL_SEARCH: "/hotel/search/api/v1/hotels/search",
    HOTEL_DETAILS_WITH_AVAILABLE_ROOM:"/hotel/search/api/v1/hotels/__ITEM_ID__/room/details/", //__ITEM_ID__ will be itemId from search
    HOTEL_DETAILS_WITH_SINGLE_ROOM:"/hotel/search/api/v1/hotels/__ITEM_ID__/room/__ROOM_ID__/single/details/",

    GET_HOTEL_FACILITIES_FOR_RESERVATION: "/hotel/search/api/v1/hotel/__HOTEL_ID__/room/__ROOM_ID__/facilities",

}

export const RESERVATIONS_ENDPOINTS = {
    CREATE_RESERVATION: "/reservations/api/v1/create/reservation",
    USER_RESERVATIONS: "/reservations/api/v1/user/reservations",
    GET_RESERVATION_DETAILS: "/reservations/api/v1/reservation/__RESERVATION_ID__",
    CANCEL_RESERVATION: "/reservations/api/v1/cancel/reservation/__RESERVATION_ID__",

    CREATE_BOOKING: "/reservations/api/v1/create/booking",
    USER_BOOKINGS: "/reservations/api/v1/user/bookings",
    GET_BOOKING_DETAILS: "/reservations/api/v1/booking/__BOOKING_ID__",
    CANCEL_BOOKING: "/reservations/api/v1/cancel/booking/__BOOKING_ID__",

}
export const PAYMENT_ENDPOINTS = {
    CREATE_PAYMENT: "/payment/api/v1/create",
    GET_STATEMENT_OF_ACCOUNT: "/payment/api/v1/account/statement",
    GET_INVOICES: "/payment/api/v1/invoice/list",
    GET_INVOICES_BY_ID: "/payment/api/v1/invoice/details",
    RECORD_INVOICE_PAYMENT: "/payment/api/v1/invoice/record/payment",

    GET_BOOKINGS_FOR_INVOICE: "/payment/api/v1/invoice/bookings",
    GENERATE_INVOICE:"/payment/api/v1/invoice/generate",
    GENERATE_PDF_FOR_INVOICE:"/payment/api/v1/invoice/pdf/generate",

}

export const SUPPORT_DESK_ENDPOINTS = {
    CREATE_REQUEST: "/support/api/v1/request/create",
    UPDATE_REQUEST_STATUS: "/support/api/v1/request/update/status",
    GET_REQUEST_LIST: "/support/api/v1/request/list",
    GET_SINGLE_REQUEST_BY_UID: "/support/api/v1/request/single/chat/details",
    GET_REQUEST_CHATS_BY_UID: "/support/api/v1/request/chats",
}