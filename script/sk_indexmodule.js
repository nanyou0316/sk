define(['jquery', 'jquerylazyload', 'jquerycookie'], function ($) {
    return {
        init: function () {
            //用户名信息
            if ($.cookie('username')) {
                $('.login').html('欢迎' + $.cookie('username'));
                $('.login').css('color', 'red');
            } else {
                $('.login').html('登陆')
            }

            let num = 0;
            let a = 1;
            let $product_list = $('.product-list');
            xuanran();
            $('#right').on('click', function () {
                a++;
                if (a == 9) {
                    a = 1;
                    num = 0;
                }
                console.log(a);
                xuanran();
                return false;
            });
            $('#left').on('click', function () {
                num = 0;
                a--;
                if (a == 0) {
                    a = 8;
                }
                num = (a - 1) * 5;
                console.log(a);
                xuanran();
                return false;
            });
            function xuanran() {
                $.ajax({
                    url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/alldata.php',
                    dataType: 'json'
                }).done((data) => {
                    let strHtml = '';
                    $.each(data, function (index, value) {
                        if (num < a * 5) {
                            strHtml += `<li>
                            <a href="list.html">
                                <div class="product-img">
                                    <img class='lazy' src=''  data-original="${data[num].pic}"
                                        alt="">
                                    <div class="mask"></div>
                                </div>
                                <div class="product-details">
                                    <p class="product-name">HOGAN/HOGANHOGAN/HOGANHOGAN/HOGAN</p>
                                    <p class="product-desc">${data[num].name}</p>
                                    <div class="line"></div>
                                    <p class="product-price">￥${data[num].price}</p>
                                </div>
    
                            </a>
    
                        </li>`
                            num++;
                        } else {
                            return
                        }
                        $product_list.html(strHtml)
                        console.log(num)
                        $(function () { //和拼接的元素放在一起。
                            $("img.lazy").lazyload({
                                effect: "fadeIn" //图片显示方式 谈入
                            });
                        });

                    });
                })
            }

        }
    }
})