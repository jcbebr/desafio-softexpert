import React from 'react'

export default function UserListItem({ user, handleEditUser }) {
  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
      </tr>
    </>
  )
}
