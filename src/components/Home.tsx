import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";
import { useAuth } from "./login/AuthContext";

function Home() {
  const [employee, setEmployee] = useState<any>({});
  const { token, employeeID } = useAuth();

  const employeecall = () => {
    const baseUrl = "https://thay-backend.vercel.app";
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

  const imageContainerStyle: CSSProperties = {
    maxWidth: "768px",
    marginBottom: "40px",
  };

  const imageStyle: CSSProperties = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  return (
    <>
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row align-items-center">
            <div>
              <h2 className="fs-1 mb-2 text-secondary">
                Welcome to THAY Tech!
                <br />
                {employee.employeeName}
              </h2>
              <p
                className="display-5 mb-2 text-secondary"
                style={{ fontSize: "18px" }}
              >
                Thay Technologies is an IT Solutions firm based in Chennai.
                <br /> With its state-of-the-art infrastructure and amicable
                location in the heart of <br />
                the city, Thay Technologies intends to add value to IT
                companies.
              </p>
            </div>
            <div style={imageContainerStyle}>
              <img
                src="src/assets/images/web-des.svg"
                alt="Description"
                style={imageStyle}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
