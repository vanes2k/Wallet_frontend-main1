import {React, useEffect, useState} from "react";
import { Route, Routes, useNavigate} from 'react-router-dom';

import { CurrentThemeContext } from "./contexts/CurrentThemeContext";
import { CurrentUserContext } from './contexts/CurrentUserContext';
import ProtectedRouteElement from "./components/ProtectedRoute/ProtectedRoute";

// import axios from "axios";
// import { URL } from "./utils/constants";

import './App.css';

import Lending from "./pages/Lending/Lending";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import LicenseAgreement from "./pages/LicenseAgreement/LicenseAgreement";
import Auth from './pages/Auth/Auth';
import Main from './pages/Main/Main'
import Statistics from './pages/Statistics/Statistics';
import Authorization from './components/Authorization/Authorization';
import ResetPass from './components/ResetPass/ResetPass';
import ConfirmEmail from './components/СonfirmEmail/ConfirmEmail';
import ChangePassword from './components/СhangePassword/СhangePassword';
// import FeedBackForm from "./components/Feedback/FeedBackForm";
import DeleteAccount from "./components/DeleteConfirmation/DeleteAccount";
import DeleteAsset from "./components/DeleteConfirmation/DeleteAsset";
import Setting from "./pages/Settings/Setting";
import RealtyEdit from "./components/Popup/Realty/RealtyEdit/RealtyEdit";
import TransportEdit from "./components/Popup/TransportForm/TransportEdit/TransportEdit";
import DepositEdit from "./components/Popup/DepositForm/DepositEdit/DepositEdit";
import DigitalRubleEdit from "./components/Popup/DigitalRuble/DigitalRubleEdit/DigitalRubleEdit";

// import StatisticPage from "./pages/Statistic/StatisticPage";
import CryptoCurrencyEdit from "./components/Popup/СryptoСurrency/CryptoCurrencyEdit/CryptoCurrencyEdit";

import * as api from './api/api';

function App() {

  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);

  const [isLogin, setIsLogin] = useState(true);


  function switchTheme() {
    setDarkTheme(!darkTheme);
  }

  useEffect(() => {
      api.getUser()
      .then((res) => {
        setLoggedIn(true)
        setCurrentUser(res.data)
      })
      .catch((error) => {
        navigate('/auth')
        console.log(error)
      })
  }, [])

  const [newActivePopupOpened, setNewActivePopupOpened] = useState(false);
  const [changePasswordPopupOpened, setChangePasswordPopupOpened] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openChange, setOpenChange] = useState(false)
  const [openNotification, setOpenNotification] = useState(false)

  function hendleActiveModal () {
    setOpenModal(true)
  }
  function closeModal () {
    setOpenModal(false);
  }

  function activeOpenChange () {
    setOpenChange(true)
  }

  function disabledOpenChange () {
    setOpenChange(false)
  }

  function handleNewActivePopup() {
    setNewActivePopupOpened(true)
  }
  function handleChangePasswordPopup() {
    setChangePasswordPopupOpened(true)
  }
  function handleOpenNotification() {
    setOpenNotification(true)
  }

  function closePopups() {
    setNewActivePopupOpened(false)
    setChangePasswordPopupOpened(false)
    setOpenNotification(false)
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// РЕГИСТРАЦИЯ
function register(email, password) {
  api.register(email, password)
  .then((res) => {console.log(res.data)})
  .then(() => {
    setIsLogin(true)
    navigate( '/auth')
  })
  .catch((error) => console.log(error))
}

// ЛОГИН
function login(email, password) {
  api.createToken(email, password)
    .then((res) => {
      sessionStorage.setItem('token', res.data.access);
     api.getUser(res.data.access)
      .then((res) => setCurrentUser(res.data))
      .catch((error) => console.log(error))
    })
    .then(() => {
      setLoggedIn(true)
    })
    .then(() => {
      navigate('/main')
    })
    .catch((error) => console.log(error))
}

// СМЕНА ПАРОЛЯ
function changePassword(password, newPassword) {
  api.changePassword(password, newPassword)
  .then(() => {
    setResult(true)
    // console.log(res)
  })
  .catch((error) => {
    setResult(false)
    console.log(error)
  })
}

function logOut() {
  sessionStorage.removeItem('token')
  setCurrentUser({})

  setIsLogin(true)
  setLoggedIn(false)
 // не навигирует, тварь
 navigate('/auth')
}

function patchUser(form) {
  api.patchUser(form)
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.log(error)
  })
}

function deleteUser() {
  api.deleteUser()
  .then(() => {
    console.log('ok')
  })
  .catch((error) => {
    console.log(error)
  })
}

///////////////////////////////////////////////////////////////////////////////////
// статус ответа. ок или ошибка? нужен для попапов подтверждения
const [result, setResult] = useState(true)

// // СОЗДАНИЕ НОВОГО ДИДЖИТАЛ РУБЛЯ
function handleNewDidgitalRuble(active) {
 api.postDigitalRuble(active)
  .then((res) => {
    // console.log(res)
    setResult(true)
  })
  .catch((error) => {
    console.log(error)
    setResult(false)
  })
}

