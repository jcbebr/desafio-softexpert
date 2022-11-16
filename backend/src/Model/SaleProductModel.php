<?php

namespace Main\Model;

class SaleProductModel extends Model
{
    protected $table = 'sale_product';
    protected $allowedFilters = ['sale_id', 'product_id'];

    public function get($filter = null)
    {
        $where = $filter == null ? '' : "WHERE " . $filter;
        return $this->select(
            "SELECT $this->table.*, product.name, product.weight, product.image_url, product.price
               FROM $this->table 
              INNER JOIN product on product.id = $this->table.product_id
                    $where 
              ORDER BY $this->table.id ASC"
        );
    }

    public function post($quantity, $sale_id, $product_id)
    {
        $sql = "INSERT INTO $this->table (quantity, sale_id, product_id) VALUES($quantity, $sale_id, $product_id);";
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
