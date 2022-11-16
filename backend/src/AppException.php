<?php

namespace Main;

use Exception;

class AppException extends Exception
{
    private $HTTPCode;

    function __construct(int $HTTPCode = 200, string $message)
    {
        $this->HTTPCode = $HTTPCode;
        $this->message = $message;
    }

    public function getHTTPCode()
    {
        return $this->HTTPCode;
    }
}
