import axios from "axios"
import { URL } from "../utils/constants"


// АВТОРИЗАЦИЯ
export const register = (email, password) => {
  return axios({
    url: `${URL}/auth/users/`,
    method: 'POST',
    data: {
      email: email,
      password: password,
    }
  })
}

export const createToken = (email, password) => {
  return axios({
    url: `${URL}/auth/jwt/create/`,
    method: 'POST',
    data: {
      email: email,
      password: password,
    }
  })
}

export const changePassword = (password, newPassword) => {
  // const token = sessionStorage.getItem('token');
  return axios({
    url: `${URL}/auth/users/set_password/`,
    method: 'POST',
    headers: {
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    }, 
    data: {
      new_password: newPassword,
      current_password: password,
    }
  })
}

export const getUser = () => {
  return axios({
    url: `${URL}/auth/users/me/`,
    method: 'GET',
    headers: {
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    } 
  })
}

export const patchUser = (user) => {
  return axios({
    url:`${URL}/auth/users/me/`,
    method: 'PATCH',
    headers: {
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    },
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      // is_push_agree: user.isPush,
      // is_email_agree: user.isEmail,
    }
  })
}

export const deleteUser = () => {
  return axios({
    url: `${URL}/auth/users/me/`,
    method: 'DELETE',
    headers: {
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    }
  })
}

///////////////////////////////////////////////////////////////////////////////////////////

// ДИДЖИТАЛ РУБЛЬ 
// получение счетов диджитал рубль
// export const getDigitalRuble =() => {
//   const token = sessionStorage.getItem('token');
//   axios({
//     url:`${URL}/digital_ruble/`, 
//     method: 'GET',
//     headers: {
//       "Authorization":`Bearer ${token}`
//     }, 
//   })
// }

// регистрация нового счета диджитал рубль
export const postDigitalRuble = (active) => {
  // const token = sessionStorage.getItem('token');
  return axios({
    url:`${URL}/digital_ruble/`, 
    method: 'POST',
    headers: {
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    }, 
    data: {   // с точки зрения axios  это body
      // "currency": "RUB",
      "display_in_general": active.isStatistic,
      "bank": active.bank,
      "start_date": active.date,
      "start_amount": active.sum,
    }
  })
}
 

// export const putDigitalRuble = (id, form) => { axios({
//   url:`${URL}/digital_ruble/${id}/`, 
//   method: 'PUT',
//   // с точки зрения axios - params  это то, что подставится в url
//   data: {
//     // "display_in_general": false,
//     // "bank": "ВТБ",
//     // "start_date": "2023-10-13T10:40:53.125Z",
//     // "start_amount": "20000",
//     // "user": 1
//   }
// })
// }

// export const deleteDigitalRuble =(id) => { axios({
//   url:`${URL}/digital_ruble/${id}/`, 
//   method: 'DELETE',
// })
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ВКЛАДЫ
// const token = sessionStorage.getItem('token');
// export const getDeposits = axios({
//   url:`${URL}/bank_deposits`,
//   method: 'GET',
// headers: {
//   "Authorization":`Bearer ${token}`
// }, 
// })

export const postDeposit = (active) => {
  // const token = sessionStorage.getItem('token');
 return axios({
  url:`${URL}/bank_deposits/`,
  method: 'POST',
  headers: {
    "Authorization":`Bearer ${sessionStorage.getItem('token')}`
  }, 
  data: { 
    "currency": active.currency,
    "display_in_general": active.isStatistic,
    "bank": active.bank,
    "start_amount": active.sum,
    "interest_rate": active.rate,
    "start_date": active.startDate,
    "end_date": active.endDate,
  }
})
}

// export const putDeposits = (id, form) => {
//   axios({
//   url:`${URL}/bank_deposits/${id}/`,
//   method: 'PATCH',
//   data: {
//     // "currency": "RUB",
//     // "display_in_general": true,
//     // "bank": "string",
//     // "start_amount": "string",
//     // "interest_rate": "string",
//     // "start_date": "2023-10-13T10:55:19.422Z",
//     // "end_date": "2023-10-13T10:55:19.422Z",
//   }
// })
// }

// export const deleteDeposits = (id) => { 
//   axios({
//     url:`${URL}/bank_deposits/${id}`, 
//     method: 'DELETE',
//   })
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // МЕТАЛЛЫ
// export const getMetals = axios({
//   url: `${URL}/metal_accounts`,
//   method: 'GET',
// })

export const postMetals = (active) => {
  const token = sessionStorage.getItem('token');
 return axios({
  url:`${URL}/metal_accounts/`,
  method: 'POST',
  headers: {
    "Authorization":`Bearer ${token}`
  }, 
  data: { 
    "display_in_general": active.isStatistic,
    "type_metal": active.metal,
    "bank": active.bank,
    "start_date": active.date,
    "start_weight": active.initialWeight,
    "start_price": active.sum,
  }
})
}

