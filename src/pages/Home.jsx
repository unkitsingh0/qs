import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import "./css/home.css";
import BaseUrl from "../Components/BaseUrl";
import ShortedLink from "../Components/shortLink/ShortedLink";
import NewQr from "../Components/newQr/NewQr";

function Home() {
  let [cookies, setCookies] = useCookies();
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  // This is for link
  const [showTitleAndDescription, setShowTitleAndDescription] = useState(false);
  let [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // This is for qrcode generation
  const [showTitleAndDescriptionQr, setShowTitleAndDescriptionQr] =
    useState(false);
  let [text, setText] = useState("");
  const [titleQr, setTitleQr] = useState("");
  const [descriptionQr, setDescriptionQr] = useState("");

  const toggleTitleAndDescription = () => {
    setShowTitleAndDescription(!showTitleAndDescription);
  };
  const toggleTitleAndDescriptionQr = () => {
    setShowTitleAndDescriptionQr(!showTitleAndDescriptionQr);
  };

  let [shortedLinkData, setShortedLinkData] = useState(null);
  let [newQrData, setNewQrData] = useState(null);
  let change = (e) => {
    setLink(e.target.value);
  };

  // Sending request to backend to generate new short link
  let GenerateLink = async (e) => {
    let userId = cookies.uid;
    if (!link) return toast.error("Enter Link");

    setLoading(true);
    try {
      let { data } = await axios.post(`${BaseUrl}/api/link`, {
        link,
        title: title ? title : "No Title",
        description: description ? description : "No Description",
        userId,
      });

      if (data.status === "fail") {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      if (data.status === "ok") {
        setShortedLinkData({
          link: data.shortLink,
          title: data.title,
          description: data.description,
          clicks: data.clicks,
          id: data._id,
        });
        setShowTitleAndDescription(false);
        setLoading(false);
        setLink("");
        setTitle("");
        setDescription("");

        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  let deletefunction = async (id) => {
    setLoading(true);
    try {
      let { data } = await axios.delete(`${BaseUrl}/api/link/${id}`);
      if (data.status === "fail") {
        setLoading(false);
        toast.error(data.message);
        return;
      }
      if (data.status === "ok") {
        setShortedLinkData(null);
        setLoading(false);
        toast.success("Link deleted");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  // Sending request to backend to save text to database which user have generated qr
  let GenerateQrText = async (e) => {
    let userId = cookies.uid;
    if (!text) return toast.error("Insert Text");
    setLoading(true);
    try {
      let { data } = await axios.post(`${BaseUrl}/api/qr`, {
        text,
        title: titleQr ? titleQr : "No Title",
        description: descriptionQr ? descriptionQr : "No Description",
        userId,
      });

      if (data.status === "fail") {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      if (data.status === "ok") {
        setNewQrData({
          text: data.message.text,
          title: data.message.title,
          description: data.message.description,
          id: data.message._id,
        });
        setShowTitleAndDescriptionQr(false);
        setLoading(false);
        setText("");
        setTitleQr("");
        setDescriptionQr("");

        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  let deletefunctionQr = async (id) => {
    setLoading(true);
    try {
      let { data } = await axios.delete(`${BaseUrl}/api/qr/${id}`);
      if (data.status === "fail") {
        setLoading(false);
        toast.error(data.message);
        return;
      }
      if (data.status === "ok") {
        setNewQrData(null);
        setLoading(false);
        toast.success("Qrcode Text Deleted");
        return;
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  //If user is not loged in then this will return user to login page
  useEffect(() => {
    // If there nothing in cookies then it will return to login page
    if (Object.keys(cookies).length === 0) {
      return navigate("/auth");
    }
    // If cookies.uid is null and cookies.tokoen is null then it will return to login page
    if (!cookies.uid && !cookies.token) {
      return navigate("/auth");
    }
  }, [cookies, navigate]);
  return (
    <div className="container">
      {/* Link input code */}
      <div className="linkForm">
        <h1 className="HomeHeading">Quickly Shorten Your URLs:</h1>

        <div className="card">
          <div className="card-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="LINK"
                aria-label="LINK"
                aria-describedby="button-addon2"
                onChange={change}
                value={link}
              />
              <button
                className="btn btn-link "
                type="button"
                onClick={GenerateLink}
              >
                Generate
              </button>
            </div>
            {showTitleAndDescription && (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control"
                  placeholder="Description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            )}
          </div>

          <div className="card-footer tAndD text-center">
            <button
              className="btn btn-link"
              onClick={toggleTitleAndDescription}
            >
              {showTitleAndDescription
                ? "Hide Title & Description"
                : "Add Title & Description"}
            </button>
          </div>
        </div>
      </div>
      {/* New short link generated code  */}
      {shortedLinkData && shortedLinkData ? (
        <div className="mt-2">
          <Accordion defaultActiveKey={"0"}>
            <ShortedLink
              title={shortedLinkData.title}
              link={shortedLinkData.link}
              description={shortedLinkData.description}
              clicks={shortedLinkData.clicks}
              index={0}
              id={shortedLinkData.id}
              from="Home"
              deletefunction={deletefunction}
            />
          </Accordion>
        </div>
      ) : null}
      {/* This is for qr */}
      <hr />
      <hr />
      <h1 className="HomeHeading">Quickly Create QR Codes</h1>
      <div className="card">
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Text"
              aria-label="Text"
              aria-describedby="button-addon2"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="btn btn-link "
              type="button"
              onClick={GenerateQrText}
            >
              Generate
            </button>
          </div>
          {showTitleAndDescriptionQr && (
            <>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={titleQr}
                onChange={(e) => setTitleQr(e.target.value)}
              />
              <textarea
                className="form-control"
                placeholder="Description"
                rows="3"
                value={descriptionQr}
                onChange={(e) => setDescriptionQr(e.target.value)}
              />
            </>
          )}
        </div>

        <div className="card-footer tAndD text-center">
          <button
            className="btn btn-link"
            onClick={toggleTitleAndDescriptionQr}
          >
            {showTitleAndDescriptionQr
              ? "Hide Title & Description"
              : "Add Title & Description"}
          </button>
        </div>
      </div>
      {/* New QRcode */}
      {newQrData && newQrData ? (
        <div className="mt-2">
          <Accordion defaultActiveKey={"0"}>
            <NewQr
              title={newQrData.title}
              text={newQrData.text}
              description={newQrData.description}
              index={0}
              id={newQrData.id}
              from="Home"
              deletefunction={deletefunctionQr}
            />
          </Accordion>
        </div>
      ) : null}
      <div>
        <Toaster />
      </div>
      {loading ? (
        <div className="loader">
          <InfinitySpin width="200" color="rgb(12, 214, 12)" />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
