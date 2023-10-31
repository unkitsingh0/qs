import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alllinks, fetchLink } from "../redux/slice/linksSlice";
import { useCookies } from "react-cookie";
import ShortedLink from "../Components/shortLink/ShortedLink";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfinitySpin } from "react-loader-spinner";
import BaseUrl from "../Components/BaseUrl";
import "./css/link.css";
function Links() {
  let navigate = useNavigate();
  let [cookies, setCookies] = useCookies();

  let dispatch = useDispatch();
  let links = useSelector(alllinks);

  //  pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this as needed
  const totalItems = links.data.length; // Replace with the actual total number of items

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = links.data.slice(startIndex, endIndex);

  // Implement functions to handle pagination actions
  const nextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchLink(cookies.uid));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="text-center">
            <h1 className="display-4">Your Shortened Links</h1>
            <p className="lead">
              Manage, share, and track your shortened URLs.
            </p>
          </div>
        </div>
      </div>
      {links.isLoading ? (
        <div className="loader">
          <InfinitySpin width="200" color="rgb(12, 214, 12)" />
        </div>
      ) : null}
      <div className={`${links.isLoading ? "noDisplay" : null}`}>
        {links.data.length === 0 ? (
          <div className="noLink">
            <h4>
              No links found.
              <span
                className="CreateLink"
                onClick={(e) => {
                  navigate("/");
                }}
              >
                Create
              </span>
            </h4>
            <FontAwesomeIcon icon="fa-solid fa-link-slash" />
          </div>
        ) : (
          <>
            <Accordion defaultActiveKey={"0"}>
              {itemsToDisplay &&
                itemsToDisplay.map((item, index) => {
                  return (
                    <ShortedLink
                      key={item.shortLink}
                      title={item.title}
                      link={`${BaseUrl}/${item.shortLink}`}
                      description={item.description}
                      clicks={item.totalClicks}
                      index={index}
                      id={item._id}
                    ></ShortedLink>
                  );
                })}
            </Accordion>
            {/* Pagination controls */}
            <div className="pg-btn mb-2">
              <button
                onClick={prevPage}
                className="btn btn-link"
                disabled={currentPage === 1}
                style={{ width: "30%" }}
              >
                Previous
              </button>
              <p>
                page {currentPage} 0f {Math.ceil(totalItems / 5)}
              </p>
              <button
                className="btn btn-link"
                style={{ width: "30%" }}
                onClick={nextPage}
                disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Links;
