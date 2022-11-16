import React, { useState, useRef, useEffect } from "react";
import { getProduct, postProduct, getProductType, patchProduct, deleteProduct } from '../../../Config.js';
import ProductList from "../../CRUDComponent/ProductList.js";

export default function ProductTab() {
  const [products, setProducts] = useState([])
  const [produtcType, setProdutcType] = useState([])
  const [isEditing, setEditing] = useState(false)

  useEffect(() => {
    getProduct(setProducts)
  }, [])

  useEffect(() => {
    getProductType(setProdutcType)
  }, [])

  function getProductTypeName(id) {
    const type = produtcType.find(type => type.id === id)
    return type ? type.name : ''
  }

  const prodIdRef = useRef()
  const prodNameRef = useRef()
  const prodWeightRef = useRef()
  const prodPriceRef = useRef()
  const prodImageURLRef = useRef()
  const prodTypeIdRef = useRef()

  function handleAddProduct(e) {
    const prodId = prodIdRef.current.value;
    const prodName = prodNameRef.current.value;
    const prodWeight = prodWeightRef.current.value;
    const prodPrice = prodPriceRef.current.value;
    const prodImageURL = prodImageURLRef.current.value;
    const prodTypeId = prodTypeIdRef.current.value;

    if (prodName === '' || prodWeight === '' || prodImageURL === '' || prodTypeId === '' || prodPrice === '') return

    postProduct({ name: prodName, weight: prodWeight, image_url: prodImageURL, product_type_id: prodTypeId, price: prodPrice }, () => {
      getProduct(setProducts)
      handleExitEditProduct()
    })
  }

  function handleEditProduct(id) {
    setEditing(true)
    const prod = products.find(prod => prod.id === id)
    prodIdRef.current.value = prod.id
    prodNameRef.current.value = prod.name
    prodWeightRef.current.value = prod.weight
    prodPriceRef.current.value = prod.price
    prodImageURLRef.current.value = prod.image_url
    prodTypeIdRef.current.value = prod.product_type_id
  }

  function handleConfirmEditProduct() {
    const prodId = prodIdRef.current.value;
    const prodName = prodNameRef.current.value;
    const prodWeight = prodWeightRef.current.value;
    const prodImageURL = prodImageURLRef.current.value;
    const prodTypeId = prodTypeIdRef.current.value;
    const prodPrice = prodPriceRef.current.value;

    if (prodName === '' || prodWeight === '' || prodImageURL === '' || prodTypeId === '' || prodPrice === '') return

    patchProduct({ id: prodId, name: prodName, weight: prodWeight, image_url: prodImageURL, product_type_id: prodTypeId, price: prodPrice }, () => {
      getProduct(setProducts)
      handleExitEditProduct()
    })
  }

  function handleExitEditProduct(id) {
    prodIdRef.current.value = null
    prodNameRef.current.value = null
    prodWeightRef.current.value = null
    prodPriceRef.current.value = null
    prodImageURLRef.current.value = null
    // prodTypeIdRef.current.value = null

    setEditing(false)
  }

  function handleDeleteProduct(id) {
    deleteProduct({ id: id }, () => {
      getProduct(setProducts)
      handleExitEditProduct()
    })
  }

  return (
    <div className="userTab">
      <div className="editAdd">
        <label>{isEditing ? "Editar" : "Adicionar"} produto</label>
        <div className="inputs">
          <input placeholder="Código" ref={prodIdRef} type="text" disabled={true}></input>
          <input placeholder="Nome" ref={prodNameRef} type="text"></input>
          <input placeholder="Peso" ref={prodWeightRef} type="number" step="0.01" min="0"></input>
          <input placeholder="Preço" ref={prodPriceRef} type="number" step="0.01" min="0"></input>
          <select ref={prodTypeIdRef}>
            {produtcType.map(type => {
              return <option key={type.id} value={type.id}>{type.name}</option>
            })}
          </select>
          {/* <input placeholder="Tipo" ref={prodTypeIdRef} type="text"></input> */}
          <input placeholder="Imagem URL" ref={prodImageURLRef} type="text"></input>
        </div>

        <div className="actions">
          {isEditing ? <button onClick={handleConfirmEditProduct}>Confirmar</button> : <button onClick={handleAddProduct}>Adicionar</button>}
          <button onClick={handleExitEditProduct}>Cancelar</button>
        </div>
      </div>

      <ProductList
        products={products}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
        getProductTypeName={getProductTypeName}>
      </ProductList>
    </div>
  )
}
