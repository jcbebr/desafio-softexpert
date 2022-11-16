<?php

namespace Main\Controller;

use Main\AppException;
use Main\Model\ProductModel;
use Main\Model\SaleProductModel;

class ProductController extends BaseController
{

    public function get()
    {
        $productModel = new ProductModel();
        $data = $productModel->get($this->getQueryFilters($productModel->getAllowedFilters()));
        return $data;
    }

    public function post()
    {
        $product = $this->getJSONBody();
        $product->weight = str_replace(',', '.', $product->weight);
        $product->price = str_replace(',', '.', $product->price);

        if (empty($product->name) || empty($product->weight) || empty($product->price) || empty($product->product_type_id)) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $productModel = new ProductModel();

        return $productModel->post($product->name, $product->weight, $product->price, $product->product_type_id, $product->image_url);
    }

    public function patch()
    {
        $product = $this->getJSONBody(true);
        $product['weight'] = str_replace(',', '.', $product['weight']);
        $product['price'] = str_replace(',', '.', $product['price']);

        $fields = $this->formatArrayFields($product, ['name', 'weight', 'price', 'image_url', 'product_type_id']);

        if ($fields == null) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }
        
        $productModel = new ProductModel();
        return $productModel->patch($product['id'], $fields);
    }

    public function delete()
    {
        $product_id = $this->getJSONBody(true)['id'];

        if (!$product_id) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $saleProductModel = new SaleProductModel();
        $data = $saleProductModel->get("product_id = $product_id");
        if ($data) {
            throw new AppException(200, 'Produto já incluso em outras vendas.');
        }

        $productModel = new ProductModel();
        return $productModel->delete($product_id);
    }
}
