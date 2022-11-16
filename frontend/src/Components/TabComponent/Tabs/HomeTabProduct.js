import React from 'react'

export default function HomeTabProduct({ product, handleAddProduct }) {
  function internalHandleAddProduct() {
    handleAddProduct(product.id)
  }
  return (
    <div className="HomeTabProduct">
      <img src={product.image_url}></img>
      <div className="fields">
        <p className="ftitle">{product.name}</p>
        <div className="fprice">
          <label>R$ {(product.price).toFixed(2).replace('.', ',')}</label>
          <button onClick={internalHandleAddProduct}>Comprar</button>
        </div>
      </div>
    </div>
  )
}
