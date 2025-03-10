import React from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
      <Container className="text-center mt-5">
        <h1 className="display-4 fw-bold">Welcome to Task Management App</h1>
      </Container>
    </>
  );
}

export default App;
