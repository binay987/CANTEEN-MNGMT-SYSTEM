import React, { useEffect, useState } from 'react'
import Tu from "../../assets/Tu.png";
import icon from "../../assets/icon.png";
import { ButtonGroup, Dropdown, DropdownButton, Button, Modal } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./AdminPanel.css";
import Cards from '../Cards/Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function AdminPanel() {
  const navigate = useNavigate()
  //Check if Looged in 
  useEffect(() => {
    if (!localStorage.getItem('token'))
      navigate('/')
    else {
      if (localStorage.getItem('isAdmin') === 'false')
        navigate('/user')
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('isAdmin')
    navigate('/')
  }

  const [addItem, setAddItem] = useState(true);
  const [updateItem, setUpdateItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [choosePastOrders, setChoosePastOrders] = useState(false);


  //add item
  const [viewMessage, setViewMessage] = useState(null)
  const [credentials, setCredentials] = useState({ id: '', category: '', name: '', image: '', price: '', unit: '' })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const handleAdd = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/add_item', { item_id: credentials.id, item_name: credentials.name, image: credentials.image.split(/(\\|\/)/g).pop(), category: credentials.category, price: credentials.price, unit: credentials.unit })
      .then(function (response) {
        setCredentials({ id: '', category: '', name: '', image: '', price: '', unit: '' })
        setViewMessage(response.data.message)
        window.location.reload()
      })
      .catch(function (error) {
        setViewMessage("Internal Server Error Occurred")
      })
  }

  //Fetch Item
  const [items, setItems] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/fetch_item')
      .then(function (response) {
        setItems(response.data.data)
      })
  }, [])

  //Fetch User
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/userdetails')
      .then(function (response) {
        setUsers(response.data.data)
      })
  }, [])

  //Fetch Order
  const [orders, setOrders] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/order_details')
      .then(function (response) {
        setOrders(response.data.data)
      })
  }, [])


  //Balance Load Modal
  const [balanceLoadShow, setBalanceLoadShow] = useState(false);
  const [balanceLoadErrorMessage, setBalanceLoadErrorMessage] = useState(null)
  const handleBalanceLoadClose = () => {setBalanceLoadErrorMessage(null); setBalanceLoadShow(false);}
  const handleBalanceLoadShow = () => setBalanceLoadShow(true);
  const [balance, setBalance] = useState({ id:'', amount: 0 })
  const onChangeBalance = (e) => {
    setBalance({ ...balance, [e.target.name]: e.target.value })
  }
  const updateBalance = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/admin/load_balance', { UserId: balance.id, amount: balance.amount })
      .then(function (response) {
        if (response.data.success) {
          setBalance({id:'',amount:0})
          setBalanceLoadErrorMessage("Balance Loaded to that account successfully !")
        }
        else
          setBalanceLoadErrorMessage('Error while Loading amount !')
      })
      .catch(function (error) {
        setBalanceLoadErrorMessage('Internal Server Error !')
      })
  }




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
                      <FontAwesomeIcon icon="fa-solid fa-plus" className='text-white fs-5' /> <span class="ms-1 d-none d-sm-inline" onClick={() => { setAddItem(true); setUpdateItem(false); setDeleteItem(false); setViewUser(false); setChoosePastOrders(false); }}>Add item</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-pen" className='text-white fs-6' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setUpdateItem(true); setAddItem(false); setDeleteItem(false); setViewUser(false); setChoosePastOrders(false); }}>Update item</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-sharp fa-trash" className='text-white fs-6' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setDeleteItem(true); setAddItem(false); setUpdateItem(false); setViewUser(false); setChoosePastOrders(false); }}>Delete item</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-regular fa-user" className='text-white fs-6' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setViewUser(true); setAddItem(false); setUpdateItem(false); setDeleteItem(false); setChoosePastOrders(false); }}>View All Users</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className='text-white fs-5' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setChoosePastOrders(true); setViewUser(false); setAddItem(false); setUpdateItem(false); setDeleteItem(false); }}> Today's Orders</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-dollar-sign" className='text-white fs-5' /><span class="ms-1 d-none d-sm-inline" onClick={handleBalanceLoadShow}> Load Balance</span>
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
                    <Dropdown.Item eventKey="1" className='text-dark'>{localStorage.getItem('name')}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" onClick={handleLogout} className='text-dark'>Log Out</Dropdown.Item>
                  </DropdownButton>
                </div>

              </div>
            </div>
          </div>
          <div class="col p-5">

            {addItem &&
              <>
                <Form onSubmit={handleAdd}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Food ID</Form.Label>
                      <Form.Control type="name" placeholder="Enter Food ID" name="id" onChange={onChange} value={credentials.id} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridInfo">
                      <Form.Label>Category</Form.Label>
                      <Form.Control type="text" placeholder="Breakfast / Snacks / Lunch" name="category" onChange={onChange} value={credentials.category} />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control placeholder="Enter Food Name" name="name" onChange={onChange} value={credentials.name} />
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Food Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={onChange} value={credentials.image} />
                  </Form.Group>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control placeholder="Price" name="price" onChange={onChange} value={credentials.price} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridUnit">
                      <Form.Label>Unit</Form.Label>
                      <Form.Control placeholder="per plate / per glass / per piece" name="unit" onChange={onChange} value={credentials.unit} />
                    </Form.Group>
                    {/* {credentials.id}
                    {credentials.category}
                    {credentials.name}
                    {credentials.image.split(/(\\|\/)/g).pop()}
                    {credentials.price} */}

                    {/* <Form.Group as={Col} controlId="formGridTime">
                      <Form.Label>Preparation time</Form.Label>
                      <Form.Select defaultValue="Choose...">
                        <option>5 min</option>
                        <option>10 min</option>
                        <option>15 min</option>
                        <option>20 min</option>
                        <option>25 min</option>
                      </Form.Select> 
                      </Form.Group>*/}


                  </Row>
                  <button type="submit" class="btn btn-primary mt-3">Add</button>
                </Form>
                <h3 className='text-center text-success'>{viewMessage}</h3>
              </>
            }

            {updateItem &&
              <>
                <h2>Update Item form the Canteen list</h2>
                <Row xs={1} md={3} className="m-4">
                  {items.map(item => (
                    <div key={item.id} className="p-3">
                      <Cards id={item.item_id} image={item.image} category={item.category} name={item.item_name} price={item.price} unit={item.unit} update={true} />
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
                      <Cards id={item.item_id} image={item.image} category={item.category} name={item.item_name} price={item.price} unit={item.unit} delete={true} />
                    </div>
                  ))}
                </Row>
              </>
            }

            {viewUser &&
              <>
                <h2>Users</h2>
                <div className='m-4 p-4'>
                  {/* <div className="filter-by">
                    <p className="m-1 fw-bold">Batch:</p>
                    <select class="form-select w-25" aria-label="Select Batch">
                      <option selected onChange={}>Select Batch</option>
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
                  </div> */}
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
                          <td>{user.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            }

            {choosePastOrders &&
              <>
                <h2>Today's Orders</h2>
                <div className='m-4 p-4'>
                  <table class="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>ID</th>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(user => (
                        <tr key={user.order_id}>
                          <td>{user.order_id}</td>
                          <td>{user.id}</td>
                          <td>{user.item_id}</td>
                          <td>{user.item_name}</td>
                          <td>{user.quantity}</td>
                          <td>{user.total_price}</td>
                          <td>{user.update_time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            }


          </div>
        </div>
      </div>


      <Modal show={balanceLoadShow} onHide={handleBalanceLoadClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Load Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateBalance}>
          <label class="form-label fs-5">Enter User ID</label>
            <input type="text" className='form-control' name="id" onChange={onChangeBalance} value={balance.id} />
            <label class="form-label fs-5">Enter Amount to Load</label>
            <input type="number" className='form-control' name="amount" onChange={onChangeBalance} value={balance.amount} />
            <div className='mt-3 text-center'>
              <button className='btn btn-success w-25' type='submit'>Load</button>
            </div>
          </form>
          <h4 className='text-center text-success mt-3'>{balanceLoadErrorMessage}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBalanceLoadClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

