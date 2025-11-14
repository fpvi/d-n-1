<?php
include_once "./Models/Database.php";
class Products
{
  private $db;
  function __construct()
  {
    $this->db = new Database();
  }

  function getAll()
  {
    $sql = "SELECT * FROM products";
    return $this->db->query($sql);
  }

  function getPro($limit = null, $categories = null, $brand = null, $search = null)
  {
    $sql = 'SELECT * FROM products';
    $params = [];
    $where = [];

    //lọc thư mục 
    if (!empty($categories)) {
      $placeholders = implode(',', array_fill(0, count($categories), '?'));
      $where[] = 'category_id IN (  ' . $placeholders . ')';
      $params = array_merge($params, $categories);
    }

    // lọc hảng
    if (!empty($brand)) {
      $placeholders = implode(',', array_fill(0, count($brand), '?'));
      $where[] = 'brand_id IN (' . $placeholders . ')';
      $params = array_merge($params, $brand);
    }
    // tìm kiếm
    if (!empty($search) || $search == 0) {
      $where[] = 'name LIKE ?';
      $params[] = '% ' . $search . '%';
    }

    // nối where
    if ($where) {
      $sql .= ' where ' . implode(' and ', $where);
    } else {
      $sql .= ' status = "published" ';
    }

    // Giới hạn số lượng
    if ($limit) {
      $sql .= " LIMIT " . intval($limit);
    }


    return $this->db->query($sql, ...$params);
  }

  function getProductById($id = null)
  {
    $sql = 'SELECT * FROM Products where id = ? and status = "published"';
    return $this->db->queryOne($sql, $id);

  }
  function getProductsByColor_id($id)
  {
    $params = [];
    $sql = 'SELECT products.*, variants.color_id
    FROM products
    INNER JOIN variants ON products.id  = variants.product_id';

    $placeholders = implode(',', array_fill(0, count($id), '?'));
    $sql .= " WHERE variants.color_id in ( $placeholders );";
    return $this->db->query($sql, ...$id);
  }
  function getProductsBySize_id($id)
  {
    $params = [];
    $sql = 'SELECT products.*, variants.size_id
    FROM products
    INNER JOIN variants ON products.id  = variants.product_id';

    $placeholders = implode(',', array_fill(0, count($id), '?'));
    $sql .= " WHERE variants.size_id in ( $placeholders );";
    return $this->db->query($sql, ...$id);
  }

  // Lấy nhiều khóa học trong array id  
  function getProductsrray($array_Products)
  {

    if (empty($array_Products))
      return [];

    $placeholders = implode(',', array_fill(0, count($array_Products), '?'));

    $sql = "SELECT * FROM Products WHERE id IN ($placeholders) and status = 'published' ";

    return $this->db->query($sql, ...$array_Products);

  }
}
