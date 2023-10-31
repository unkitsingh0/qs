import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allQrAndTexts } from "../redux/slice/qrandtextSlice";
import { useCookies } from "react-cookie";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { InfinitySpin } from "react-loader-spinner";
import "./css/link.css";
import { fetchqrandtext } from "../redux/slice/qrandtextSlice";
import NewQr from "../Components/newQr/NewQr";

function QrAndText() {
  let navigate = useNavigate();
  let [cookies, setCookies] = useCookies();

  let dispatch = useDispatch();
  let texts = useSelector(allQrAndTexts);
  console.log(texts.data);
  //  pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change this as needed
  const totalItems = texts.data.length; // Replace with the actual total number of items

  //   // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = texts.data.slice(startIndex, endIndex);

  //   // Implement functions to handle pagination actions
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
    dispatch(fetchqrandtext(cookies.uid));
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="text-center">
            <h1 className="display-4">Your Qrcodes</h1>
            <p className="lead">Manage, share, your Qrcodes.</p>
          </div>
        </div>
      </div>

      {texts.isLoading ? (
        <div className="loader">
          <InfinitySpin width="200" color="rgb(12, 214, 12)" />
        </div>
      ) : null}

      <div className={`${texts.isLoading ? "noDisplay" : null}`}>
        {texts && texts.data.length === 0 ? (
          <div className="noLink">
            <h4>
              No Qrcode found.
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
                    <NewQr
                      key={item._id}
                      title={item.title}
                      text={item.text}
                      description={item.description}
                      index={index}
                      id={item._id}
                    ></NewQr>
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

export default QrAndText;
