<?php

namespace Main\Controller;

use Main\AppException;
use Main\Model\UserModel;
use stdClass;

class UserController extends BaseController
{

    public function get()
    {
        $userModel = new UserModel();
        $data = $userModel->get($this->getQueryFilters($userModel->getAllowedFilters()));
        return $data;
    }


    public function post()
    {
        $user = $this->getJSONBody();

        if (empty($user->name) || empty($user->email) || empty($user->password)) {
            throw new AppException(401, 'Parâmetros insuficientes.');
        }

        $userModel = new UserModel();

        return $userModel->post($user->name, $user->email, password_hash($user->password, PASSWORD_DEFAULT));
    }

    public static function getLoggedUserId()
    {
        if ($_SESSION['loggedin'] == true) {
            return $_SESSION['id'];
        }
        return false;
    }

    public static function checkAuth()
    {
        $id = json_decode(file_get_contents('php://input'), true)['loggedUserId']; 
        if (!$id) {
            throw new AppException(401, 'Faça log-in. ');
        }
        $_SESSION['loggedin'] = true;
        $_SESSION['id'] = $id;
    }

    public function login()
    {
        $user = $this->getJSONBody();

        if (empty($user->email) || empty($user->password)) {
            throw new AppException(401, "Parâmetros insuficientes. $user->email $user->password");
        }

        $userModel = new UserModel();
        $data = $userModel->get("email = '$user->email'");
        if (!$data) {
            throw new AppException(200, 'Usuário não encontrado.');
        }

        if (!password_verify($user->password, $data[0]['password'])) {
            throw new AppException(200, 'Senha não confere.');
        }

        //session_regenerate_id();
        $_SESSION['loggedin'] = true;
        $_SESSION['name'] = $data[0]['name'];
        $_SESSION['id'] = $data[0]['id'];
        return ['loggedin' => true, 'user_id' => $_SESSION['id']];
    }

    public function logout()
    {
        session_destroy();
        return true;
    }
}
