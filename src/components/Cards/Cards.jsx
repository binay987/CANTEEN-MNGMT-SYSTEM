import React from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import "./Cards.css"
import axios from 'axios';

export default function Cards(props) {

  //Quantity Toggler
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(props.price)
  const decQuantity = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setTotalPrice((quantity - 1) * props.price)
    }
  }
  const incQuantity = (e) => {
    e.preventDefault();
    if (quantity <= 5) {
      setQuantity(quantity + 1)
      setTotalPrice((quantity + 1) * props.price)
    }
  }

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => { setQuantity(1); setShow(false) };
  const handleShow = () => setShow(true);

  //Update Item
  const [viewMessage, setViewMessage] = useState(null)
  const [credentials, setCredentials] = useState({ id: props.id, category: props.category, name: props.name, image:props.image, price: props.price })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/update_item', { item_id: credentials.id, item_name: credentials.name, image: credentials.image.split(/(\\|\/)/g).pop(), category: credentials.category, price: credentials.price })
      .then(function (response) {
        if(response.data.success)
        {
          setCredentials({ id: '', category: '', name: '', image: '', price: '' })
          setViewMessage(response.data.message)
          setTimeout(() => {
            handleClose()
          window.location.reload()
          }, 2000);
        }
        setViewMessage(response.data.message)
      })
      .catch(function (error) {
        setViewMessage("Internal Server Error Occurred")
      })
  }
  const handleDelete = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/delete_item', { item_id: credentials.id })
    .then(function (response) {
      if(response.data.success)
      {
        setCredentials({ id: '', category: '', name: '', image: '', price: '' })
        setViewMessage(response.data.message)
        setTimeout(() => {
          handleClose()
          window.location.reload()
        }, 2000);
      }
      setViewMessage(response.data.message)
    })
    .catch(function (error) {
      setViewMessage("Internal Server Error Occurred")
    })
  }

  return (
    <>
      <Card className="card">
        <Card.Img variant="top" src={require(`../../assets/${props.image}`)} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title className='fs-4'> {props.name}</Card.Title>
          <h5>Rs. {props.price}</h5>
          {props.update &&
            <Button variant="info" onClick={handleShow}>Update Item</Button>
          }
          {props.delete &&
            <Button variant="danger" onClick={handleShow}>Remove Item</Button>
          }
          {props.buy &&
            <Button variant="info" onClick={handleShow}>Buy</Button>
          }
        </Card.Body>
      </Card>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.update && <>Update Require Details</>}
            {props.delete && <>Are you Sure you want to delete?</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {props.buy &&
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <img className='img' src={require(`../../assets/${props.image}`)} style={{ height: '200px' }} />
              <span className='fs-3 fw-bold'> {props.name}</span>
              <span className='fs-5'>Price: Rs. {props.price}</span>
              <form id='myform' class='quantity'>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                  <span className='fs-5'>Quantity&ensp;</span>
                  <input type='button' value='-' class='qtyminus minus' onClick={decQuantity} />&nbsp;
                  <input type='text' name='quantity' value={quantity} class='qty' />&nbsp;
                  <input type='button' value='+' class='qtyplus plus' onClick={incQuantity} />
                </div>
                <span className='fs-5'>Total Price: Rs. {totalPrice}</span>
              </form>
            </div>
          }

          {(props.update || props.delete) &&
            <Form onSubmit={props.update?handleUpdate:handleDelete}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Food ID</Form.Label>
                  <Form.Control type="name" placeholder="Enter Food" name="id" onChange={onChange} value={credentials.id} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridInfo">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" placeholder="Suitable for: Non-vegetarian/Vegeterian" name="category" onChange={onChange} value={credentials.category} />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridDescription">
                <Form.Label>Food Name</Form.Label>
                <Form.Control placeholder="A juicy patty topped with melted cheese, fresh lettuce, tomatoes, and special sauce." name="name" onChange={onChange} value={credentials.name} />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Food Image</Form.Label>
                <Form.Control type="text" name="image" onChange={onChange} value={credentials.image} />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control placeholder="Price" name="price" onChange={onChange} value={credentials.price} />
                </Form.Group>
              </Row>
              <div className="mb-3 text-center">
              <button className={`btn ${props.update?'btn-success':'btn-danger'} w-25`} type="submit">{props.update?'Save':'Delete'}</button>
              </div>
              <h4 className='text-center text-success pt-2'>{viewMessage}</h4>
            </Form>
          }
        </Modal.Body>
        {/* {props.update &&
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Food Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Full plate price" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Half plate price" />
              </Form.Group>
            </Row>
          </Modal.Body>
        } */}
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
        </Modal.Footer>
      </Modal >
    </>
  )
}
