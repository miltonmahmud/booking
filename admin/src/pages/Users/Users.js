import React, { useEffect, useState } from "react";
import Spinner from "../../components/shared/Spinner";
import useFetch from "../../hooks/useFetch";
import API from "../../service/API/API";
import Layout from "../Layout/Layout";
import { format } from "date-fns";
import "./users.scss";

const Users = () => {
  const [user, setUser] = useState("");
  const { data, loading, error, reFetch } = useFetch("/users");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredData = data.filter(
    (item) =>
      (item.username &&
        item.username.toLowerCase().includes(search.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase()))
  );

  const reversedData = [...filteredData].reverse();
  const records = reversedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleClick = async (id) => {
    console.log(id);
    try {
      await API.delete(`/users/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/users/get_users_count");
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        {loading ? (
          <Spinner />
        ) : (
          <div className="main-content">
            <div>
              <div className="header">
                <h2>
                  All Users <span className="count">({user})</span>
                </h2>
                <input
                  type="text"
                  className="filter"
                  placeholder="Search ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="date">Created</th>
                    <th className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    records.map((item) => (
                      <tr key={item._id}>
                        <td className="image">
                          <img
                            src={
                              item.photo && item.photo[0]
                                ? `https://res.cloudinary.com/dvf6qr707/image/upload/${item.photo[0]}`
                                : "https://res.cloudinary.com/dvf6qr707/image/upload/v1703860808/dummy_image_vq3ets.png"
                            }
                            alt=""
                          />
                        </td>
                        <td className="name">{item.username}</td>
                        <td>{item.email}</td>
                        <td className="date">
                          {format(new Date(item.createdAt), "MM/dd/yyyy")}
                        </td>
                        <td className="del">
                          <button onClick={() => handleClick(item._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="pagination-section">
                <ul className="pagination">
                  <li>
                    <button
                      className="page-index"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      <button
                        className="page-index"
                        onClick={() => changePage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      className="page-index"
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Users;
