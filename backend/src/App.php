<?php

namespace Main;

use Throwable;
use Main\Router;

class App
{

    private $router;

    private function loadRouter()
    {
        $this->router = new Router();
        $this->router->addNewRoute('GET', '\migration\M001InitApp\up', 'Main\Migration\M001InitApp', 'up');
        $this->router->addNewRoute('GET', '\migration\M001InitApp\down', 'Main\Migration\M001InitApp', 'down');

        $this->router->addNewRoute('GET', '\api\user', 'Main\Controller\UserController', 'get');
        $this->router->addNewRoute('POST', '\api\user', 'Main\Controller\UserController', 'post');

        $this->router->addNewRoute('POST', '\api\user\login', 'Main\Controller\UserController', 'login');
        $this->router->addNewRoute('GET', '\api\user\logout', 'Main\Controller\UserController', 'logout');

        $this->router->addNewRoute('GET', '\api\product\type', 'Main\Controller\ProductTypeController', 'get');

        $this->router->addNewRoute('GET', '\api\product', 'Main\Controller\ProductController', 'get');
        $this->router->addNewRoute('POST', '\api\product', 'Main\Controller\ProductController', 'post');
        $this->router->addNewRoute('PATCH', '\api\product', 'Main\Controller\ProductController', 'patch');
        $this->router->addNewRoute('DELETE', '\api\product', 'Main\Controller\ProductController', 'delete');

        $this->router->addNewRoute('GET', '\api\sale', 'Main\Controller\SaleController', 'get');
        $this->router->addNewRoute('POST', '\api\sale', 'Main\Controller\SaleController', 'post');
        $this->router->addNewRoute('PATCH', '\api\sale', 'Main\Controller\SaleController', 'patch');
        $this->router->addNewRoute('DELETE', '\api\sale', 'Main\Controller\SaleController', 'delete');

        $this->router->addNewRoute('GET', '\api\saleproduct', 'Main\Controller\SaleProductController', 'get');
        $this->router->addNewRoute('POST', '\api\saleproduct', 'Main\Controller\SaleProductController', 'post');
    }

    public function init(): void
    {
        try {


            $this->loadRouter();
            $route = $this->router->getRequestRoute();

            if (!$route) {
                throw new AppException(404, 'Rota não registrada.');
            }

            $class = $route['resourceClass'];
            $method = $route['resourceMethod'];

            $resource = new $class();
            $response['data'] = $resource->$method();
            $responseCode = 200;
        } catch (AppException $e) {
            $responseCode = $e->getHTTPCode();
            $response['error']['code'] = $e->getCode();
            $response['error']['message'] = $e->getMessage();
            $response['error']['file'] = $e->getFile();
            $response['error']['line'] = $e->getLine();
        } catch (Throwable $e) {
            $response['error']['code'] = $e->getCode();
            $response['error']['message'] = $e->getMessage();
            $response['error']['file'] = $e->getFile();
            $response['error']['line'] = $e->getLine();
        }

        try {
            $this->defheader();
            http_response_code($responseCode);
            echo json_encode($response);
        } catch (Throwable $e) {
            http_response_code(500);
            die('Contate o supporte.');
        }
    }

    function defheader()
    {
        header('Content-Type: application/json');
        // header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Credentials: true');
        // header('Access-Control-Max-Age: 86400');    // cache for 1 day
        // header('Cache-Control: public');
        header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE");
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        }
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            exit(0);
        }
    }
}
