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

        $productsFeatured = $this->productModel->getProducts(4, [1]);

        $productsTrending = $this->productModel->getProducts(4, [2]);

        $productsCollections = $this->productModel->getProducts(4, [3]);
        // var_dump($productsFeatured);
        include_once 'Views/home.php';
    }
}