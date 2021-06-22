import React from 'react';
import "./search.css";

export const Search=({placeholder,onchange})=>(
    <input className='search' type='search' placeholder={placeholder}
    onChange={onchange}></input>
)
        // <input placeholder='search monster' onChange={(e)=>(this.setState({search:e.target.value}))}></input>