function postDeposit(active) {
  api.postDeposit(active)
  .then((res) => {
    // console.log(res)
    setResult(true)
  })
  .catch((error) => {
    console.log(error)
    setResult(false)
  })
}

function postMetals(active) {
    api.postMetals(active)
    .then((res) => {
      // console.log(res)
      setResult(true)
    })
    .catch((error) => {
      console.log(error)
      setResult(false)
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const [now, setNow] = useState(false)
// useEffect(() => {
//   const token = sessionStorage.getItem('token');
// axios({
//       url:`${URL}/metal_accounts/`,
//       method: 'GET',
//     headers: {
//       "Authorization":`Bearer ${token}`
//     }, 
//     })
//     .then((res) => {
//       const metalAccounts = sessionStorage.setItem('metalAccounts', res.data)
//       console.log(metalAccounts)
//       setNow(true)

//     })
//     .catch((error) => {
//       console.log(error)

//     })
// }, [])

// const id =  4
// useEffect(() => {
//   const token = sessionStorage.getItem('token');
//   axios({
//     url:`${URL}/metal_accounts/${id}`,
//     method: 'GET',
//   headers: {
//     "Authorization":`Bearer ${token}`
//   }, 

//   })
//   .then((res) => {
//     console.log(res.data)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
// }, [now])

  return ( 
   <CurrentThemeContext.Provider value={darkTheme} >
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      <div className={!darkTheme ? 'page page_theme_ligth' : 'page page_theme_dark'}>
        <div className="page__content">
          <Routes>
        <Route path='/' element={ <Lending  setIsLogin={setIsLogin}/> } />
        <Route path='/privacy-policy' element={ <PrivacyPolicy setIsLogin={setIsLogin}/> }/>
        <Route path='/license-agreement' element={ <LicenseAgreement setIsLogin={setIsLogin}/> }/>

        <Route path='/auth' element={ <Auth element={ <Authorization  isLogin={isLogin} setIsLogin={setIsLogin} handleLogin={login} handleRegister={register}/> }/> } />
        <Route path='/reset' element ={ <Auth element={ <ResetPass /> } /> } />
        <Route path='/confirmPass' element={ <Auth element={ <ConfirmEmail /> } /> } />

        <Route path='/main' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
           <Main 
           logOut ={logOut}
           isOk ={result}
           setIsOk={setResult}
           postDeposit={postDeposit}
           postMetals={postMetals}
           handleNewDidgitalRuble={handleNewDidgitalRuble}

           handleOpenNotification={handleOpenNotification}
           openNotification={openNotification}
          switchTheme={switchTheme}
          handlerOpenPopup={handleNewActivePopup}
          newActivePopupOpened={newActivePopupOpened}
          closePopups={closePopups}
        /> 
      } />
        } />
        <Route path='/setting' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
          <Setting
          deleteUser={deleteUser}
          patchUser = {patchUser}
          logOut ={logOut}
          isOk ={result}
          changePassword={changePassword}

          closePopups={closePopups}
              handleOpenNotification={handleOpenNotification}
              openNotification={openNotification}
              switchTheme={switchTheme}

              hendlerOpenModal = {hendleActiveModal}
              openModal={openModal}
              closeModal={closeModal}

              hendlerOpenChange={activeOpenChange}
              openChange={openChange}
              closeChange={disabledOpenChange}
          />
        }/>
      } />
        <Route path='/statistics' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
           <Statistics 
           logOut ={logOut}
           handleOpenNotification={handleOpenNotification}
           openNotification={openNotification}
           closePopups={closePopups}
            switchTheme={switchTheme}
          /> 
        } />
         } />
         
        {/* <Route path='/stat' element ={ <StatisticPage />} /> */}
        <Route path='/realty/edit' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <RealtyEdit isOpened={true} realtyCategory={"Жилое"}/>
        }/>
      }/>
        <Route path='/transport/edit' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <TransportEdit isOpened={true} realtyCategory={"Мотоцикл"}
        />}/>
      }/>
        <Route path='/deposit/edit' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <DepositEdit isOpened={true} realtyCategory="metal"/>
        }/>
      }/>
        <Route path='/digital/edit' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <DigitalRubleEdit isOpened={true}/>
        }/>
      }/>
        <Route path='/crypto/edit' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <CryptoCurrencyEdit isOpened={true}/>
        }/>
      }/>

        <Route path='/delete/account' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <DeleteAccount isOpened={true}/>
        }/>
      }/>
        <Route path='/delete/asset' element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <DeleteAsset isOpened={true} page={1}/>
        }/>
      }/>
        <Route path="/change-pass" element={ <ProtectedRouteElement loggedIn={loggedIn} element={
        <ChangePassword 
        isOpened={changePasswordPopupOpened}
          handleClose={closePopups}
        />
        } />
      }/>

      </Routes>
      </div>
    </div>
    </CurrentUserContext.Provider>
   </CurrentThemeContext.Provider>

  );
}

export default App;
