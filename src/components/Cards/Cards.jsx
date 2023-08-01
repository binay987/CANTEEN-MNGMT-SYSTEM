import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Cards(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card className="card">
        <Card.Img variant="top" src={props.image} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title> {props.name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>{props.price} {props.unit}</ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
          {props.update &&
            <Button variant="info" onClick={handleShow}>Update Item</Button>
          }
          {props.delete &&
            <Button variant="danger" onClick={handleShow}>Remove Item</Button>
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
        {props.update &&
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
        }
        <Modal.Footer>
          {props.update && <>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
          </>
          }

          {props.delete && <>
          <Button variant="danger" onClick={handleClose}>
            Yes
          </Button>
          <Button variant="success" onClick={handleClose}>
            No
          </Button>
          </>
          }
        </Modal.Footer>
      </Modal >
    </>
  )
}
