import React, { useState, useRef, useEffect } from "react";
import SaleList from '../../CRUDComponent/SaleList'
import { getProduct, getSale, postSale, patchSale, deleteSale, getSaleProduct, postSaleProduct, getLoggedUserId } from '../../../Config.js';

export default function SaleTab() {
  const [sales, setSales] = useState([])
  const [reloadSale, setReloadSale] = useState([])
  const [saleProducts, setSaleProducts] = useState([])
  const [reloadSaleProduct, setReloadSaleProduct] = useState([])
  const [deliverPrice, setDeliverPrice] = useState(0)

  const saleDistanceRef = useRef()

  useEffect(() => {
    getSale({ user_id: getLoggedUserId(), status: 1 }, setSales)
  }, [reloadSale])

  useEffect(() => {
    if (sales.length > 0) {
      getSaleProduct({ sale_id: sales[0].id }, setSaleProducts)
    } else {
      setSaleProducts([])
    }

  }, [sales, reloadSaleProduct])

  useEffect(() => {
    handleCalcDeliverPrice()
  }, [saleProducts])

  function handleChangeQuantity(sale_id, product_id, newQuantity) {
    postSaleProduct({ quantity: newQuantity, sale_id: sale_id, product_id: product_id }, setReloadSaleProduct)
  }

  function handleDeleteAll() {
    deleteSale({ id: sales[0].id }, setReloadSale)
  }

  const sumTotalPrice = arr => arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
  const sumTotalWeight = arr => arr.reduce((sum, { weight, quantity }) => sum + weight * quantity, 0)

  function handleCalcDeliverPrice() {
    const totalPrice = sumTotalPrice(saleProducts)
    const totalWeight = sumTotalWeight(saleProducts)
    if (!saleDistanceRef.current) return
    const distance = saleDistanceRef.current.value === '' ? 0 : saleDistanceRef.current.value

    if (distance > 100) {
      setDeliverPrice(totalWeight * distance / 100)
    } else if (distance > 0) {
      setDeliverPrice(totalWeight * 5)
    } else {
      setDeliverPrice(0)
    }
  }

  function handleFinishSale() {
    patchSale({ id: sales[0].id, distance: saleDistanceRef.current.value, status: 2 }, setReloadSale)
  }

  return (
    <div className="saleTab">
      {sales.length == 0 ? <label>O carrinho está vazio</label> :
        <>
          <div className="remove">
            <button onClick={handleDeleteAll}>Remover todos</button>
          </div>
          {/* {console.log(getLoggedUserId() , sales, saleProducts)} */}
          <SaleList saleProducts={saleProducts} handleChangeQuantity={handleChangeQuantity}></SaleList>
          <div className="panel">
            <div className="deliver">
              <input ref={saleDistanceRef} type="number" placeholder="Distância (km)"></input>
              <button onClick={handleCalcDeliverPrice}>Calcular frete</button>
            </div>
            <div className="info">
              <label>Subtotal: R$ {(sumTotalPrice(saleProducts)).toFixed(2).replace('.', ',')}</label>
              <label>Peso total: {sumTotalWeight(saleProducts)} kg</label>
              <label>Frete: R$ {(deliverPrice).toFixed(2).replace('.', ',')}</label>
              <label>Total: R$ {(deliverPrice === 0 ? 0 : sumTotalPrice(saleProducts) + deliverPrice).toFixed(2).replace('.', ',')}</label>
            </div>
            <div className="finish">
              <button onClick={handleFinishSale}>Finalizar compra</button>
            </div>
          </div>
        </>
      }
    </div>
  )
}
