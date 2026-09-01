import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

// ==============================
// Dynamic nav items list
// countKey links each item to a live count fetched from the API.
// Items without a countKey (Dashboard, etc.) show no badge
// unless you add a matching endpoint below.
// ==============================
const navItems = [
  { to: "/", label: "Dashboard", icon: "bi-speedometer2", end: true },
  { to: "/users", label: "Users", icon: "bi-journal-check", countKey: "users" },
  { to: "/bookings", label: "Bookings", icon: "bi-journal-check", countKey: "bookings" },
  { to: "/bookingtravelers", label: "Booking Travelers", icon: "bi-journal-check", countKey: "bookingtravelers" },
  { to: "/bookingaddons", label: "Booking Addons", icon: "bi-journal-check", countKey: "bookingaddons" },
  { to: "/addons", label: "Addons", icon: "bi-journal-check", countKey: "addons" },
  { to: "/tourschedules", label: "Tourschedules", icon: "bi-map", countKey: "tourschedules" },
  { to: "/tourpackages", label: "Tourpackages", icon: "bi-map", countKey: "tourpackages" },
  { to: "/reviews", label: "Reviews", icon: "bi-star", countKey: "reviews" },
  { to: "/customers", label: "Customers", icon: "bi-people", countKey: "customers" },
  { to: "/payments", label: "Payments", icon: "bi-people", countKey: "payments" },
  { to: "/notifications", label: "Notifications", icon: "bi-bell", countKey: "notifications" },
];

// ==============================
// Maps each countKey to the API endpoint that returns its list.
// Badge shows the number of items returned (res.data.length or res.data.data.length).
// Adjust these paths to match your actual list routes.
// ==============================
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
  notifications: "/notifications",
};

function Sidebar() {
  const { http } = AuthUser();
  const [counts, setCounts] = useState({});

  // ==============================
  // Fetch live counts for every nav item on mount
  // ==============================
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
              : res.data?.data || [];
            return [key, list.length];
          } catch (error) {
            console.log(`Count fetch failed for ${key}:`, error);
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

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <i className="bi bi-airplane-fill"></i>
        </div>
        <div className="brand-text">
          <span className="brand-title">Travel</span>
          <span className="brand-subtitle">Admin</span>
        </div>
      </div>

      <div className="sidebar-nav">
        <p className="nav-label">MAIN</p>
        <ul className="nav-list">
          {navItems.map((item) => {
            const badgeCount = item.countKey
              ? counts[item.countKey]
              : null;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <span className="nav-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </span>
                  <span className="nav-text">{item.label}</span>
                  {badgeCount !== null && badgeCount !== undefined && (
                    <span className="nav-badge">{badgeCount}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <p className="user-role">Super Admin</p>
          </div>
          <i className="bi bi-three-dots-vertical user-menu"></i>
        </div>
      </div>

      <style>{`
        /* Sidebar Wrapper */
        .sidebar-wrapper {
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #0b1120 0%, #15203a 100%);
          color: #e2e8f0;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
          position: sticky;
          top: 0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          transition: all 0.3s ease;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Brand Area */
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 32px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: white;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25);
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
          background: linear-gradient(to right, #f8fafc, #c7d2fe);
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

        /* Navigation */
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
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #f1f5f9;
          transform: translateX(4px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.10));
          color: #e2e8f0;
          box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.15);
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

        .nav-badge {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
          margin-left: auto;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
          letter-spacing: 0.3px;
        }

        /* Footer User Card */
        .sidebar-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 8px 8px 4px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          transition: background 0.2s ease;
          cursor: default;
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
          filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.2));
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
        }

        .user-role {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.3;
        }

        .user-menu {
          color: #64748b;
          font-size: 18px;
          padding: 4px;
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .user-menu:hover {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.05);
        }

        /* Responsive tweaks */
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
        }
      `}</style>
    </div>
  );
}

export default Sidebar;