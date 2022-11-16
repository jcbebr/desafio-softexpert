<?php

namespace Main\Model;

class UserModel extends Model
{
    protected $table = 'user';
    protected $allowedFilters = ['id', 'email'];

    public function post($name, $email, $password)
    {
        $sql = "INSERT INTO $this->table (name, email, password) VALUES('$name', '$email', '$password');";
        return $this->query($sql);
    }
}
