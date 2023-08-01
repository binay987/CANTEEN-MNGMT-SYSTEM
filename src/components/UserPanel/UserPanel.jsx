
import { Row } from 'react-bootstrap'
import {items} from '../../datas'
import Cards from '../Cards/Cards'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import Tu from "../../assets/Tu.png";
import icon from "../../assets/icon.png";
import Col from 'react-bootstrap/Col';
import { ButtonGroup, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UserPanel() {

  const [chooseBreakfast, setChooseBreakfast] = useState(true);
  const [chooseLaunch, setChooseLaunch] = useState(false);
  const [chooseSnacks, setChooseSnacks] = useState(false);
 

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
                    <FontAwesomeIcon icon="fa-solid fa-utensils"className='text-white fs-5'/><span class="ms-1 d-none d-sm-inline" onClick={() => { setChooseLaunch(true); setChooseBreakfast(false); setChooseSnacks(false); }}>Launch</span>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="nav-link align-middle px-0">
                    <FontAwesomeIcon icon="fa-solid fa-burger" className='text-white fs-5' /><span class="ms-1 d-none d-sm-inline" onClick={() => { setChooseSnacks(true); setChooseBreakfast(false); setChooseLaunch(false);  }}>Snacks</span>
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

            {chooseBreakfast &&
              <>
                

              </>
            }

            {chooseLaunch &&
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

            {chooseSnacks &&
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


          </div>
        </div>
      </div>    </>
  )
}


  

