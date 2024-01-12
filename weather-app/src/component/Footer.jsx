import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className="bg-trasparent border-top border-white text-center text-white mt-5">
      <p className="m-0 py-3">&copy; 2024 Weather EpicApp. Tutti i diritti riservati.</p>
    </Container>
  );
};

export default Footer;
