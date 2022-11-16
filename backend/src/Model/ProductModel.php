<?php

namespace Main\Model;

class ProductModel extends Model
{
    protected $table = 'product';
    protected $allowedFilters = ['id'];

    public function post($name, $weight, $price, $product_type_id, $image_url)
    {
        $sql = "INSERT INTO $this->table (name, weight, price, product_type_id, image_url) VALUES('$name', '$weight', '$price', '$product_type_id', '$image_url');";
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