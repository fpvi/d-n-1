<?php

class PageController
{
    // private $categoriesModel;

    private $productModel;
    public function __construct()
    {
        include_once("Models/Products.php");
        $this->productModel = new Products();

    }
    public function home()
    {

        $products = $this->productModel->getAll();
        include_once 'Views/home.php';
    }
}
