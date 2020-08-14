define(['jquery', 'jquerycookie'], function ($) {
    return {
        init: function () {
            // var $sid = '';
            // if ($sid.length == 0) {
            //     $sid = '1';
            // } else {

            // }
            var $sid = location.search.substring(1).split('=')[1];
            //小图片
            let $piclist = $('#imgshow');
            $.ajax({
                type: 'post',
                url: 'http://localhost/study_progress/the_second/nodejs/siku_project/src/php/getsid.php',
                data: {
                    sid: $sid //传给后端
                },
                dataType: 'json'
            }).then(function (data) {



                //图片
                $('.small-pic>img').attr('src', data.pic);
                //名字
                $('.proName>span').html(data.name);
                //价格
                $('.yikoujia>b').html(data.price);
                //小图片
                let spic = data.smallpic.split(',');
                //大图片
                $('.bigpic>img').attr('src', data.pic)
                //侧边小图片
                $.each(spic, function (index, value) {
                    if (index == '0') {
                        $piclist.append(`<li><img src="${value}" alt= "" ><div class='biankuang'></div></li>`);
                    } else {
                        $piclist.append(`<li><img src="${value}" alt= "" ><div></div></li>`);
                    }
                });




                //小图片列表
                let imgList = document.querySelector('#imgshow');
                //小图片
                let s_pic = document.querySelector('.s-pic');
                //小放
                let xf = document.querySelector('.x-fang');
                //大图片
                let b_pic = document.querySelector('.bigpic img');
                //大放
                let df = document.querySelector('.bigpic');
                //小图片得父元素
                let spic_father = document.querySelector('.small-pic');
                // 小图片切换
                imgList.onmouseover = (ev) => {
                    var ev = ev || event;
                    let element = ev.target || ev.srcElement;
                    if (element.nodeName === 'IMG') {
                        // element.src//当前点击的图片的地址
                        s_pic.src = element.src;
                        b_pic.src = s_pic.src;

                    }
                }
                // let iNow = null;
                // $('.four-pic').on('click', ".four-pic #imgshow li div", function () {
                //     console.log(1);
                // })

                //放大镜效果
                spic_father.onmouseover = () => {

                    xf.style.visibility = 'visible';
                    df.style.visibility = 'visible';
                    //求小放的尺寸和比例
                    xf.style.width = s_pic.offsetWidth * df.offsetWidth / b_pic.offsetWidth + 'px';
                    xf.style.height = s_pic.offsetHeight * df.offsetHeight / b_pic.offsetHeight + 'px';

                    //比例
                    var bili = b_pic.offsetWidth / s_pic.offsetWidth;

                    spic_father.onmousemove = (ev) => {
                        var ev = ev || window.event;
                        let leftvalue = ev.pageX - spic_father.offsetLeft - xf.offsetWidth / 2;
                        let topvalue = ev.pageY - spic_father.offsetTop - xf.offsetHeight / 2;


                        if (leftvalue <= 0) {
                            leftvalue = 0;
                        } else if (leftvalue >= s_pic.offsetWidth - xf.offsetWidth) {
                            leftvalue = s_pic.offsetWidth - xf.offsetWidth;
                        }
                        if (topvalue <= 0) {
                            topvalue = 0;
                        } else if (topvalue >= s_pic.offsetHeight - xf.offsetHeight) {
                            topvalue = s_pic.offsetHeight - xf.offsetHeight;
                        }
                        xf.style.left = leftvalue + 'px';
                        xf.style.top = topvalue + 'px';

                        b_pic.style.left = -bili * leftvalue + 'px';
                        b_pic.style.top = -bili * topvalue + 'px';
                    };

                };
                spic_father.onmouseout = () => {
                    xf.style.visibility = 'hidden';
                    df.style.visibility = 'hidden';
                };

                //数量加减效果
                $('.add').on('click', function () {
                    let num = $(this).siblings('input').val();
                    if (num == $('.shengyu').html()) {
                        $(this).attr('disabled')
                    } else {
                        $(this).siblings('input').val(++num)
                    };



                });
                $('.sub').on('click', function () {
                    let num = $(this).siblings('input').val();
                    if (num > '1') {

                        $(this).siblings('input').val(--num);
                    } else {
                        $(this).attr('disabled')
                    }



                })
                //加入购物车
                var arrsid = []; //商品sid
                var arrnum = []; //商品数量
                function cookietoarray() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                        arrsid = $.cookie('cookiesid').split(',');
                        arrnum = $.cookie('cookienum').split(',');
                    } else {
                        arrsid = [];
                        arrnum = [];
                    }
                }
                $('.tocar').on('click', function () {

                    cookietoarray();
                    //获取cookie里面的sid，将其转换成数组arrsid。
                    //再获取当前商品的sid，用当前的sid和arrsid进行比较，确认当前sid是否存在arrsid。
                    //如果存在，不是第一次，否则第一次。
                    if (arrsid.indexOf($sid) === -1) { //第一次
                        arrsid.push($sid);
                        $.cookie('cookiesid', arrsid, { expires: 7, path: '/' });
                        arrnum.push($('.buynum input').val());
                        $.cookie('cookienum', arrnum, { expires: 7, path: '/' });

                    } else { //多次
                        //获取前面添加的数量+当前的数量
                        //获取this.sid对应得位置。
                        let index = arrsid.indexOf($sid);
                        let count = parseInt(arrnum[index]) + parseInt($('.buynum input').val());
                        //一起存入cookie
                        arrnum[index] = count;
                        $.cookie('cookienum', arrnum, { expires: 7, path: '/' });

                    }
                    $('.tisikuang').css('visibility', "visible");
                    setTimeout(() => {
                        $('.tisikuang').css('visibility', "hidden");
                    }, 1500)

                });
                $('.tobuy').on('click', function () {
                    cookietoarray();
                    //获取cookie里面的sid，将其转换成数组arrsid。
                    //再获取当前商品的sid，用当前的sid和arrsid进行比较，确认当前sid是否存在arrsid。
                    //如果存在，不是第一次，否则第一次。
                    if (arrsid.indexOf($sid) === -1) { //第一次
                        arrsid.push($sid);
                        $.cookie('cookiesid', arrsid, { expires: 7, path: '/' });
                        arrnum.push($('.buynum input').val());
                        $.cookie('cookienum', arrnum, { expires: 7, path: '/' });
                    } else { //多次
                        //获取前面添加的数量+当前的数量
                        //获取this.sid对应得位置。
                        let index = arrsid.indexOf($sid);
                        let count = parseInt(arrnum[index]);
                        //一起存入cookie
                        arrnum[index] = count;
                        $.cookie('cookienum', arrnum, { expires: 7, path: '/' });
                    };


                });

            })
        }
    }
})