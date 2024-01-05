import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import { DateRange } from "react-date-range";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import useFetch from "../../hooks/useFetch";
import "./all_hotels.scss";
import Search_Item from "../../components/Search_Item/Search_Item";
import Spinner from "../../components/shared/Spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { toast } from "react-hot-toast";

const All_Hotels = () => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(`/hotels`);

  // Pagination variables
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleClick = () => {
    if (destination === "") {
      toast.error("Please provide your Destination ");
      return;
    }
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  // Pagination functions
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

  // Reset page to 1 when destination changes
  useEffect(() => {
    setCurrentPage(1);
  }, [destination]);

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
                placeholder="exmp: madrid, london"
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
                {data &&
                  records.map((item) => (
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

export default All_Hotels;
