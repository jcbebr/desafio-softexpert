import React, { useState, useRef, useEffect } from "react";
import { apiAdress, isLoggedIn, setLoggedUser } from '../../../Config.js';

const LoginTab = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    
  }, [loggedIn])

  const userEmailRef = useRef()
  const userPasswordRef = useRef()

  function handleLogOut() {
    const requestOptions = {
      method: 'GET'
    }

    fetch(apiAdress + 'user/logout', requestOptions)
      .then(res => res.json())
      .then((result) => {
        if (result['data'] === true) {
          setLoggedUser(0)
          setLoggedIn(false)
        }
      })
  }

  function handleLogIn() {
    const userEmail = userEmailRef.current.value;
    const userPassword = userPasswordRef.current.value;

    if (userEmail === '' || userPassword === '') return

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, password: userPassword })
    }

    fetch(apiAdress + 'user/login', requestOptions)
      .then(res => res.json())
      .then((result) => {
        if (result['data'] && result['data']['loggedin'] === true) {
          setLoggedUser(result['data']['user_id'])
          setLoggedIn(true)
          userEmailRef.current.value = null
          userPasswordRef.current.value = null
        }
      })
  }

  return (
    <div className="loginTab">
      <input ref={userEmailRef} type="text" placeholder="E-mail"></input>
      <input ref={userPasswordRef} type="password" placeholder="Senha" style={{marginTop: "15px", marginBottom: "15px"}}></input>
      <button style={{ display: loggedIn ? 'inline' : 'none' }} onClick={handleLogOut}>Logout</button>
      <button style={{ display: loggedIn ? 'none' : 'inline' }} onClick={handleLogIn}>Login</button>
    </div>
  );
};
export default LoginTab;