define(['jquery', "jquerylazyload"], function ($) {
    return {
        init: function () {
            //1.渲染商品列表
            let $list = $('.commodity_list>ul');
            $.ajax({
                url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/alldata.php',
                dataType: 'json'
            }).done((data) => {
                console.log(data);
                let strHtml = '';
                $.each(data, function (index, value) {


                    strHtml += `<li><a href="datail.html?sid=${value.sid}">
                        <div class="show_tips">
                            <img src="" class='lazy' data-original="${value.pic}" width="240" height="240"
                                alt="">
                        </div>
                        <div class="colorType"></div>
                        <div class="dl_tips">
                            <span class="s1">欧洲</span>
                            <span class="s1">自营</span>
                            <span class="s2">直降</span>
                        </div>

                        <div class="jieShao">
                            <p class="dl_name">${value.name}</p>
                            <p class="dl-price"><b>￥<span>${value.price}</span></b><span class="soucang">收藏</span></p>
                        </div>
                    </a>

                </li>`
                    // $list.append(strHtml)
                });
                $list.html(strHtml);
                $(function () { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式 谈入
                    });
                });




            });


        }
    }
})