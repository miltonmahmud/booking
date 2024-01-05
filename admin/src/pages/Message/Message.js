import React, { useEffect, useState } from "react";
import Spinner from "../../components/shared/Spinner";
import useFetch from "../../hooks/useFetch";
import Layout from "../Layout/Layout";
import { format } from "date-fns";
import "./messages.scss";
import API from "../../service/API/API";

const Message = () => {
  const [message, setMessage] = useState("");
  const { data, loading } = useFetch("/message");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredData = data.filter(
    (item) =>
      item.email && item.email.toLowerCase().includes(search.toLowerCase())
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/message/count-messages");
        setMessage(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        <div className="main-content">
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div className="header">
                <h2>
                  All Messages <span className="count">({message})</span>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    records.map((item) => (
                      <tr key={item._id}>
                        <td className="name">{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.message}</td>
                        <td>
                          {format(new Date(item.createdAt), "MM/dd/yyyy")}
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
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Message;
