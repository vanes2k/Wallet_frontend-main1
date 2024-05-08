import React, { useCallback, useEffect } from "react";
import { VALIDATION } from "../utils/constants";

//хук для управления и валидации
export function useForm() {

  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);


  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    
    switch (name) {
      case 'email':
        target.validity.patternMismatch
          ? target.setCustomValidity("VALIDATION.email.message")
          : target.setCustomValidity('')
        break;

      case 'passwordCheck':
         value !== values.password 
          ? target.setCustomValidity("Пароли не совпадают") 
          : target.setCustomValidity('')
        break;

      default: target.setCustomValidity('')
}

    setValues({...values, [name]: value});
    setErrors({...errors, [name]:  target.validationMessage  });
    setIsValid(target.closest("form").checkValidity());
}


const resetForm = useCallback(
  (newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  },
  [setValues, setErrors, setIsValid]
);

return { values, handleChange, errors, setErrors, isValid, resetForm, setValues, setIsValid };
}