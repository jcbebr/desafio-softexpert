import React from 'react'

export default function SaleListItem({ saleProduct, handleChangeQuantity }) {
  function internalHandleChangeQuantity(newQuantity) {
    handleChangeQuantity(saleProduct.sale_id, saleProduct.product_id, newQuantity)
  }
  function handleAdd() {
    internalHandleChangeQuantity(saleProduct.quantity + 1)
  }
  function handleRemove() {
    internalHandleChangeQuantity(saleProduct.quantity - 1)
  }
  function handleRemoveAll() {
    internalHandleChangeQuantity(0)
  }
  return (
    <div className="saleListItem">
      <div className="info">
        <img src={saleProduct.image_url}></img>
        <label className="name">{saleProduct.name}</label>
      </div>
      <div>
        <button onClick={handleRemove}>-</button>
        <label>{saleProduct.quantity}</label>
        <button onClick={handleAdd}>+</button>
      </div>
      <div className="total">
        <label>R$ {(saleProduct.price * saleProduct.quantity).toFixed(2).replace('.', ',')}</label>
        <button onClick={handleRemoveAll}>X</button>
      </div>
    </div>
  )
}
