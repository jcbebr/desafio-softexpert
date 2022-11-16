<?php

namespace Main\Model;

use Main\AppException;
use mysqli;

class Database
{
    private const DB_HOST = "db";
    private const DB_USERNAME = "root";
    private const DB_PASSWORD = "root";
    private const DB_DATABASE_NAME = "db";

    protected mysqli $connection;

    public function __construct()
    {
        $this->connection = new mysqli(self::DB_HOST, self::DB_USERNAME, self::DB_PASSWORD, self::DB_DATABASE_NAME);

        if (mysqli_connect_errno()) {
            throw new AppException(500, "Não foi possível conectar ao banco.");
        }
    }

    public function select($query = "", $params = [])
    {
        $stmt = $this->executeStatement($query, $params);
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        return $result;
    }

    public function executeStatement($query = "", $params = [])
    {
        $stmt = $this->connection->prepare($query);

        if ($stmt === false) {
            throw new AppException(500, "Unable to do prepared statement: " . $query . " ERROR: " . $this->connection->error);
        }

        if ($params) {
            $stmt->bind_param($params[0], $params[1]);
        }

        $stmt->execute();

        return $stmt;
    }

    public function query($query = "")
    {
        $result =  $this->connection->query($query);
        if ($this->connection->error) {
            throw new AppException(500, $this->connection->error . PHP_EOL . $query);
        }
        return $result;
    }

    public function multiquery($query = "")
    {
        $result = mysqli_multi_query($this->connection, $query);
        if ($this->connection->error) {
            throw new AppException(500, $this->connection->error . PHP_EOL . $query);
        }
        return $result;
    }

}
