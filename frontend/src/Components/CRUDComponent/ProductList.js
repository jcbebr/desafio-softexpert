import React from 'react'
import ProductListItem from './ProductListItem'

export default function ProductList({ products, handleEditProduct, handleDeleteProduct, getProductTypeName }) {
  return (
    <div className="tableWrapper products">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Peso</th>
            <th>Preço</th>
            <th>Tipo</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {
              return <ProductListItem
                key={product.id}
                product={product}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                getProductTypeName={getProductTypeName}>
              </ProductListItem>
            })
          }
        </tbody>
      </table>
    </div>
  )
}
