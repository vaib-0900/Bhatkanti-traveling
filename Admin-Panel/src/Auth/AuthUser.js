import axios from "axios";
import { API_URL } from "../Helper/Url_helper";

export default function AuthUser() {
    const http = axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    const https = axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    // ==========================================
    // Add Admin JWT Token
    // ==========================================
    const token = localStorage.getItem("admin_token");

    if (token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        https.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // ==========================================
    // Admin Logout
    // ==========================================
    const logout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");

        window.location.href = "/admin/login";
    };

    // ==========================================
    // Get Logged-in Admin
    // ==========================================
    const getAdmin = () => {
        const admin = localStorage.getItem("admin_user");

        if (!admin) {
            return null;
        }

        try {
            return JSON.parse(admin);
        } catch (error) {
            console.log("ADMIN USER PARSE ERROR:", error);
            return null;
        }
    };

    // ==========================================
    // Check Admin Login
    // ==========================================
    const isAdminLoggedIn = () => {
        const token = localStorage.getItem("admin_token");

        return !!token;
    };

    return {
        http,
        https,
        logout,
        getAdmin,
        isAdminLoggedIn,
    };
}