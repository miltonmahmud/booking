import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./hotels.scss";
import API from "../../service/API/API";

import Hotel from "../../components/Hotel/Hotel";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/shared/Spinner";

const Hotels = () => {
  const [hotels, setHotels] = useState("");
  const { data, loading, error, reFetch } = useFetch("/hotels");
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredData = data.filter(
    (item) =>
      (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
      (item.city && item.city.toLowerCase().includes(search.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(search.toLowerCase())) ||
      (item.cheapestPrice &&
        item.cheapestPrice.toLowerCase().includes(search.toLowerCase()))
  );

  const reversedData = [...filteredData].reverse();
  const records = reversedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const add_hotel = () => {
    setId("");
    setOpenModal(true);
  };

  const edit = (id) => {
    console.log(id);
    setId(id);
    setOpenModal(true);
  };

  const del = async (id) => {
    try {
      await API.delete(`/hotels/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

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
        const res = await API.get("/hotels/count-hotels");
        setHotels(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="main-content">
          <div>
            <div className="header">
              <h2>
                All Hotels <span className="count">({hotels})</span>
              </h2>
              <input
                type="text"
                className="filter"
                placeholder="Search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <button className="add-hotel" onClick={add_hotel}>
                Add Hotel
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="image">Image</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`https://res.cloudinary.com/dvf6qr707/image/upload/${item.photos[0]}`}
                      />
                    </td>
                    <td className="name">{item.name}</td>
                    <td>{item.city}</td>
                    <td>{item.type}</td>
                    <td>${item.cheapestPrice}</td>
                    <td>
                      <div className="action-button">
                        <button className="edit" onClick={() => edit(item._id)}>
                          Edit
                        </button>
                        <button
                          className="delete"
                          onClick={() => del(item._id)}
                        >
                          Delete
                        </button>
                      </div>
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
          {openModal && <Hotel hotelid={id} setOpen={setOpenModal} />}
        </div>
      )}
    </Layout>
  );
};

export default Hotels;
