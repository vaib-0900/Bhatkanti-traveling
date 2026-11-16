import axios from "axios";
import { API_URL } from "../Helper/Url_helper";

export default function AuthUser() {

    const token =
        localStorage.getItem("customer_token");


    const http = axios.create({
        baseURL: API_URL,

        headers: {
            "Content-Type":
                "application/json",
        },
    });


    const https = axios.create({
        baseURL: API_URL,

        headers: {
            "Content-Type":
                "multipart/form-data",
        },
    });


    if (token) {

        http.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;


        https.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    }


    const getCustomer = () => {

        const customer =
            localStorage.getItem(
                "customer_user"
            );

        if (!customer) {
            return null;
        }

        try {

            return JSON.parse(customer);

        } catch (error) {

            console.log(
                "CUSTOMER USER PARSE ERROR:",
                error
            );

            return null;
        }
    };


    const isLoggedIn = () => {

        const token =
            localStorage.getItem(
                "customer_token"
            );

        return !!token;
    };


    const logout = () => {

        localStorage.removeItem(
            "customer_token"
        );

        localStorage.removeItem(
            "customer_user"
        );

        window.location.href =
            "/login";
    };


    return {
        http,
        https,
        getCustomer,
        isLoggedIn,
        logout,
    };
}