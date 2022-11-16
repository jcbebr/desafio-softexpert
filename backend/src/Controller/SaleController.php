<?php

namespace Main\Controller;

use Exception;
use Main\AppException;
use Main\Model\SaleModel;
use Main\Model\SaleProductModel;

class SaleController extends BaseController
{

    public const STATUS_OPEN = 1;
    public const STATUS_CLOSED = 2;

    public function get()
    {
        $saleModel = new SaleModel();
        $data = $saleModel->get($this->getQueryFilters($saleModel->getAllowedFilters()));
        return $data;
    }

    public function post()
    {
        UserController::checkAuth();

        $sale = $this->getJSONBody();

        if (empty($sale->product_id)) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $saleModel = new SaleModel();
        $data = $saleModel->get("user_id = " . UserController::getLoggedUserId() . " AND status = " . self::STATUS_OPEN);
        if ($data) {
            throw new Exception('Usuário já possui um carrinho aberto.');
        }

        $saleModel->post(self::STATUS_OPEN, UserController::getLoggedUserId());
        $data = $saleModel->get("user_id = " . UserController::getLoggedUserId() . " AND status = " . self::STATUS_OPEN)[0];

        $saleProductModel = new SaleProductModel();
        return $saleProductModel->post(1, $data['id'], $sale->product_id);
    }


    public function patch()
    {
        UserController::checkAuth();

        $sale = $this->getJSONBody(true);
        $fields = $this->formatArrayFields($sale, ['distance', 'status']);

        if ($fields == null) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $saleModel = new SaleModel();
        $data = $saleModel->get("user_id = " . UserController::getLoggedUserId() . " AND status = " . self::STATUS_OPEN);
        if (!$data) {
            throw new Exception('Usuário não possui carrinho aberto.');
        }

        return $saleModel->patch($data[0]['id'], $fields);
    }

    public function delete()
    {
        UserController::checkAuth();
        $sale_id = $this->getJSONBody(true)['id'];

        if (!$sale_id) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $saleModel = new SaleModel();
        $data = $saleModel->get("user_id = " . UserController::getLoggedUserId() . " AND status = " . SaleController::STATUS_OPEN . " AND id = $sale_id");
        if (!$data) {
            throw new AppException(200, 'Venda não identificada.');
        }

        $saleProductModel = new SaleProductModel();
        $data = $saleProductModel->get("sale_id = $sale_id");
        if ($data) {
            foreach ($data as $key => $value) {
                $saleProductModel->delete($value['id']);
            }
        }

        return $saleModel->delete($sale_id);
    }

}
