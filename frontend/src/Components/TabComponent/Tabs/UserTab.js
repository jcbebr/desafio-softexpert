import React, { useState, useRef, useEffect } from "react";
import { getUsers, postUsers } from '../../../Config.js';
import UserList from "../../CRUDComponent/UserList.js";

export default function UserTab() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers(setUsers)
  }, [])

  const userIdRef = useRef()
  const userNameRef = useRef()
  const userEmailRef = useRef()
  const userPasswordRef = useRef()

  function handleAddUser(e) {
    const userId = userIdRef.current.value;
    const userName = userNameRef.current.value;
    const userEmail = userEmailRef.current.value;
    const userPassword = userPasswordRef.current.value;

    if (userName === '' || userEmail === '' || userPassword === '') return

    postUsers({ name: userName, email: userEmail, password: userPassword }, () => {
      getUsers(setUsers)
    })

    userIdRef.current.value = null
    userNameRef.current.value = null
    userEmailRef.current.value = null
    userPasswordRef.current.value = null
  }

  return (
    <div className="userTab">
      <div className="editAdd">
        <label>Adicionar usuário</label>
        <div className="inputs">
          <input placeholder="Código" ref={userIdRef} type="text" disabled={true}></input>
          <input placeholder="Nome" ref={userNameRef} type="text"></input>
          <input placeholder="E-mail" ref={userEmailRef} type="text"></input>
          <input placeholder="Senha" ref={userPasswordRef} type="text"></input>
        </div>

        <div className="actions">
          <button onClick={handleAddUser}>Adicionar</button>
        </div>
      </div>

      <UserList users={users} ></UserList>
    </div>
  )
}
