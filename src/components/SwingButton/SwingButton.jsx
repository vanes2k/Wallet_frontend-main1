import React from "react";

import './SwingButton.css'

function SwingButton({ activButton, changeActivButton, items }) {

  return (

    <div className="swing-button__container swing-button__container_capital">
      {items.map((button) => (
        <button className={activButton===button.name
        ? "button  swing-button margin-swing swing-button_capital"
        : "button  swing-button margin-swing swing-button_capital swing-button_disabled" }
        name={button.name} 
        key={button.name}
        onClick={(e) => changeActivButton(e)}>{button.description}
        </button>
        ))
      }
    </div>    
  )
}

export default SwingButton;