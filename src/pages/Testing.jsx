import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutUsPhoto from "../assets/pic/aboutus.jpg";
function AboutUs() {
  return (
    <Container className="my-5">
      <Row>
        <Col lg={7}>
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            vehicula felis ut ligula lacinia, a tincidunt urna mattis. Sed nec
            justo eu risus sollicitudin volutpat sit amet at velit. Sed gravida
            orci at justo ultrices, ac ultrices orci tincidunt.
          </p>
          <p>
            Vestibulum sagittis urna sit amet sapien dapibus, a egestas metus
            aliquet. Morbi in augue nec dui volutpat vehicula.
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
