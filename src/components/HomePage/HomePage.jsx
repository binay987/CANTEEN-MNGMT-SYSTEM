import React from "react";
import "./HomePage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import pc1 from "../../assets/pc1.jpeg";
import LogIn from "../LogIn/LogIn";
import { Card } from "react-bootstrap";
import Canteen from "../../assets/canteen.jpg";
import TopBar from "../TopBar/TopBar";
import Carousel from 'react-bootstrap/Carousel';

export default function () {

  return (
    <section className="homepage">
      <TopBar />
      <div className="container">
        <Row xs="1" md="2">
          <Col className="text-center">
            {/* <img src={Canteen} alt="Image" className="w-50"/> */}
            <Carousel data-bs-theme="dark">
      <Carousel.Item interval={500}>
        <img
          className="d-block w-25"
          src={Canteen}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=eee"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=e5e5e5"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>



          </Col>
          <Col>
            <Card style={{ width: '100%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}>
              <Card.Body style={{ backgroundImage: `url(${pc1})` }} className="p-4">
                <Card.Text >
                {/* <div style={{ backgroundImage: `url(${pc1})` }}> */}
              <LogIn />
            {/* </div> */}
                </Card.Text>
              </Card.Body>
            </Card>
            
          </Col>
        </Row>
      </div>

    </section>
  );
}
