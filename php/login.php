<?php
include "conn.php";

if (isset($_POST['name']) && isset($_POST['pass'])) {
    $user = $_POST['name'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from registry where username='$user' and password='$pass'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;//1
    } else { //匹配不成功
        echo false;//空
    }
}