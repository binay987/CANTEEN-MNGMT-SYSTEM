import React, { useState } from "react";
import "./HomePage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import pc1 from "../../assets/pc1.jpeg";
import LogIn from "../LogIn/LogIn";
import { Card, Tab, Tabs } from "react-bootstrap";
import Canteen from "../../assets/canteen.jpg";
import TopBar from "../TopBar/TopBar";
import Register from "../LogIn/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function () {

  //For signup and signin tabs
  const [key, setKey] = useState('login');

  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token'))
    {
      if(localStorage.getItem('isAdmin'))
        navigate('/admin')
      else
        navigate('/user')
    }
  },[])

  return (
    <section className="homepage">
      <TopBar />
      <div className="container">
        <Row xs="1" md="2">
          <Col className="text-center">
            <img src={Canteen} alt="Image" className="w-50"/>
          
          </Col>
          <Col>
            <Card style={{ width: '100%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px' }}>
              <Card.Body style={{ backgroundImage: `url(${pc1})` }} className="p-4">
                <Card.Text >
                {/* <div style={{ backgroundImage: `url(${pc1})` }}> */}
              
            {/* </div> */}
            <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="login" title="Login">
        <LogIn />
      </Tab>
      <Tab eventKey="register" title="Register">
        <Register />
      </Tab>
    </Tabs>
                </Card.Text>
              </Card.Body>
            </Card>
            
          </Col>
        </Row>
      </div>

    </section>
  );
}
