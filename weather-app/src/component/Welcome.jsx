import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container className="text-white">
      <Row className="mt-5">
        <Col>
          <h2 className="display-5 mt-2 mb-0">Benvenuto su</h2>
          <h1 className="display-4 my-4" style={{ fontWeight: "bold" }}>
            Weather EpicApp
          </h1>
          <img
            src="https://www.supercolors.it/wp-content/uploads/2017/09/tempo-2.gif"
            alt="gif"
            className="img-fluid border-rounded-2 shadow-lg mb-5"
            style={{
              borderRadius: "10px",
            }}
          />
          <p className="display-6 fs-3">Vuoi sapere se ti serve l'ombrello?</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
