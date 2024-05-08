import {React, useState} from "react";

import './Input.css'

function Test() {

const [value, setValue] = useState('');

const options = [
  { name: 'Option Mosc' },
  { name: 'Opti' },
  { name: 'Nana' },
  { name: 'Na' },
  { name: '5' },
];

  return (
    <>
      <form>
        <label >
         <input name="test"  id ='drop-input' value={value} onChange={(e) => setValue(e.target.value.toLowerCase())}/> 
        </label>
      </form>
      <div className='dropdown' id ='results-container'>
        {options.map((item) => {
          if (value !== '') {
            if (item.name.toLowerCase().includes(value)) {
              return <div className="option" id={item.name} key={item.name} onClick={(e) => setValue(item.name)}>{item.name}</div>
            } else {
              return null
            }
          }
        })}
      </div>
    </>
    
  )
}

export default Test;