<?php
include_once "./Models/Database.php";
class Enrollments
{
    private $db;
    function __construct()
    {
        $this->db = new Database();
    }

    function getAll()
    {
        $sql = "SELECT * FROM enrollments";
        return $this->db->query($sql);
    }
    function getAllTeacher()
    {
        $sql = "SELECT * FROM enrollments where role = 'teacher' ";
        return $this->db->query($sql);
    }

    function phantrang($id, $page = 1, $limit = 10)
    {
        $offset = ($page - 1) * $limit;
        $sql = "SELECT enrollments.* ,courses.status, courses.title 
                FROM enrollments 
                JOIN courses ON enrollments.course_id = courses.id 
                WHERE user_id = ? 
                LIMIT {$limit} OFFSET {$offset}";

        return $this->db->query($sql, $id);
    }
    function getEnrollByidteach($id)
    {
        $sql = "SELECT courses.id course_id, enrollments.enrolled_at, enrollments.user_id , courses.title, courses.status
                FROM enrollments 
                JOIN courses ON enrollments.course_id = courses.id 
                WHERE user_id = ? ";
        return $this->db->query($sql, $id);
    }

    function listCourseById($id)
    {
        $sql = "SELECT user_id FROM enrollments where course_id = ?";
        return $this->db->query($sql, $id);
    }
    function listUserById($id)
    {
        $sql = "SELECT course_id FROM enrollments where user_id = ?";
        return $this->db->query($sql, $id);
    }
    function listCourseByArayId($id)
    {
        $placeholder = implode(',', array_fill(0, count($id), '?'));


        $sql = "SELECT enrollments.* , users.name , users.id , courses.title FROM enrollments join users on enrollments.user_id = users.id JOIN courses ON enrollments.course_id = courses.id  where course_id in (" . $placeholder . ") and enrollments.role = 'student'";
        return $this->db->query($sql, ...$id);
    }
    function Erollcre($user_id, $role, $price, $enrollment_at)
    {
        $sql = "INSERT INTO `enrollments`(`user_id`,`course_id`, `role`, `price`, `enrolled_at`) VALUES (?,
        (SELECT MAX(id) FROM courses),?,?,?)";
        return $this->db->insert($sql, $user_id, $role, $price, $enrollment_at);

    }
    function Erolladd($user_id, $course_id, $role, $price, $enrollment_at)
    {
        $sql = "INSERT INTO `enrollments`(`user_id`,`course_id`, `role`, `price`, `enrolled_at`) VALUES (?,?,?,?,?)";
        return $this->db->insert($sql, $user_id, $course_id, $role, $price, $enrollment_at);


    }


}
