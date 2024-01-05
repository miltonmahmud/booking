import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import API from "../../service/API/API";
import Layout from "../Layout/Layout";
import { format } from "date-fns";
import "./homepage.scss";

const Homepage = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [hotels, setHotels] = useState("");

  const { data, loading } = useFetch(`/subscriber/recent-subscribers?limit=10`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await API.get("/users/get_users_count");
        const res2 = await API.get("/message/count-messages");
        const res3 = await API.get("/hotels/count-hotels");
        setUser(res1.data);
        setMessage(res2.data);
        setHotels(res3.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="overview">
        <div className="title1">
          <i>
            <box-icon
              type="solid"
              name="dashboard"
              color="white"
              size="20px"
            ></box-icon>
          </i>
          <span className="text">Dashboard</span>
        </div>

        <div className="boxes">
          <div className="box box1">
            <i className="f-icon">
              <box-icon color="#fff" name="group" size="lg"></box-icon>
            </i>
            <span className="text">Total Users</span>
            <span className="number">{user || 0}</span>
          </div>
          <div className="box box2">
            <i className="f-icon">
              <box-icon color="#fff" name="hotel" size="lg"></box-icon>
            </i>
            <span className="text">Total Hotels</span>
            <span className="number">{hotels || 0}</span>
          </div>
          <div className="box box3">
            <i className="f-icon">
              <box-icon color="#fff" name="message-dots" size="lg"></box-icon>
            </i>
            <span className="text">Total Messages</span>
            <span className="number">{message || 0}</span>
          </div>
        </div>
      </div>

      <div className="activity">
        <div className="title1">
          <i>
            <box-icon color="#3554d1" name="stopwatch" color="white"></box-icon>
          </i>
          <span className="text">Recent Subscribers</span>
        </div>
        <div className="sub-activity">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th className="created">Created</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item.email}</td>
                    <td className="date">
                      {format(new Date(item.createdAt), "MM/dd/yyyy")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
