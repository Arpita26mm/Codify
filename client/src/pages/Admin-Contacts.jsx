import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();
  const getContactsData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/contacts`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("contact data: ", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-users-section content-container">
        <div className="container">
          <div className="Adminhead">Users Feedbacks</div>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((curContactData, index) => {
                return (
                  //we are returning a single row one by one as per map
                  <tr key={index}>
                    <td>
                      <h2>{curContactData.username}</h2>
                    </td>
                    <td>
                      <h2>{curContactData.email}</h2>
                    </td>
                    <td>
                      <h2>{curContactData.message}</h2>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
