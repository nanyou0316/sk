<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['name'])) {//判断发送过来的是否存在
    $user = $_POST['name'];
    $result = $conn->query("select * from registry where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo 'true'; //1
    } else {
        echo 'false'; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {//提交时成立  存在这个数据 再往下执行
    $username = $_POST['username'];
    $password = sha1($_POST['password']);
   
    $conn->query("insert registry values(null,'$username','$password',NOW())");
    echo 1;
    // header('http://localhost/study_progress/the_second/nodejs/siku_project/dist/html/login.html');
}