
import { Row } from 'react-bootstrap'
// import { items } from '../../datas'
import Cards from '../Cards/Cards'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Tu from "../../assets/Tu.png";
import icon from "../../assets/icon.png";
import Col from 'react-bootstrap/Col';
import { ButtonGroup, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserPanel.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserPanel() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [chooseBreakfast, setChooseBreakfast] = useState(true);
  const [chooseLaunch, setChooseLaunch] = useState(false);
  const [chooseSnacks, setChooseSnacks] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    localStorage.removeItem('balance')
    navigate('/')
  }


  //Check if Looged in 
  useEffect(()=>{
    if(!localStorage.getItem('token'))
      navigate('/')
  },[])

  //Fetch items
  const [viewError, setViewError] = useState(null)
  useEffect(() => {
    axios.post('http://localhost:5000/api/fetch_item', {})
      .then(function (response) {
        console.log(response)
        if (response.data.success) {
          setItems(response.data.data)
        }
        else {
          setViewError('Unable to Fetch Items')
        }
      })
      .catch(function (error) {
        setViewError('Unable to Fetch Items. Internal Server Error')
      })
  }, [])

  //Search
  const [credentials, setCredentials] = useState({search:''})
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
    console.log(credentials.search)
    axios.post('http://localhost:5000/api/search',{keyword: credentials.search})
    .then(function(response){
      setItems(response.data.data)
    })
    if(credentials.search.length<=3)
    {
      axios.post('http://localhost:5000/api/fetch_item', {})
      .then(function (response) {
        console.log(response)
        if (response.data.success) {
          setItems(response.data.data)
        }
        else {
          setViewError('Unable to Fetch Items')
        }
      })
      .catch(function (error) {
        setViewError('Unable to Fetch Items. Internal Server Error')
      })
    }
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
                      <FontAwesomeIcon icon="fa-solid fa-mug-hot" className='text-white fs-5' /> <span class="ms-1 d-none d-sm-inline" onClick={() => { setChooseBreakfast(true); setChooseLaunch(false); setChooseSnacks(false); }}>Breakfast</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-utensils" className='text-white fs-5' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setChooseLaunch(true); setChooseBreakfast(false); setChooseSnacks(false); }}>Launch</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                      <FontAwesomeIcon icon="fa-solid fa-burger" className='text-white fs-5' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setChooseSnacks(true); setChooseBreakfast(false); setChooseLaunch(false); }}>Snacks</span>
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
                    <Dropdown.Item eventKey="1">{localStorage.getItem('name')}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4" onClick={handleLogOut}>Log Out</Dropdown.Item>
                  </DropdownButton>
                </div>

              </div>
            </div>
          </div>
          <div class="col p-5">
            <div className='top-container pl-2 pr-2'>
              <h5 className='available-balance'>Available Balance: Rs. {localStorage.getItem('balance')}</h5>
              <div className='d-flex flex-row'>
                <div class="input-group w-50">
                  <input type="text" class="form-control" placeholder="Search for item" name="search" onChange={onChange} value={credentials.search} />
                  <div class="input-group-append">
                    <button class="btn btn-secondary" type="button">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className='d-flex justify-content-end w-50'>
                  <button className='btn btn-success'>Load Balance</button>
                </div>
              </div>
            </div>

            {chooseBreakfast &&
              <>
                <Row xs={1} md={3} className="m-4">
                  {items.map(item => (
                    <>
                      {
                        item.category === 'Breakfast' ?
                          <div key={item.item_id} className="p-3">
                            <Cards id={item.item_id} image={item.image} name={item.item_name} price={item.price} buy={true} />
                          </div>
                          :
                          <></>
                      }
                    </>
                  ))}
                </Row>

              </>
            }

            {chooseLaunch &&
              <>

                {/* <h2 className='text-center'>Lunch Items</h2> */}
                <Row xs={1} md={3} className="m-4">
                  {items.map(item => (
                    <>
                      {
                        item.category === 'Lunch' ?
                          <div key={item.item_id} className="p-3">
                            <Cards id={item.item_id} image={item.image} name={item.item_name} price={item.price} buy={true} />
                          </div>
                          :
                          <></>
                      }
                    </>
                  ))}
                </Row>
              </>

            }

            {chooseSnacks &&
              <>
                <Row xs={1} md={3} className="m-4">
                  {items.map(item => (
                    <>
                      {
                        item.category === 'Snacks' ?
                          <div key={item.item_id} className="p-3">
                            <Cards id={item.item_id} image={item.image} name={item.item_name} price={item.price} buy={true} />
                          </div>
                          :
                          <></>
                      }
                    </>
                  ))}
                </Row>
              </>
            }
            <h4 className='text-center text-danger'>{viewError}</h4>

          </div>
        </div>
      </div>    
      </>
  )
}




