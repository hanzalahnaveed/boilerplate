import axios from "axios";
import {BASEURL} from "./EndPoints";
import {logout} from "@/redux/Actions/LoginActions";

export const Get = (endPoint, encrypted = false, token = '', dispatch, baseUrl = '') => {
    let headers;

    if (encrypted) {
        headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': "application/x-www-form-urlencoded",
            'Content-Type': "application/json",
        }
    } else {
        headers = {
            withCredentials: true,
            'Accept': 'application/json',
            // 'Accept': '*/*',
            // 'Content-Type': "multipart/form-data",
            'Content-Type': "application/json",
        }

    }

    baseUrl = baseUrl !== '' ? baseUrl : BASEURL;
    let url = baseUrl + endPoint;
    // console.log('href: ', href,  API, url);
    let response = axios.get(url, {headers});

    return response.catch(error => {
        // console.log("error =", error.response.status);
        if (error?.response?.statusCode === 401 || error?.response?.status === 401) {
            dispatch(logout());
            window.location.replace("/");
        } else {
            return response;
        }
    });
};
