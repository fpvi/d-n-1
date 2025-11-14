<?php
class LoginCtrl
{
    private $CourseModel;
    private $UserModel;
    private $CatModel;

    public function __construct()
    {
        $this->CourseModel = new Course();
        $this->UserModel = new Users();
    }
    public function index()
    {
        $user = $_SESSION['user'] ?? '';
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        $user_name = $this->UserModel->getByEmail($email);
        if (isset($_POST['log'])) {
            $this->UserModel->login($user_name, $password);
        }



        include_once 'Views/user_login.php';
    }
}
?>