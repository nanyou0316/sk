<?php

include "conn.php";

if (isset($_POST['sid'])) {
    $sid = $_POST['sid']; //接收首页传入的sid
    $result = $conn->query("select * from sk where sid=$sid");
    echo json_encode($result->fetch_assoc());//输出数据
}