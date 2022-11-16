import React from 'react'
import UserListItem from './UserListItem'

export default function UserList({ users, handleEditUser }) {
  return (
    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Senha</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return <UserListItem key={user.id} user={user} handleEditUser={handleEditUser}></UserListItem>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
