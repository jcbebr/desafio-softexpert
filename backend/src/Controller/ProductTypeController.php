<?php

namespace Main\Controller;

use Main\Model\ProductTypeModel;

class ProductTypeController extends BaseController
{

    public function get()
    {
        $productModel = new ProductTypeModel();
        $data = $productModel->get($this->getQueryFilters($productModel->getAllowedFilters()));
        return $data;
    }
}
