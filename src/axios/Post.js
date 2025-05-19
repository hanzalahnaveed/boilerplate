import axios from "axios";
import {BASEURL} from "./EndPoints";
import {logout} from "@/redux/Actions/LoginActions";

export const Post = (endPoint, data, encrypted = false, token, dispatch, baseUrl = '', isMultiPart) => {
    let headers;
    if (encrypted) {
        headers = {
            // withCredentials: true,
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': "application/x-www-form-urlencoded",
            "Content-Type": isMultiPart ? "multipart/form-data" : "application/json",
        }
    } else {
        headers = {
            // withCredentials: true,
            'Accept': 'application/json',
            // 'Accept': '*/*',
            // 'Content-Type': "multipart/form-data",
            "Content-Type": "multipart/form-data",
        }
    }

    baseUrl = baseUrl !== '' ? baseUrl : BASEURL;
    let url = baseUrl + endPoint;
    // console.log('href: ', href,  API, url);
    let response= axios.post(url, data, {headers});
    return response.catch(error => {
        // console.log("error =", error.response.status);
        if (error?.response?.statusCode === 401 || error?.response?.status === 401) {
            dispatch(logout());
            window.location.replace("/");
        } else {
            return response;
        }
    });
}
