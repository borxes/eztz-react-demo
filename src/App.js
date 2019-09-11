import React from 'react';
import Verifier from './Verifier';

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

function App() {
  return (
    <div>
      <Jumbotron className="text-center">
        <h1>Eztz React Demo</h1>
        <p>
          Interacting with a smart contract deployed on the Tezos Alphanet testnet.
        </p>
      </Jumbotron>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}> <Verifier /></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
