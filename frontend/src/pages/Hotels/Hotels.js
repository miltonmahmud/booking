import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { toast } from "react-hot-toast";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import Search_Item from "../../components/Search_Item/Search_Item";
import Spinner from "../../components/shared/Spinner";
import "./hotels.scss";

const Hotels = () => {
  // Routing and navigation
  const location = useLocation();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // Fetching hotel data
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  // Pagination variables
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const { dispatch } = useContext(SearchContext);

  const handleClick = () => {
    if (destination === "") {
      toast.error("Please provide your Destination");
      return;
    }
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    reFetch();
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
    setCurrentPage(1);
  }, [destination]);

  useEffect(() => {
    reFetch();
  }, []);

  return (
    <>
      <Navigation />
      <div className="hotels_list">
        <div className="container">
          <div className="sidebar">
            <h2>Search</h2>
            <div className="destination">
              <span>Destination</span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="checkin-date">
              <span>Duration</span>
              <span
                className="d-date"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>

              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="guest-options">
              <span>Options</span>
              <div>
                <span>Min price per night</span>
                <input type="number" onChange={(e) => setMin(e.target.value)} />
              </div>
              <div>
                <span>Max price per night</span>
                <input type="number" onChange={(e) => setMax(e.target.value)} />
              </div>
              <div>
                <span>Adult</span>
                <input type="number" min={1} placeholder={options.adult} />
              </div>
              <div>
                <span>Children</span>
                <input type="number" min={0} placeholder={options.children} />
              </div>
              <div>
                <span>Room</span>
                <input type="number" min={1} placeholder={options.room} />
              </div>
            </div>
            <button onClick={handleClick} className="search_hotel">
              <FontAwesomeIcon icon={faSearch} className="mr-10" />
              Search
            </button>
          </div>
          <div className="main_content">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {records.map((item) => (
                  <Search_Item item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
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
      <Newsletter />
      <Footer />
    </>
  );
};

export default Hotels;
