function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-4 py-3 d-flex justify-content-end">
      <div className="d-flex align-items-center gap-3">
        <i className="bi bi-bell fs-5"></i>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-person-circle fs-4"></i>
          <span className="fw-semibold">Admin</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;