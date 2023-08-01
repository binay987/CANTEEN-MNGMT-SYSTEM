import React, { useState } from 'react'
import Tu from "../../assets/Tu.png";
import icon from "../../assets/icon.png";
import { ButtonGroup, Card, Dropdown, DropdownButton } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./AdminPanel.css";
import Cards from '../Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {items, users} from '../../datas';


export default function AdminPanel() {

  const [addItem, setAddItem] = useState(true);
  const [updateItem, setUpdateItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [viewUser, setViewUser] = useState(false);

  const profile_button = (
    <a class="text-white text-decoration-none">
      <img src={icon} alt="hugenerd" width="30" height="30" class="rounded-circle" />
      <span class="d-none d-sm-inline mx-1">Profile</span>
    </a>
  )


  return (
    <>

      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className='sticky-left'>
              <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <img src={Tu} alt='logo' style={{ width: '80px' }} />
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-plus" className='text-white fs-5' /> <span class="ms-1 d-none d-sm-inline" onClick={() => { setAddItem(true); setUpdateItem(false); setDeleteItem(false); setViewUser(false); }}>Add item</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-pen" className='text-white fs-6'/><span class="ms-1 d-none d-sm-inline" onClick={() => { setUpdateItem(true); setAddItem(false); setDeleteItem(false); setViewUser(false); }}>Update item</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-sharp fa-trash" className='text-white fs-6' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setDeleteItem(true); setAddItem(false); setUpdateItem(false); setViewUser(false); }}>Delete item</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-regular fa-user" className='text-white fs-6' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setViewUser(true); setAddItem(false); setUpdateItem(false); setDeleteItem(false); }}>View All Users</span>
                    </a>
                  </li>

                </ul>
                <hr />


                <div className="mb-2">
                  <DropdownButton
                    as={ButtonGroup}
                    key="up"
                    id={`dropdown-button-drop-up`}
                    drop="up"
                    variant="secondary"
                    title={profile_button}
                  >
                    <Dropdown.Item eventKey="1">Name</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Log Out</Dropdown.Item>
                  </DropdownButton>
                </div>

              </div>
            </div>
          </div>
          <div class="col p-5">

            {addItem &&
              <>
                <Form>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Food Name</Form.Label>
                      <Form.Control type="name" placeholder="Enter Food" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridInfo">
                      <Form.Label>Food Dietary Info</Form.Label>
                      <Form.Control type="text" placeholder="Suitable for: Non-vegetarian/Vegeterian" />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Food Description</Form.Label>
                    <Form.Control placeholder="A juicy patty topped with melted cheese, fresh lettuce, tomatoes, and special sauce." />
                  </Form.Group>

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

                    <Form.Group as={Col} controlId="formGridTime">
                      <Form.Label>Preparation time</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>5 min</option>
                        <option>10 min</option>
                        <option>15 min</option>
                        <option>20 min</option>
                        <option>25 min</option>
                      </Form.Select>
                    </Form.Group>


                  </Row>

                  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>

                  <Button variant="info" type="submit">
                    Add to Cart
                  </Button>
                </Form>

              </>
            }

            {updateItem &&
              <>
                <h2>Update Item form the Canteen list</h2>
                <Row xs={1} md={3} className="m-4">
                  {items.map(item => (
                    <div key={item.id} className="p-3">
                      <Cards id={item.id} image={item.image} name={item.name} price={item.price} unit={item.unit} update={true}/>
                    </div>
                  ))}
                </Row>
              </>

            }

            {deleteItem &&
              <>
                <h2>Remove Item form the Canteen list</h2>
                <Row xs={1} md={3} className="m-4">
                  {items.map(item => (

                    <div key={item.id} className="p-3">
                     
                      
                      <Cards id={item.id} image={item.image} name={item.name} price={item.price} unit={item.unit} delete={true} />


                    </div>
                  ))}
                </Row>
              </>
            }

            {viewUser &&
              <>
                <h2>Users</h2>
                <div className='m-4 p-4'>
                  <div className="filter-by">
                    <p className="m-1 fw-bold">Batch:</p>
                    <select class="form-select w-25" aria-label="Select Batch">
                      <option selected>Select Batch</option>
                      <option value="1">2075</option>
                      <option value="2">2076</option>
                      <option value="3">2077</option>
                      <option value="3">2078</option>
                      <option value="3">2079</option>
                    </select>
                    <p className="m-1 fw-bold">Faculty:</p>
                    <select class="form-select w-25" aria-label="Select Batch">
                      <option selected>Select Batch</option>
                      <option value="1">2075</option>
                      <option value="2">2076</option>
                      <option value="3">2077</option>
                      <option value="3">2078</option>
                      <option value="3">2079</option>
                    </select>
                  </div>
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Roll no</th>
                        <th>Name</th>
                        <th>Batch</th>
                        <th>Faculty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.batch}</td>
                          <td>{user.faculty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            }


          </div>
        </div>
      </div>    </>
  )
}

