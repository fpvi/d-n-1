<?php
include_once "./Models/Database.php";
class Lesson
{
    private $db;
    function __construct()
    {
        $this->db = new Database();
    }

    function getAll()
    {
        $sql = "SELECT * FROM lessons";
        return $this->db->query($sql);
    }
    function getByIdCou($id, $limit = 4)
    {
        $sql = "SELECT * FROM lessons WHERE course_id = ? ORDER by sort_order ASC ";
        if ($limit != null) {
            $sql .= 'LIMIT ' . $limit;
        }

        return $this->db->query($sql, $id);
    }
    function getByIdUser($id)
    {
        $sql = "SELECT * FROM lessons WHERE course_id = ? ";
        return $this->db->query($sql, $id);
    }
    function getAcc($accordion)
    {
        $sql = "SELECT * FROM lessons WHERE sort_order = ? ";
        return $this->db->queryOne($sql, $accordion);
    }
    function lessionCre($course_id, $title, $video, $content)
    {
        $sql = "INSERT INTO lessons (course_id, title, video, content, sort_order)
        VALUES (
        {$course_id},
        {$title},
        '{$video}',
        {$content},
        (
            SELECT * FROM (
            SELECT COUNT(*) + 1 FROM lessons WHERE course_id = {$course_id}
            ) AS temp
        )
        );";
        return $this->db->update($sql);
    }

    function deleteByid($id)
    {
        $sql = '
        DELETE FROM lessons WHERE `lessons`.`id` = ?
        ';
        return $this->db->delete($sql, $id);
    }


}