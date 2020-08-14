define(['jquery', "jquerylazyload", 'page'], function ($) {
    return {
        init: function () {

            //排序的初始值
            let array_default = []; //排序前的数组，默认的
            let array = []; //排序中的数组
            let prev = null; //当前的li里面的价格。
            let next = null; //下一个li里面的价格。

            //1.渲染商品列表
            let $list = $('.commodity_list>ul');
            $.ajax({
                url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/listdata.php',
                dataType: 'json'
            }).done((data) => {
                // console.log(data);
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
                //分页：
                //先清空数组原来的值。
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面默认渲染的li元素加载到两个数组中
                $('.commodity_list>ul li').each(function (index, element) { //index:下标索引 element:元素对象 $(this):元素对象
                    array[index] = $(this); //赋值给数组
                    array_default[index] = $(this); //赋值给数组

                });
                console.log(array); //10个li元素
            });

            $('.page').pagination({
                pageCount: 5, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                // coping: true, //是否开启首页和尾页，布尔值。
                // homePage: '首页',
                // endPage: '尾页',
                callback: function (api) { //api:对象，包含分页信息。
                    //点击分页页码将页码传给后端。
                    //获取的页码给后端
                    console.log(api.getCurrent());
                    $.ajax({
                        url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/listdata.php',
                        data: { //将分页对象返回的页码传输给后端
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function (data) { //根据页码重新获取接口数据，进行渲染。
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
                        //分页结束了。

                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;

                        //将页面的li元素加载到两个数组中
                        $('.list li').each(function (index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    })
                }
            });

            let flag = true
            $('.product_control_btn li:last').on('click', function () {

                if (flag) {
                    for (let i = 0; i < array.length - 1; i++) {
                        for (let j = 0; j < array.length - i - 1; j++) {
                            prev = parseFloat(array[j].find('.dl-price b>span').html()); //当前li的价格
                            next = parseFloat(array[j + 1].find('.dl-price b>span').html()); //下一个li的价格
                            //通过价格的判断，改变的是li的位置。
                            //如果第一个li里面的价格>第二个li的价格。 交换的是li的位置。
                            if (prev > next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }
                    }
                    console.log(array[0][0])
                    console.log(array[1][0])
                    //清空原来的列表，将排序后的数据添加上去。
                    //empty() : 删除匹配的元素集合中所有的子节点。
                    $('.commodity_list>ul').empty(); //清空原来的列表
                    $.each(array, function (index, value) { //重新渲染，追加
                        $('.commodity_list>ul').append(value);
                    });

                    flag = false
                } else {
                    for (let i = 0; i < array.length - 1; i++) {
                        for (let j = 0; j < array.length - i - 1; j++) {
                            prev = parseFloat(array[j].find('.dl-price b>span').html()); //当前li的价格
                            next = parseFloat(array[j + 1].find('.dl-price b>span').html()); //下一个li的价格
                            //通过价格的判断，改变的是li的位置。
                            //如果第一个li里面的价格>第二个li的价格。 交换的是li的位置。
                            if (prev < next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }
                    }
                    console.log(array[0][0])
                    console.log(array[1][0])
                    //清空原来的列表，将排序后的数据添加上去。
                    //empty() : 删除匹配的元素集合中所有的子节点。
                    $('.commodity_list>ul').empty(); //清空原来的列表
                    $.each(array, function (index, value) { //重新渲染，追加
                        $('.commodity_list>ul').append(value);
                    });
                    flag = true
                }
            })
        }
    }
})