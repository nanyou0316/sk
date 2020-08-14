_require.config({
    paths: {
        //配置名称和路径。
        //映射
        "jquery": "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery",
        "jquerycookie": "https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie",
        "jquerylazyload": "https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload",
        "sha1": "./sha1",
        'page': './jquery.pagination'
    },
    shim: {
        "jquerycookie": {
            deps: ['jquery']//依赖关系
        },
        "jquerylazyload": {
            deps: ['jquery']//依赖关系
        },
        "page": {
            deps: ['jquery']//依赖关系
        },
    }
});
// <script src="js/require.js" async="true" defer data-main="js/main.js" id="currentpage" targetpage="indexmodule"></script>
_require(["jquery"], function ($) {
    //引入jquery模块
    let $currentpage = $("#currentpage"); //获取元素
    let currentmodule = $currentpage.attr("targetpage"); //获取元素的自定义的属性。

    if (currentmodule) {
        //模块是否存在
        _require([currentmodule], function (cmodule) {
            //加载模块
            cmodule.init();
        });
    }
});