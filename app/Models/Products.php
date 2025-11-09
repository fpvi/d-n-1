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
    $sql = "SELECT * FROM sanpham";
    return $this->db->query($sql);
  }

  function getPro($sort = null, $limit = null, $categories = null, $teacher = null, $search = null)
  {
    $sql = 'SELECT * FROM Products';
    $params = [];
    $where = [];

    //lọc thư mục 
    if (!empty($categories)) {
      $placeholders = implode(',', array_fill(0, count($categories), '?'));
      $where[] = 'category_id IN (' . $placeholders . ')';
      $params = array_merge($params, $categories);
    }

    // lọc giản viên
    if (!empty($teacher)) {
      $placeholders = implode(',', array_fill(0, count($teacher), '?'));
      $where[] = 'teacher_id IN (' . $placeholders . ')';
      $params = array_merge($params, $teacher);
    }
    // tìm kiếm
    if (!empty($search) || $search == 0) {
      $where[] = 'title LIKE ?';
      $params[] = '% ' . $search . '%';
    }

    // nối where
    if ($where) {
      $sql .= ' where ' . implode(' and ', $where) . 'and status = 1';
    } else {
      $sql .= ' where status = 1';
    }

    // xấp xếp 
    if ($sort === 'asc') {
      $sql .= " ORDER BY price ASC";
    } elseif ($sort === 'desc') {
      $sql .= " ORDER BY price DESC";
    }

    // Giới hạn số lượng
    if ($limit) {
      $sql .= " LIMIT " . intval($limit);
    }


    return $this->db->query($sql, ...$params);
  }

  function couById($id = null)
  {
    $sql = 'SELECT * FROM Products where id = ? ';
    return $this->db->queryOne($sql, $id);

  }
  // lọc tìm kiếm đảm bảo k bị hack
  function fil($str)
  {
    $str = trim($_GET['search'] ?? '');
    $str = strip_tags($str);
    $str = htmlspecialchars($str, ENT_QUOTES);
    return $str;
  }
  // Lấy nhiều khóa học trong array id
  function getProductsrrayId($array_Productsd)
  {
    if (empty($array_Productsd))
      return [];

    $placeholders = implode(',', array_fill(0, count($array_Productsd), '?'));

    $sql = "SELECT * FROM Products WHERE id IN ($placeholders) and status = 1 ";

    return $this->db->query($sql, ...$array_Productsd);

  }
}
