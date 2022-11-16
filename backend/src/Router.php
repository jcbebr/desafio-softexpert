<?php

namespace Main;

class Router
{
    public $routes = array();

    public function addNewRoute($method, $route, $resourceClass, $resourceMethod)
    {
        $route = array(
            "method" => $method,
            "route" => $route,
            "resourceClass" => $resourceClass,
            "resourceMethod" => $resourceMethod
        );
        array_push($this->routes, $route);
    }

    public function getRequestRoute()
    {
        $arrayStringURL = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $arrayStringURL = str_replace('/', '\\', $arrayStringURL);
        $method = $_SERVER['REQUEST_METHOD'];

        foreach ($this->routes as $key => $route) {
            if ($arrayStringURL == $route['route'] && $method == $route['method']) {
                return $route;
            }
        }

        return false;
    }

    public static function getRequestQuery() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
        $uri = parse_str($uri, $array);
        return $array;
    }
}
