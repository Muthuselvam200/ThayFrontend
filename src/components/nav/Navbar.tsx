import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../login/AuthContext";
import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ProfileModal from "./ProfileModal";
import "./navbar.css";
import "../../index.css";

const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [employee, setEmployee] = useState<any>({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const { isLoggedIn, roleName, token, employeeID } = useAuth();

  const employeecall = () => {
    const baseUrl = `https://thay-backend.vercel.app`;
    axios
      .get(`${baseUrl}/api/employee/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const employeeData = response.data[0];
        setEmployee(employeeData);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  useEffect(() => {
    employeecall();
  }, [token, employeeID]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && navbarVisible) {
        setNavbarVisible(false);
      } else if (scrollTop < lastScrollTop && !navbarVisible) {
        setNavbarVisible(true);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, navbarVisible]);

  const handleNavClick = () => {
    setExpanded(false);
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="employee-name-tooltip" {...props}>
      {employee.employeeName} <br />
      {employee.email}
    </Tooltip>
  );

  const handleProfileIconClick = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={expanded}
        className="custom-navbar"
        style={{
          display: "flex",
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: "0 -2px 5px",
          position: "fixed",
          top: 0,
          zIndex: 1000,
          width: "100%",
          transition: "top 0.3s",
          padding: "0 0 0 4px",
        }}
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="m-1"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Brand
          as={NavLink}
          onClick={handleNavClick}
          to="/"
          className="p-2"
        >
          <img
            src="src/assets/images/thayblacklogo.png"
            alt="Company Logo"
            className="img-fluid logo"
          />
        </Navbar.Brand>
        <Nav.Link as={NavLink} to="/" className="p-3" onClick={handleNavClick}>
          Home
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/Services"
          className="p-3"
          onClick={handleNavClick}
        >
          Services
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/AboutUs"
          className="p-3"
          onClick={handleNavClick}
        >
          About Us
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/Clients"
          className="p-3"
          onClick={handleNavClick}
        >
          Clients
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/ContactUs"
          className="p-3"
          onClick={handleNavClick}
        >
          Contact Us
        </Nav.Link>

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav style={{ fontSize: 15 }}>
            {isLoggedIn &&
              (roleName === "admin" || roleName === "superuser") && (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/AttendanceSheet"
                    className="p-3"
                    onClick={handleNavClick}
                  >
                    Attendance Sheet
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/DisplayEmployees"
                    className="p-3"
                    onClick={handleNavClick}
                  >
                    Employees List
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/PaySlip"
                    className="p-3"
                    onClick={handleNavClick}
                  >
                    PaySlip
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/ReadRole"
                    className="p-3"
                    onClick={handleNavClick}
                  >
                    Role Details
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/DisplayHolidays"
                    className="p-3"
                    onClick={handleNavClick}
                  >
                    Holiday list
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/DisplayTime"
                    className="p-3"
                    onClick={handleNavClick}
                  >
                    Attendance
                  </Nav.Link>
                </>
              )}
            {isLoggedIn && roleName === "employee" && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/AttendanceSheet"
                  className="p-3"
                  onClick={handleNavClick}
                >
                  Attendance Sheet
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/DisplayHolidays"
                  className="p-3"
                  onClick={handleNavClick}
                >
                  Holiday list
                </Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link
                  as={NavLink}
                  onClick={handleNavClick}
                  to="/login"
                  className="p-3"
                >
                  Sign in
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  onClick={handleNavClick}
                  to="/signup"
                  className="nav-link-custom p-3"
                >
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        <div
          onClick={handleProfileIconClick}
          style={{ cursor: "pointer", marginRight: "15px" }}
        >
          {isLoggedIn && (
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <div className="ms-2 justify-content-end">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "#1b5954",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "normal",
                  }}
                >
                  {employee.employeeName &&
                    `${employee.employeeName.charAt(0).toUpperCase()}${
                      employee.employeeName.includes(" ")
                        ? employee.employeeName
                            .split(" ")[1]
                            .charAt(0)
                            .toUpperCase()
                        : ""
                    }`}
                </div>
              </div>
            </OverlayTrigger>
          )}
        </div>
      </Navbar>

      <ProfileModal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        profileDetails={employee}
      />
    </>
  );
};

export default CustomNavbar;
