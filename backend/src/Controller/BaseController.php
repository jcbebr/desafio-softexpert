<?php

namespace Main\Controller;

use Main\Router;

class BaseController
{
    protected function getQueryFilters($allowedFilters = [])
    {
        $query = Router::getRequestQuery();
        return $this->formatArrayFields($query, $allowedFilters, ' AND ');
    }

    protected function formatArrayFields($array, $allowedFields = [], $separator = ' , ')
    {
        foreach ($array as $key => $value) {
            if (in_array($key, $allowedFields)) {
                $filters[$key] = $value;
            }
        }
        if ($filters == null) {
            return null;
        }

        $str = '';
        foreach ($filters as $key => $item) {
            if (gettype($item) == 'string') {
                $item = "'" . $item . "'";
            }
            $str .= $key . '=' . $item . $separator;
        }
        return rtrim($str, $separator);
    }

    protected function getJSONBody($associative = false)
    {
        $json = file_get_contents('php://input');
        return json_decode($json, $associative);
    }

}
