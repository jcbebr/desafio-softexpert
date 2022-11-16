import React from 'react'
import SaleListItem from './SaleListItem'

export default function SaleList({ saleProducts, handleChangeQuantity }) {
  return (
    <div className="saleList">
      {
        saleProducts.map(saleProduct => {
          return <SaleListItem key={saleProduct.id} saleProduct={saleProduct} handleChangeQuantity={handleChangeQuantity}></SaleListItem>
        })
      }
    </div>
  )
}
