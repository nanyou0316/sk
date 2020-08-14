define(['jquery', 'jquerycookie'], function ($) {
    return {
        init: function () {
            //用户名
            let $name = $('.username');
            //密码
            let $pwd = $('.pwd');
            //确认密码
            let $again_mima = $('.againPwd');
            var usernameflag = true;
            var pwsflag = true;
            var againflag = true;
            //用户名验证
            $name.on('blur', function () {
                if ($name.val() !== '') {
                    var reg1 = /^1[345678]\d{9}$/;
                    var reg2 = /^(\w+[+-.]*\w+)\@([\w]+[-.]*[\w]+)\.([\w]+[-.]*[\w]+)$/;
                    if (reg1.test($name.val()) || reg2.test($name.val())) {
                        // $('.jyname').html('输入正确');
                        // $('.jyname').css('color', 'green')

                        $.ajax({
                            url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/registry.php',
                            data: `name=${$name.val()}`,
                            type: 'post'
                        }).done((data) => {
                            console.log(data);
                            if (data == 'true') {
                                $('.jyname').html('该用户名已被注册');
                                $('.jyname').css('color', 'red');
                                usernameflag = false;
                            } else {
                                $('.jyname').html('号码和邮箱可以使用');
                                $('.jyname').css('color', 'green');
                                usernameflag = true;
                            }
                        });

                    } else {
                        $('.jyname').html('请输入正确信息');
                        $('.jyname').css('color', 'black')
                        usernameflag = false;
                    }

                } else {
                    $('.jyname').html('用户姓名不能为空');
                    $('.jyname').css('color', 'red');
                    usernameflag = false;
                }
            })
            //密码验证
            $pwd.on('focus', function () {
                $('.mima').html('密码为6到12位')
                $('.mima').css('color', 'black')
            })
            $pwd.on('blur', function () {

                if ($pwd.val().length >= 6 && $pwd.val().length <= 12) {

                    //计算弱中强
                    var regnum = /[0-9]/; //匹配数字
                    var reguppercase = /[A-Z]/; //匹配大写字母
                    var reglowercase = /[a-z]/; //匹配小写字母
                    var regother = /[\W\_]/; //匹配特殊字符
                    var count = 0; //计数器
                    if (regnum.test(this.value)) {
                        count++;
                    }
                    if (reguppercase.test(this.value)) {
                        count++;
                    }
                    if (reglowercase.test(this.value)) {
                        count++;
                    }
                    if (regother.test(this.value)) {
                        count++;
                    }
                    switch (count) {
                        case 1:
                            $('.mima').html('密码弱')
                            $('.mima').css('color', 'red')
                            pwsflag = false;
                            break;
                        case 2:
                        case 3:

                            $('.mima').html('密码中')
                            $('.mima').css('color', 'orange')
                            pwsflag = true;

                            break;
                        case 4:

                            $('.mima').html('密码强')
                            $('.mima').css('color', 'green')
                            pwsflag = true;
                            break;
                    }
                } else {
                    $('.mima').html('密码长度有问题');
                    $('.mima').css('color', 'red');
                    pwsflag = false;
                }
            })
            //重复验证密码
            $again_mima.on('focus', function () {
                $('.qr_mima').html('请再次输入密码');
                $('.qr_mima').css('color', 'black')
            });
            $again_mima.on('blur', function () {

                if ($again_mima.val() == $pwd.val()) {
                    $('.qr_mima').html('密码正确');
                    $('.qr_mima').css('color', 'green')
                    againflag = true;
                } else if ($again_mima.val() == '') {
                    $('.qr_mima').html('请再次输入密码');
                    $('.qr_mima').css('color', 'red')
                    againflag = false;
                } else {
                    $('.qr_mima').html('密码输入不正确');
                    $('.qr_mima').css('color', 'red')
                    againflag = false;
                }


            });
            if ($name.val() == '') {
                usernameflag = false;
            }
            if ($pwd.val() == '') {
                pwsflag = false;
            }
            if ($again_mima.val() == '') {
                againflag = false;
            }
            $('.submit-btn').on('click', function () {
                console.log(1);
                if (!usernameflag || !pwsflag || !againflag) {
                    console.log(2);
                    $('.fall_info').show()
                    setTimeout(function () { $('.fall_info').hide() }, 2000)
                } else {
                    console.log(3);

                    $.ajax({
                        url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/registry.php',
                        data: `username=${$name.val()}&password=${$pwd.val()}&submit=1`,
                        type: 'post'
                    }).done((data) => {
                        console.log(data);
                        $name.val(' ');
                        $pwd.val(' ');
                        $again_mima.val(' ')

                        // window.location.href = 'login.html'
                    })
                }
            })
        }
    }

})