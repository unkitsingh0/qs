import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutUsPhoto from "../assets/pic/aboutus.jpg";
function AboutUs() {
  return (
    <Container className="my-5">
      <Row>
        <Col lg={7}>
          <h2 style={{ color: "rgb(12, 214, 12)" }}>About Us</h2>
          <p>
            Welcome to QuikShort, your go-to platform for swift URL shortening
            and QR code creation. We're all about making your online and offline
            sharing hassle-free.
          </p>
          <h3 style={{ color: "rgb(12, 214, 12)" }}>Our Mission</h3>
          <p>
            At QuikShort, we're dedicated to simplifying the web. Our mission is
            to provide you with easy-to-use tools for succinct link sharing and
            QR code generation.
          </p>
          <h3 style={{ color: "rgb(12, 214, 12)" }}>What We Offer</h3>
          <ul>
            <li>
              <strong>URL Shortening:</strong> Transform long URLs into snappy,
              shareable links.
            </li>
            <li>
              <strong>QR Code Generation: </strong> Create QR codes effortlessly
              for links and custom text.
            </li>
          </ul>
          <h3 style={{ color: "rgb(12, 214, 12)" }}>Why Choose Us?</h3>
          <ul>
            <li>
              <strong>User-Friendly:</strong> Our platform is designed for
              simplicity.
            </li>
            <li>
              <strong>Fast and Reliable: </strong> Get speedy URL shortening and
              QR code generation.
            </li>
            <li>
              <strong>Privacy and Security: </strong> Your data's safety is
              paramount.
            </li>
            <li>
              <strong>Free and Accessible:</strong> Our services are free and
              available to everyone.
            </li>
          </ul>
          <h3 style={{ color: "rgb(12, 214, 12)" }}>Get Started Today</h3>
          <p>Streamline your sharing with QuikShort - try it now!</p>
          <h3 style={{ color: "rgb(12, 214, 12)" }}>Contact Us</h3>
          <p>
            Questions? Reach out to our support at
            <a href="mailto:ankitsingh.302.as@gmail.com">Send an email</a>.
          </p>
          <p>
            Thank you for choosing QuikShort - we're here to simplify your
            digital world.
          </p>
        </Col>
        <Col lg={5}>
          <img src={aboutUsPhoto} alt="About Us" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
