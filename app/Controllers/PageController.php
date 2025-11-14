<?php

class PageCtrl
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

        $products = $this->productModel->getProductsBySize_id([1, 2]);
        // print_r($products);
        include_once 'Views/home.php';
    }
}