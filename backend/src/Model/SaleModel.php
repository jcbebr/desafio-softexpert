<?php

namespace Main\Model;

class SaleModel extends Model
{
    protected $table = 'sale';
    protected $allowedFilters = ['id', 'user_id', 'status'];

    public function post($status, $user_id)
    {
        $sql = "INSERT INTO $this->table (status, user_id) VALUES($status, $user_id);";
        return $this->query($sql);
    }

    public function patch($id, $fields)
    {
        $sql = "UPDATE $this->table SET $fields WHERE id = $id;";
        return $this->query($sql);
    }

    public function delete($id)
    {
        $sql = "DELETE FROM $this->table WHERE id = $id;";
        return $this->query($sql);
    }
    
}