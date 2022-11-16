import React from 'react'

export default function UserListItem({ product, handleEditProduct, getProductTypeName, handleDeleteProduct }) {
  function internalHandleEditProduct() {
    handleEditProduct(product.id)
  }
  function internalhandleDeleteProduct() {
    handleDeleteProduct(product.id)
  }
  
  return (
    <>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.weight}</td>
        <td>R$ {(product.price).toFixed(2).replace('.', ',')}</td>
        <td>{getProductTypeName(product.product_type_id)}</td>
        <td>
          <img src={product.image_url} height="50px"></img>
        </td>
        <td>
          <button onClick={internalHandleEditProduct}>Editar</button>
          <button onClick={internalhandleDeleteProduct}>Excluir</button>
        </td>
      </tr>
    </>
  )
}
