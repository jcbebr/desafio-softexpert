import React, { useState, useRef, useEffect } from "react";
import { getLoggedUserId, getProduct, getProductType, getSale, getSaleProduct, postSale, postSaleProduct } from '../../../Config'
import HomeTabType from "./HomeTabType";


export default function HomeTab() {
  const [products, setProducts] = useState([])
  const [produtcType, setProdutcType] = useState([])

  useEffect(() => {
    getProduct(setProducts)
    getProductType(setProdutcType)
  }, [])

  function handleAddProduct(productId) {
    var saleId = null;

    function callBackPostSaleProduct(data) {
      
    }

    function callBackGetSaleProduct(data) {
      if (data && data.length > 0) {
        postSaleProduct({quantity: data[0].quantity + 1, sale_id: data[0].sale_id, product_id: productId}, callBackPostSaleProduct)
      } else {
        postSaleProduct({quantity: 1, sale_id: saleId, product_id: productId}, callBackPostSaleProduct)
      }
    }

    function callBackPostSale(data) {

    }

    function callBackSale(data) {
      if (data && data.length > 0) {
        saleId = data[0].id
        getSaleProduct({sale_id: saleId, product_id: productId}, callBackGetSaleProduct)
      } else {
        postSale({product_id: productId}, callBackPostSale)
      }
    }

    getSale({user_id: getLoggedUserId(), status: 1}, callBackSale)
  }

  return (
    <div className="HomeTab">
      {produtcType.map(type => {
        const isType = product => product.product_type_id === type.id
        const pFromType = products.filter(isType)
          return <HomeTabType key={type.id} type={type} products={pFromType} handleAddProduct={handleAddProduct} ></HomeTabType>
      })}
    </div>
  )
}
