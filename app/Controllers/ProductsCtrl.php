<?php
class ProductsCtrl
{
    private $CourseModel;
    private $productModel;
    private $CatModel;

    public function __construct()
    {
        include_once __DIR__ . "/../Models/Products.php";
        $this->productModel = new Products();
    }
    public function index()
    {


        // $produts = $this->productModel->getAll();
        // var_dump($produts);
    }
}
?>