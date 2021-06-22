import React from 'react';
// import "./filter.css";
import DropdownButton from 'react-bootstrap/Dropdown'
import Dropdown from 'react-bootstrap/Dropdown'

export const Filter = ({ onchange }) => (
  // <input className='search' type='search' placeholder={placeholder}
  //   onChange={onchange}></input>
  <DropdownButton id="dropdown-item-button" title="Dropdown button">
    <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
    <Dropdown.Item value='pending'>Pending</Dropdown.Item>
    <Dropdown.Item value='selected'>Selected</Dropdown.Item>
  </DropdownButton>
)