import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

// ==========================================
// SIDEBAR NAV ITEMS
// ==========================================

const navItems = [
    {
        to: "/admin/dashboard",
        label: "Dashboard",
        icon: "bi-speedometer2",
    },
    {
        to: "/admin/users",
        label: "Users",
        icon: "bi-people",
        countKey: "users",
    },
    {
        to: "/admin/bookings",
        label: "Bookings",
        icon: "bi-journal-check",
        countKey: "bookings",
    },
    {
        to: "/admin/bookingtravelers",
        label: "Booking Travelers",
        icon: "bi-person-vcard",
        countKey: "bookingtravelers",
    },
    {
        to: "/admin/bookingaddons",
        label: "Booking Addons",
        icon: "bi-bag-plus",
        countKey: "bookingaddons",
    },
    {
        to: "/admin/addons",
        label: "Addons",
        icon: "bi-box-seam",
        countKey: "addons",
    },
    {
        to: "/admin/tourschedules",
        label: "Tour Schedules",
        icon: "bi-calendar2-week",
        countKey: "tourschedules",
    },
    {
        to: "/admin/tourpackages",
        label: "Tour Packages",
        icon: "bi-map",
        countKey: "tourpackages",
    },
    {
        to: "/admin/reviews",
        label: "Reviews",
        icon: "bi-star",
        countKey: "reviews",
    },
    {
        to: "/admin/customers",
        label: "Customers",
        icon: "bi-people-fill",
        countKey: "customers",
    },
    {
        to: "/admin/payments",
        label: "Payments",
        icon: "bi-credit-card",
        countKey: "payments",
    },
    {
        to: "/admin/notifications",
        label: "Notifications",
        icon: "bi-bell",
        // Notifications API currently not available
        // so no countKey here
    },
];

// ==========================================
// COUNT API ENDPOINTS
// ==========================================

const countEndpoints = {
    users: "/users",
    bookings: "/bookings",
    bookingtravelers: "/bookingtravelers",
    bookingaddons: "/bookingaddons",
    addons: "/addons",
    tourschedules: "/tourschedules",
    tourpackages: "/tourpackages",
    reviews: "/reviews",
    customers: "/customers",
    payments: "/payments",
};

// ==========================================
// SIDEBAR COMPONENT
// ==========================================

