<?php

namespace Main\Model;

class Model extends Database
{
    protected $table = '';
    protected $allowedFilters = [];

    public function getAllowedFilters()
    {
        return $this->allowedFilters;
    }

    public function get($filter = null)
    {
        $where = $filter == null ? '' : "WHERE " . $filter;
        return $this->select("SELECT * FROM $this->table $where ORDER BY id ASC");
    }
}
