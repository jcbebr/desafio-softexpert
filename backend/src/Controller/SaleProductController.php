<?php

namespace Main\Controller;

use Main\AppException;
use Main\Model\SaleModel;
use Main\Model\SaleProductModel;

class SaleProductController extends BaseController
{

    public function get()
    {
        $saleProductModel = new SaleProductModel();
        $data = $saleProductModel->get($this->getQueryFilters($saleProductModel->getAllowedFilters()));
        return $data;
    }

    public function post()
    {
        UserController::checkAuth();

        $saleProduct = $this->getJSONBody();
        $fields = $this->formatArrayFields($saleProduct, ['quantity']);

        if (empty($saleProduct->sale_id) || empty($saleProduct->product_id)) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $saleModel = new SaleModel();
        $data = $saleModel->get("user_id = " . UserController::getLoggedUserId() . " AND status = " . SaleController::STATUS_OPEN);
        if (!$data || $data[0]['id'] != $saleProduct->sale_id) {
            throw new AppException(200, 'Venda não identificada.');
        }

        $saleProductModel = new SaleProductModel();
        $data = $saleProductModel->get("sale_id = $saleProduct->sale_id AND product_id = $saleProduct->product_id");
        if ($data) {
            if ($saleProduct->quantity == 0) {
                return $saleProductModel->delete($data[0]['id']);
            } else {
                return $saleProductModel->patch($data[0]['id'], $fields);
            }
        }
        
        if (empty($saleProduct->quantity)) {
            throw new AppException(401, 'Quantidade inválida para inserção.');
        }

        return $saleProductModel->post($saleProduct->quantity, $saleProduct->sale_id, $saleProduct->product_id);
    }
}