function Sidebar() {
    const { http } = AuthUser();
    const navigate = useNavigate();

    const [counts, setCounts] = useState({});

    const [adminUser, setAdminUser] = useState({
        username: "Admin User",
        full_name: "Super Admin",
        role: "admin",
    });

    // ==========================================
    // GET ADMIN USER FROM LOCAL STORAGE
    // ==========================================

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("admin_user");

            if (storedUser) {
                const user = JSON.parse(storedUser);

                setAdminUser({
                    username: user?.username || "Admin User",
                    full_name: user?.full_name || "Super Admin",
                    role: user?.role || "admin",
                });
            }
        } catch (error) {
            console.log("ADMIN USER LOAD ERROR:", error);
        }
    }, []);

    // ==========================================
    // FETCH COUNTS
    // ==========================================

    useEffect(() => {
        let isMounted = true;

        const fetchCounts = async () => {
            const entries = Object.entries(countEndpoints);

            const results = await Promise.all(
                entries.map(async ([key, url]) => {
                    try {
                        const res = await http.get(url);

                        const list = Array.isArray(res.data)
                            ? res.data
                            : Array.isArray(res.data?.data)
                            ? res.data.data
                            : [];

                        return [key, list.length];

                    } catch (error) {
                        console.log(
                            `Count fetch failed for ${key}:`,
                            error?.response?.status || error.message
                        );

                        return [key, null];
                    }
                })
            );

            if (isMounted) {
                setCounts(Object.fromEntries(results));
            }
        };

        fetchCounts();

        return () => {
            isMounted = false;
        };
    }, [http]);

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");

        navigate("/admin/login", {
            replace: true,
        });
    };

    // ==========================================
    // RETURN
    // ==========================================

    return (
        <div className="sidebar-wrapper">

            {/* ==================================
                BRAND
            ================================== */}

            <div className="sidebar-brand">

                <div className="brand-icon">
                    <i className="bi bi-airplane-fill"></i>
                </div>

                <div className="brand-text">
                    <span className="brand-title">
                        Travel
                    </span>

                    <span className="brand-subtitle">
                        Admin
                    </span>
                </div>

            </div>

            {/* ==================================
                NAVIGATION
            ================================== */}

            <div className="sidebar-nav">

                <p className="nav-label">
                    MAIN
                </p>

                <ul className="nav-list">

                    {navItems.map((item) => {

                        const badgeCount = item.countKey
                            ? counts[item.countKey]
                            : null;

                        return (
                            <li key={item.to}>

                                <NavLink
                                    to={item.to}
                                    end={item.to === "/admin/dashboard"}
                                    className={({ isActive }) =>
                                        `nav-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >

                                    <span className="nav-icon">
                                        <i
                                            className={`bi ${item.icon}`}
                                        ></i>
                                    </span>

                                    <span className="nav-text">
                                        {item.label}
                                    </span>

                                    {badgeCount !== null &&
                                        badgeCount !== undefined && (
                                            <span className="nav-badge">
                                                {badgeCount}
                                            </span>
                                        )}

                                </NavLink>

                            </li>
                        );

                    })}

                </ul>

            </div>

            {/* ==================================
                FOOTER / ADMIN USER
            ================================== */}

            <div className="sidebar-footer">

                <div className="user-card">

                    <div className="user-avatar">
                        <i className="bi bi-person-circle"></i>
                    </div>

                    <div className="user-info">

                        <p className="user-name">
                            {adminUser.full_name}
                        </p>

                        <p className="user-role">
                            @{adminUser.username} •{" "}
                            {adminUser.role}
                        </p>

                    </div>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <i className="bi bi-box-arrow-right"></i>
                    </button>

                </div>

            </div>

            {/* ==================================
                SIDEBAR CSS
            ================================== */}

            <style>{`

                /* =====================================
                   SIDEBAR WRAPPER
                ===================================== */

                .sidebar-wrapper {
                    width: 260px;
                    height: 100vh;
                    background: linear-gradient(
                        180deg,
                        #0b1120 0%,
                        #15203a 100%
                    );
                    color: #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    padding: 24px 16px;
                    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
                    position: sticky;
                    top: 0;
                    font-family: 'Inter',
                        system-ui,
                        -apple-system,
                        sans-serif;
                    transition: all 0.3s ease;
                    border-right: 1px solid
                        rgba(255, 255, 255, 0.05);
                    box-sizing: border-box;
                }

                /* =====================================
                   BRAND
                ===================================== */

                .sidebar-brand {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding-bottom: 32px;
                    margin-bottom: 8px;
                    border-bottom: 1px solid
                        rgba(255, 255, 255, 0.06);
                }

                .brand-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(
                        135deg,
                        #3b82f6,
                        #6366f1
                    );
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    color: white;
                    box-shadow:
                        0 8px 16px
                        rgba(59, 130, 246, 0.25);
                    flex-shrink: 0;
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .brand-title {
                    font-weight: 700;
                    font-size: 22px;
                    letter-spacing: -0.5px;
                    background: linear-gradient(
                        to right,
                        #f8fafc,
                        #c7d2fe
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .brand-subtitle {
                    font-size: 11px;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #94a3b8;
                    margin-top: 1px;
                }

                /* =====================================
                   NAVIGATION
                ===================================== */

                .sidebar-nav {
                    flex: 1;
                    overflow-y: auto;
                    padding-top: 12px;
                }

                .sidebar-nav::-webkit-scrollbar {
                    width: 4px;
                }

                .sidebar-nav::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 4px;
                }

                .sidebar-nav::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }

                .nav-label {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    color: #64748b;
                    margin: 16px 8px 10px 8px;
                    padding: 0 4px;
                }

                .nav-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .nav-list li {
                    width: 100%;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                    padding: 10px 14px;
                    border-radius: 12px;
                    color: #94a3b8;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 14px;
                    transition: all 0.2s ease;
                    position: relative;
                    gap: 14px;
                    background: transparent;
                    border: none;
                    width: 100%;
                    cursor: pointer;
                    box-sizing: border-box;
                }

                .nav-link:hover {
                    background: rgba(255, 255, 255, 0.06);
                    color: #f1f5f9;
                    transform: translateX(4px);
                }

                .nav-link.active {
                    background: linear-gradient(
                        135deg,
                        rgba(59, 130, 246, 0.15),
                        rgba(99, 102, 241, 0.10)
                    );
                    color: #e2e8f0;
                    box-shadow:
                        0 0 0 1px
                        rgba(59, 130, 246, 0.15);
                }

                .nav-link.active .nav-icon {
                    color: #818cf8;
                }

                .nav-link.active .nav-text {
                    color: #f1f5f9;
                }

                .nav-icon {
                    font-size: 20px;
                    width: 28px;
                    text-align: center;
                    color: #64748b;
                    transition: color 0.2s ease;
                    flex-shrink: 0;
                }

                .nav-link:hover .nav-icon {
                    color: #a5b4fc;
                }

                .nav-text {
                    flex: 1;
                    transition: color 0.2s ease;
                }

                /* =====================================
                   BADGE
                ===================================== */

                .nav-badge {
                    background: linear-gradient(
                        135deg,
                        #3b82f6,
                        #6366f1
                    );
                    color: white;
                    font-size: 11px;
                    font-weight: 600;
                    padding: 2px 10px;
                    border-radius: 20px;
                    margin-left: auto;
                    box-shadow:
                        0 2px 8px
                        rgba(59, 130, 246, 0.3);
                    letter-spacing: 0.3px;
                }

                /* =====================================
                   FOOTER
                ===================================== */

                .sidebar-footer {
                    margin-top: auto;
                    padding-top: 16px;
                    border-top: 1px solid
                        rgba(255, 255, 255, 0.06);
                }

                .user-card {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 8px 10px 4px;
                    border-radius: 14px;
                    background: rgba(255, 255, 255, 0.03);
                    transition: background 0.2s ease;
                }

                .user-card:hover {
                    background: rgba(255, 255, 255, 0.06);
                }

                .user-avatar {
                    font-size: 36px;
                    color: #818cf8;
                    line-height: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .user-avatar i {
                    filter:
                        drop-shadow(
                            0 2px 8px
                            rgba(99, 102, 241, 0.2)
                        );
                }

                .user-info {
                    flex: 1;
                    min-width: 0;
                }

                .user-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #f1f5f9;
                    margin: 0;
                    line-height: 1.3;
                    letter-spacing: -0.2px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .user-role {
                    font-size: 11px;
                    color: #94a3b8;
                    margin: 3px 0 0 0;
                    line-height: 1.3;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-transform: capitalize;
                }

                /* =====================================
                   LOGOUT BUTTON
                ===================================== */

                .logout-button {
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-size: 20px;
                    padding: 7px;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .logout-button:hover {
                    color: #f87171;
                    background: rgba(248, 113, 113, 0.1);
                }

                /* =====================================
                   RESPONSIVE
                ===================================== */

                @media (max-width: 768px) {

                    .sidebar-wrapper {
                        width: 220px;
                        padding: 16px 12px;
                    }

                    .brand-title {
                        font-size: 18px;
                    }

                    .brand-subtitle {
                        font-size: 10px;
                    }

                    .nav-link {
                        font-size: 13px;
                        padding: 8px 12px;
                    }

                    .nav-icon {
                        font-size: 18px;
                        width: 24px;
                    }

                    .user-avatar {
                        font-size: 30px;
                    }

                    .user-name {
                        font-size: 12px;
                    }

                    .user-role {
                        font-size: 10px;
                    }
                }

            `}</style>

        </div>
    );
}

export default Sidebar;