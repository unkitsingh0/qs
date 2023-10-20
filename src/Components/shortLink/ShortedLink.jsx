import React, { useRef, useState } from "react";
import copy from "copy-to-clipboard";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Toaster, toast } from "react-hot-toast";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import "./css/shortedLink.css";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import { deleteLink } from "../../redux/slice/linksSlice";
import { InfinitySpin } from "react-loader-spinner";
function ShortedLink({
  title,
  link,
  description,
  clicks,
  index,
  id,
  from,
  deletefunction,
}) {
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const divToCaptureRef = useRef(null);
  const captureScreenshot = () => {
    if (divToCaptureRef.current) {
      html2canvas(divToCaptureRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          saveAs(blob, "screenshot.png");
        });
      });
    }
  };
  let deleteLinkfunction = async (id) => {
    if (!id) return toast.error("No LinkId found");
    setLoading(true);
    try {
      let { data } = await axios.delete(`${BaseUrl}/api/link/${id}`);
      if (data.status === "ok") {
        dispatch(deleteLink(data.message));
        setLoading(false);
        toast.success("Link Deleted");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="generatedLink  mb-2 ">
      <Accordion.Item eventKey={`${index}`}>
        <Accordion.Header>
          <div className="heading_accordion">
            {/* title part */}
            <span>
              <span className="title">
                {`${title[0].toUpperCase()}${title.slice(1)}`}
              </span>
              <span
                onClick={(e) => {
                  copy(link.slice(8));
                  toast.success("Link copied");
                }}
              >
                : {link.slice(8)}
              </span>
            </span>

            <span className="qrClick">
              <span className="qr">
                <FontAwesomeIcon icon="fa-solid fa-qrcode" />
              </span>
              <span className="accordion_clicks">
                {clicks}
                <FontAwesomeIcon
                  icon="fa-solid fa-computer-mouse"
                  className="ms-2 hide_mouse"
                />
              </span>
            </span>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <div className="qrCode col" ref={divToCaptureRef}>
              <h3 className="HomeHeading text-center">{`${title[0].toUpperCase()}${title.slice(
                1
              )}`}</h3>

              <QRCode
                value={link}
                className="mb-3 main_qrCode "
                style={{ width: "100%" }}
              />
            </div>
            <div className="ms-3 col-sm description " style={{ width: "100%" }}>
              <p className="ms-1">
                <span>Description:</span>
                {description}
              </p>
            </div>
            <div className="col-sm ">
              <h1 className="text-center clicks">{clicks}</h1>
              <h1 className="text-center">Clicks</h1>
              <hr style={{ fontWeight: "500" }} className="HomeHeading" />
              <button
                className="btn btn-link mb-2 mt-2 "
                style={{ width: "100%" }}
                onClick={(e) => {
                  copy(link.slice(8));
                  toast.success("Link copied");
                }}
              >
                Copy Link
              </button>
              <button
                className="btn btn-link"
                style={{ width: "100%" }}
                onClick={captureScreenshot}
              >
                Download QR
              </button>
              <button
                className="btn btn-danger mt-1"
                style={{ width: "100%" }}
                onClick={(e) => {
                  from === "Home" ? deletefunction(id) : deleteLinkfunction(id);
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-trash"
                  style={{ color: "white" }}
                />
              </button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>

      {loading ? (
        <div className="loader">
          <InfinitySpin width="200" color="rgb(12, 214, 12)" />
        </div>
      ) : null}

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default ShortedLink;
