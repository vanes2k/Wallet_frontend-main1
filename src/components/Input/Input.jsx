import React, { useState,  useMemo, useCallback, useEffect } from "react";
import DatalistInput from 'react-datalist-input';

import './Input.css'

function InputWithDrop({label, placeholder, value, setValue, onInput}) {

  const options = [
    { name: 'Option 1' },
    { name: 'Option 2' },
    { name: 'Option 3' },
    { name: 'Option 4' },
    { name: 'Option 5' },
  ];

  const [item, setItem] = useState();
  // const [value, setValue] = useState('')
    /**
   * The onSelect callback function is called if the user selects one option out of the dropdown menu.
   * @param selectedItem object (the selected item / option)
   */
    const onSelect = useCallback((selectedItem) => {
      setItem(selectedItem);
      setValue(selectedItem.value)
    }, []);
  
    
    // Make sure each option has an unique id and a value
    const items = useMemo(
      () =>
        options.map((option) => ({
          // required: id and value
          id: option.name,
          value: option.name,
          // optional: label, node
          // label: option.name, // use a custom label instead of the value
          // node: option.name, // use a custom ReactNode to display the option
          ...option, // pass along any other properties to access in your onSelect callback
        })),
      [],
    );
  return (
    <DatalistInput 
      initialValue='option'
      onInput={onInput}
      value ={value}
      label={label}
      placeholder={placeholder}
      items={items}
      onSelect={onSelect}
    />
  )
}

export default InputWithDrop;