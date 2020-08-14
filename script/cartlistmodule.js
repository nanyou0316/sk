define(["jquery", "jquerycookie"], function ($) {
    return {
        init: function () {

            //1.获取所有的接口数据，判断取值。
            function showlist(sid, num) {//sid：编号  num：数量
                $.ajax({
                    url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/alldata.php',
                    dataType: 'json'
                }).done(function (data) {
                    $.each(data, function (index, value) {

                        if (sid == value.sid) {
                            let $clonebox = $('.addChecked:hidden').clone(true, true);//克隆隐藏元素
                            $clonebox.find('.pic').find('img').attr('src', value.smallpic.split(',')[2]);//图片
                            $clonebox.find('.pic').find('img').attr('sid', value.sid);//设置商品id
                            $clonebox.find('.sp-name').find('a').html(value.name);//标题
                            $clonebox.find('.sp-pirce').find('b').html(value.price);//价格
                            $clonebox.find('#sl').find('input').val(num);
                            //计算单个商品的价格
                            $clonebox.find('.sp-total').find('b').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block');
                            $('.inner_box').append($clonebox);
                            calcprice();//计算总价
                        }
                    });
                });
            }
            //2.获取cookie渲染数据
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                let s = $.cookie('cookiesid').split(',');//获取cookie 同时转换成数组[1,2]
                let n = $.cookie('cookienum').split(',');//获取cookie 同时转换成数组[10,20]
                $.each(s, function (index, value) {
                    showlist(s[index], n[index]);
                });
            };
            //3.计算总价--使用次数很多--函数封装
            function calcprice() {
                let $sum = 0;//商品的件数
                let $count = 0;//商品的总价
                $('.addChecked:visible').each(function (index, ele) {
                    if ($(ele).find('.orCheck input').prop('checked')) {//复选框勾选
                        $sum += parseInt($(ele).find('#sl input').val());//数量
                        $count += parseFloat($(ele).find('.sp-total b').html());//总价
                    }
                });
                $('.spsl-num').find('span').html($sum);
                $('.spjezj b').html($count.toFixed(2));
            }
            //4.全选
            $('.checkAll input,.f-all input').on('change', function () {
                $('.addChecked:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.checkAll input').prop('checked', $(this).prop('checked'));
                $('.f-all input').prop('checked', $(this).prop('checked'));
                calcprice();//计算总价
            });
            let $inputs = $('.addChecked:visible').find(':checkbox');
            $('.inner_box').on('change', $inputs, function () {
                //$(this):被委托的元素，checkbox
                if ($('.addChecked:visible').find(':checkbox').length === $('.addChecked:visible').find('input:checked').size()) {
                    $('.checkAll input').prop('checked', true);
                    $('.f-all input').prop('checked', true);
                } else {
                    $('.checkAll input').prop('checked', false);
                    $('.f-all input').prop('checked', false);
                }
                calcprice();//计算总价
            });

            //计算单价
            function calcsingleprice(obj) {//obj元素对象
                let $dj = parseFloat(obj.parents('.addChecked').find('.sp-pirce b').html());
                let $num = parseInt(obj.parents('.addChecked').find('#sl input').val());
                return ($dj * $num).toFixed(2)
            }

            //5.数量加的改变
            $('.add').on('click', function () {
                let $num = $(this).parents('.addChecked').find('#sl input').val();
                $num++;
                $(this).parents('.addChecked').find('#sl input').val($num);

                $(this).parents('.addChecked').find('.sp-total b').html(calcsingleprice($(this)));
                calcprice();//计算总价
                setcookie($(this));
            });
            //5.数量减的改变
            $('.sub').on('click', function () {
                let $num = $(this).parents('.addChecked').find('#sl input').val();
                $num--;
                if ($num < 1) {
                    $num = 1;
                }
                $(this).parents('.addChecked').find('#sl input').val($num);
                $(this).parents('.addChecked').find('.sp-total b').html(calcsingleprice($(this)));
                calcprice();//计算总价
                setcookie($(this));
            });
            //5.数量输入的改变
            $('#sl input').on('input', function () {
                let $reg = /^\d+$/g;//只能输入数字
                let $value = $(this).val();
                if (!$reg.test($value)) {//不是数字
                    $(this).val(1);
                }
                $(this).parents('.addChecked').find('.sp-total b').html(calcsingleprice($(this)));
                calcprice();//计算总价
                setcookie($(this));
            });


            //设置cookie进行加加减减
            //将改变后的数量存放到cookie中
            let arrsid = [];//存储商品的编号。
            let arrnum = [];//存储商品的数量。
            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');//获取cookie 同时转换成数组。[1,2,3,4]
                    arrnum = $.cookie('cookienum').split(',');//获取cookie 同时转换成数组。[12,13,14,15]
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }
            //存储cookie
            function setcookie(obj) {
                cookietoarray();
                let $sid = obj.parents('.addChecked').find('img').attr('sid');
                arrnum[$.inArray($sid, arrsid)] = obj.parents('.addChecked').find('#sl input').val();
                $.cookie('cookienum', arrnum, {
                    expires: 7,
                    path: '/'
                });
            }
            //cookie删除
            function delcookie(sid, arrsid) {//sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
                let $index = -1;//设置删除的索引位置
                $.each(arrsid, function (index, value) {
                    if (sid === value) {
                        $index = index;
                    }
                });
                arrsid.splice($index, 1);
                arrnum.splice($index, 1);
                $.cookie('cookiesid', arrsid, {
                    expires: 7,
                    path: '/'
                });
                $.cookie('cookienum', arrnum, {
                    expires: 7,
                    path: '/'
                });
            }
            //6.删除单件商品
            $('.del a').on('click', function () {
                cookietoarray();
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.addChecked').remove();
                    delcookie($(this).parents('.addChecked').find('img').attr('sid'), arrsid);
                    calcprice();//计算总价
                }
            });
            //7.删除全选
            $('.del-check a').on('click', function () {
                cookietoarray();
                if (window.confirm('你确定要全部删除吗?')) {
                    $('.addChecked:visible').each(function () {
                        if ($(this).find(':checkbox').is(':checked')) {//判断复选框是否选中
                            $(this).remove();
                            delcookie($(this).find('img').attr('sid'), arrsid);
                        }
                    });
                    calcprice();//计算总价
                }
                return false
            });

        }
    }
})
