import React from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { ImFacebook, ImTwitter } from "react-icons/im";
import { BsFillPencilFill, BsInstagram } from "react-icons/bs";

import Base from "../components/Base";

function About() {
  return (
    <Base
      title="Electro Store / About Us"
      description="In this page you can know about me."
      buttonEnabled={true}
      buttonLink="/"
      buttonType="warning"
      buttonText="Home"
    >
      {/* <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}> */}
      <Container className="py-5 h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="6" className="mb-4 mb-lg-0">
            <Card className="mb-3" style={{ borderRadius: ".5rem" }}>
              <Row className="g-0">
                <Col
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <Card.Img
                    src="https://i.pinimg.com/1200x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <h5>Sabeer Hussain</h5>
                  <Card.Text>Full Stack Developer</Card.Text>
                  <BsFillPencilFill />
                </Col>
                <Col md="8">
                  <Card.Body className="p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Email</h6>
                        <Card.Text className="text-muted">
                          info@example.com
                        </Card.Text>
                      </Col>
                      <Col size="6" className="mb-3">
                        <h6>Phone</h6>
                        <Card.Text className="text-muted">
                          123 456 789
                        </Card.Text>
                      </Col>
                    </Row>

                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <Row className="pt-1">
                      <Col size="6" className="mb-3">
                        <h6>Email</h6>
                        <Card.Text className="text-muted">
                          info@example.com
                        </Card.Text>
                      </Col>
                      <Col size="6" className="mb-3">
                        <h6>Phone</h6>
                        <Card.Text className="text-muted">
                          123 456 789
                        </Card.Text>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-center">
                      <a href="#!">
                        <ImFacebook className="me-3" />
                      </a>
                      <a href="#!">
                        <ImTwitter className="me-3" />
                      </a>
                      <a href="#!">
                        <BsInstagram className="me-3" />
                      </a>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* </section> */}
    </Base>
  );
}

export default About;