// export const putMetals =(id, form) => { axios({
//   url: `${URL}/metal_accounts`,//тут должен проставляться id конкретного счета диджитал рубля
//   method: 'PUT',  
//   data: {
//    // "currency": "RUB",
//    // "display_in_general": true,
//    // "type_metal": "AUR",
//    // "bank": "string",
//    // "start_date": "2023-10-13T11:02:06.162Z",
//    // "start_weight": 2147483647,
//    // "start_price": "string",
//   }
// })
// }

// export const deleteMetals = (id) => { axios({
//   url: `${URL}/metal_accounts/${id}/`,
//   method: 'DELETE',
// })
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// АВТО
// export const getCar = axios({
//   url: `${URL}/car`,
//   method: 'GET',
// })

// export const postCar = (active) => {
//   axios({
//   url: `${URL}/car/`,
//   method: 'POST',
//   headers: {
//     "Authorization":`Bearer ${sessionStorage.getItem('token')}`
//   }, 
//   data: {
//     // "currency": "RUB",
//     "display_in_general": active.isStatistic,
//     "production_year": active.year,
//     "purchase_date": active.date,
//     "price": active.cost,
//     "mileage": active.mileage,
//     "engine_type": active.motor,
//     "engine_capacity": active.motorSize,
//     "gearbox_type": active.transmission,
//     "brand": active.brand.value,
//     "model": active.model.value,
//   }
// })
// }

// export const putCar = (id, form) => { axios({
//   url: `${URL}/car/${id}/`,
//   method: 'PATCH',
//   data: {
//   // "currency": "RUB",
//   // "display_in_general": true,
//   // "production_year": 2147483647,
//   // "purchase_date": "2023-10-13T11:06:17.093Z",
//   // "price": "string",
//   // "mileage": 2147483647,
//   // "engine_type": "GASOLINE",
//   // "engine_capacity": 0.2,
//   // "gearbox_type": "AUTOMATIC",
//   // "brand": 0,
//   // "model": 0,
//   }
// })
// }

// export const deleteCar = (id) => { axios({
//   url: `${URL}/car/${id}/`,
//   method: 'DELETE',
// })
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// МОТО
// export const getMotorcycles = axios({
//   url: `${URL}/motorcycles`,
//   method: 'GET',
// })

//если вынести сюда, то не видит then
// export const postBike = (active) => {
//   const token = sessionStorage.getItem('token');
//   axios({
//   url: `${URL}/motorcycles/`,
//   method: 'POST',
//   headers: {
//     "Authorization":`Bearer ${token}`
//   }, 
//   data: {
//     // "currency": "RUB",
//     "display_in_general": active.isStatistic,
//     "production_year": active.year,
//     "purchase_date": active.date,
//     "price": active.cost,
//     "mileage": active.mileage,
//     "brand": active.brand,
//     "model": active.model,
//     "engine_capacity": active.motorSize,
//   }
// })
// }

// export const postMotorcycles = axios({
//   url: `${URL}/motorcycles/`,
//   method: 'POST',
//   data: {
//     "currency": "RUB",
//     "display_in_general": true,
//     "production_year": 2147483647,
//     "purchase_date": "2023-10-13T11:08:19.985Z",
//     "price": "string",
//     "mileage": 2147483647,
//     "brand": "string",
//     "model": "string",
//     "engine_capacity": 2147483647,
//     "user": 1
//   }
// })

// export const patchMotorcycles = axios({
//   url: `${URL}/motorcycles/`,
//   method: 'PATCH',
//   params: 'id',    //тут должен проставляться id конкретного счета диджитал рубля
//   data: {
//     "currency": "RUB",
//     "display_in_general": true,
//     "production_year": 2147483647,
//     "purchase_date": "2023-10-13T11:08:51.467Z",
//     "price": "string",
//     "mileage": 2147483647,
//     "brand": "string",
//     "model": "string",
//     "engine_capacity": 2147483647,
//   "user": 1
//   }
// })

// export const deleteMotorcycles = axios({
//   url: `${URL}/motorcycles/`,
//   method: 'DELETE',
//   params: 'id',    //тут должен проставляться id конкретного счета диджитал рубля
// })

//по какой-то причине при попытке вынести сюда перестает распознавать метод "then"
// export const getCities = (search) => {
// const token = sessionStorage.getItem('token');
// axios({
//   url: `${URL}/cities/`,
//   method: 'GET',
//   params: {search: search},
//   headers: {
//     "Authorization":`Bearer ${token}`
//   }, 
// })
// }


// ОБРАТНАЯ СВЯЗЬ
// export const feedback = axios({
//   url: `${URL}/`
// })



