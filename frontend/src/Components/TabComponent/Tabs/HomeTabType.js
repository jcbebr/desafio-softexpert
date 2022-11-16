import React from 'react'
import HomeTabProduct from './HomeTabProduct'

export default function HomeTabType({ type, products, handleAddProduct }) {
  return (
    <div className="HomeTabType">
      <p className="title">Tipo: {type.name}</p>
      <div className="HomeTabTypeContainer">
        {
          products.map(product => {
            return <HomeTabProduct key={product.id} product={product} handleAddProduct={handleAddProduct}></HomeTabProduct>
          })
        }
      </div>
    </div>
  )
}
