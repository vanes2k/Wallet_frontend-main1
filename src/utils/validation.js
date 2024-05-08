import { 
  dropOptions,
  optionsList,

  calendarErrorMessage,
  emptyFieldErrorMessage,
  negativeErrorMessage,
  choiceErrorMessage,
  communicationsErrorMessage,
} from "./constants";


function validation(e){

function handleChangeInput({item, page, form, setForm, errorsOne, setErrorsOne, errorsTwo, setErrorsTwo,}) {
  const {name, value} = item;
  setForm({
    ...form,
    [name]: value
  })
  
  if (page === 1) {
    value === ''
    ? setErrorsOne({...errorsOne, [name]: emptyFieldErrorMessage})
    :  e.target.value <= 0 
      ? setErrorsOne({...errorsOne, [name]: negativeErrorMessage})
      : setErrorsOne({...errorsOne, [name]: ''})
  } else {
    value === ''
    ? setErrorsTwo({...errorsTwo, [name]: emptyFieldErrorMessage})
    :  e.target.value <= 0 
      ? setErrorsTwo({...errorsTwo, [name]: negativeErrorMessage})
      : setErrorsTwo({...errorsTwo, [name]: ''})
  }
 
}




}