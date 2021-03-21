$(function () {
    var s = $("#user_name").text();

    if (s != "请登录！") {
        s = s.substr(4, s.length - 4);
        console.log(s);
        $("#user_name").text(s);
    }
    var input = document.getElementById('find');
    input.onfocus = function () {
        if (this.value == "美美的衣服") {
            this.value = "";
            this.style.color = "black";
            this.style.border = "none";
        }
    }
    input.onblur = function () {
        if (this.value == "") {
            this.value = "美美的衣服";
            this.style.color = "#999";
        }
    }
    var arr = document.getElementsByClassName("item");
    var btn1 = document.getElementById("gonext");
    var btn2 = document.getElementById("gopre");
    var arr2 = document.getElementsByClassName("point");
    var last = -1;
    var index = 0;
    $(".bo .PointList .point").on('click', function () {
        index = $(this).index();
        clear();
        arr[index].className = "item active";
        arr2[index].className = "point show";
    });
    var clear = function () {
        for (var i = 0; i <= 7; i++) {
            arr2[i].className = "point";
            arr[i].className = "item";
        }
    }
    btn1.onclick = function () {
        clear();
        index++;
        if (index == 8)
            index = 0;
        arr[index].className = "item active"
        arr2[index].className = "point show";
    }
    btn2.onclick = function () {
        clear();
        index--;
        if (index == -1)
            index = 7;
        arr[index].className = "item active"
        arr2[index].className = "point show";
    }
    var timer = setInterval(function () {
        index++;
        if (index == 8)
            index = 0;
        clear();
        arr[index].className = "item active"
        arr2[index].className = "point show";
    }, 2000);
    $(".outer2 .content .bo ul .item img").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            index++;
            if (index == 8)
                index = 0;
            clear();
            arr[index].className = "item active"
            arr2[index].className = "point show";
        }, 2000);
    });
    $(".bo button").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            index++;
            if (index == 8)
                index = 0;
            clear();
            arr[index].className = "item active"
            arr2[index].className = "point show";
        }, 2000);
    });

    $(".left_nav ul li").hover(function () {
        var t = $(this).index();
        var tt;
        if (t == 0) {
            $(".big_nav1").css("display", "inline-block");
        }
        if (t == 1) {
            $(".big_nav2").css("display", "inline-block");
        }
        if (t == 2) {
            $(".big_nav3").css("display", "inline-block");
        }
        if (t == 3) {
            $(".big_nav4").css("display", "inline-block");
        }
        if (t == 4) {
            $(".big_nav5").css("display", "inline-block");
        }
        if (t == 5) {
            $(".big_nav6").css("display", "inline-block");
        }
        if (t == 6) {
            $(".big_nav7").css("display", "inline-block");
        }
        if (t == 7) {
            $(".big_nav8").css("display", "inline-block");
        }
        if (t == 8) {
            $(".big_nav9").css("display", "inline-block");
        }
        if (t == 9) {
            $(".big_nav10").css("display", "inline-block");
        }
        if (t == 10) {
            $(".big_nav11").css("display", "inline-block");
        }
        if (t == 11) {
            $(".big_nav12").css("display", "inline-block");
        }
        if (t == 12) {
            $(".big_nav13").css("display", "inline-block");
        }
        if (t == 13) {
            $(".big_nav14").css("display", "inline-block");
        }
        if (t == 14) {
            $(".big_nav15").css("display", "inline-block");
        }
        if (t == 15) {
            $(".big_nav16").css("display", "inline-block");
        }
    }, function () {
        $(".big_nav1").css("display", "none");
        $(".big_nav1").css("display", "none");
        $(".big_nav2").css("display", "none");
        $(".big_nav3").css("display", "none");
        $(".big_nav4").css("display", "none");
        $(".big_nav5").css("display", "none");
        $(".big_nav6").css("display", "none");
        $(".big_nav7").css("display", "none");
        $(".big_nav8").css("display", "none");
        $(".big_nav9").css("display", "none");
        $(".big_nav10").css("display", "none");
        $(".big_nav11").css("display", "none");
        $(".big_nav12").css("display", "none");
        $(".big_nav13").css("display", "none");
        $(".big_nav14").css("display", "none");
        $(".big_nav15").css("display", "none");
        $(".big_nav16").css("display", "none");
    });

    /* 睡眠函数 */
    function sleep(n) {
        var start = new Date().getTime();
        while (true) {
            if (new Date().getTime() - start > n)
                break;
        }
    }

    var fallcnt = 0;
    var flalltimer = setInterval(function () {
        var s = "-" + fallcnt + "px";
        fallcnt++;
        if (fallcnt == 651)
            fallcnt = 0;
        if (fallcnt == 222 || fallcnt == 439 || fallcnt == 7) {
            sleep(2000);
        }
        $(".fall_ul").css("margin-top", s);
    }, 20);

    var last;
    $(".tuijian .tab_nav ul li").hover(function () {
        var index = $(this).index();
        $(this).find(".text").addClass("active1");
        $(this).find(".la2").css("display", "inline-block");
        $(this).find(".sub_text").addClass("active");
        $(last).find(".sub_text").removeClass("active");
        $(last).find(".text").removeClass("active1");
    }, function () {
        $(this).find(".la2").css("display", "none");
        last = this;
    });

    function setdisplay() {
        $("#bx").css("display", "none");
        $("#shouye").css("display", "none");
        $("#kt").css("display", "none");
        $("#ds").css("display", "none");
        $("#bx2").css("display", "none");
        $("#xyj").css("display", "none");
        $("#cj").css("display", "none");
    }

    function setshow(i) {
        if (i == 0)
            $("#shouye").css("display", "block");
        if (i == 1)
            $("#bx").css("display", "block");
        if (i == 2)
            $("#kt").css("display", "block");
        if (i == 3)
            $("#ds").css("display", "block");
        if (i == 4)
            $("#bx2").css("display", "block");
        if (i == 5)
            $("#xyj").css("display", "block");
        if (i == 6)
            $("#cj").css("display", "block");
    }


    $(".tuijian .tab_nav li").hover(function () {
        var index = $(this).index();
        setdisplay();
        setshow(index);
        console.log(index);
    }, function () {

    });
    //登录下拉 列表
    var s = $("#user_name").text();

    var f = false;
    $(".ho").hover(function () {
            if (s != "请登录！") {
                $(".MyMessage").css("display", "block");

                $(".MyMessage").hover(function () {
                    $(".MyMessage").css("display", "block");

                    console.log("13");
                    f = true;
                }, function () {
                    $(".MyMessage").css("display", "none");

                    f = false;
                })


            }
        },
        function () {
            if (!f) {

                $(".MyMessage").css("display", "none");


            }
        });
    if (s != "请登录！") {
        $(".cover").css("display", "block");
    }

    $("a").on('click', function () {


        var idd = $(this).attr("myId");
        var hr = $(this).attr("href");
        if (hr != "" && hr != "#") {
            this.href = hr;
        } else {
            if (typeof (idd) == "undefined") {
                this.href = "/toShow?id=" + 7;
            } else
                this.href = "/toShow?id=" + idd;
        }
    })


    //搜索框提醒
    $("#find").bind("input propertychange", function () {
        var keyWord = $(this).val();
        if (keyWord != "") {
            $.ajax({
                url: "/getRemaind",
                method: "post",
                data: {
                    keyWord: keyWord
                },
                dataType: "json",
                success: function (data) {
                    $("#returnText ul").empty();
                    for (var i = 0; i < data.length; i++) {
                        var s = data[i].text;
                        $("#returnText ul").append(`  <li>` + s + `</li>`);
                    }

                    $("#returnText li").on("click", function () {

                        var s = $(this).text();
                        $("#find").val(s);
                    });


                    if ($("#returnText ul").children().length > 0)
                        $("#returnText").css("display", "block");
                    else
                        $("#returnText").css("display", "none");

                },
                error: function (data) {
                    alert("得到提示语句错误");
                }
            });
        } else {
            $("#returnText ul").empty();
            $("#returnText ul").css("padding", "0px");
            $("#returnText").css("display", "none");
        }

    });
    // 查询用户的收货地址
    // $.ajax({
    //     url: "/getAddress",
    //     method: "post",
    //     data: {},
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //
    //     },
    //     error: function (data) {
    //         alert("查询地址错误");
    //     }
    // });

    /* 这里 */
    var arrText = new Array;
    arrText[0] = "查看最新安全动态...";
    arrText[1] = "论坛新动态 新衣服大卖...";
    arrText[2] = "华为MATE40 你只拥有...";
    arrText[3] = "请遵守规则 别开挂...";
    $(".mylogo .tee a").text(arrText[0]);
    $(".mylogo .ne li").hover(function () {
        $(".mylogo .ne li").each(function () {
            $(this).removeClass("show-buttom");
        });
        $(this).addClass("show-buttom");
        var inex = $(this).index();
        $(".mylogo .tee a").text(arrText[index]);
    });

    /* 浮动导航的 */
    //设置标杆
    var _line = parseInt($(window).height() / 3);
    $(window).scroll(function () {
        //滚动730px，左侧导航固定定位
        if ($(window).scrollTop() > 401) {
            $('.fl_l').css({'position': 'fixed', 'top': 10})
        } else {
            $('.fl_l').css({'position': '', 'top': ''})
        }
        ;
        if ($(window).scrollTop() <= 400) {
            $('.fl_l li').removeClass('active');
            $('.fl_l li').eq(1).addClass('active');
        }
        $('.fl_l li').eq(1).addClass('active');
        //滚动到标杆位置,左侧导航加active
        console.log($(window).scrollTop());
        if ($(window).scrollTop() > 10) {
            $('.fl_l li').removeClass('active');
            $('.fl_l li').eq(2).addClass('active');
        }
        if ($(window).scrollTop() > 800) {
            $('.fl_l li').removeClass('active');
            $('.fl_l li').eq(3).addClass('active');
        }
        if ($(window).scrollTop() > 1200) {
            $('.fl_l li').removeClass('active');
            $('.fl_l li').eq(4).addClass('active');
        }
        if ($(window).scrollTop() > 1600) {
            $('.fl_l li').removeClass('active');
            $('.fl_l li').eq(5).addClass('active');
        }
    });
    $('.fl_l li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var _i = $(this).index();
        $('body, html').animate({scrollTop: $('.fl_r li').eq(_i).offset().top - _line}, 500);
    });
    /* ----- 侧边悬浮 ---- */
    $(document).on("mouseenter", ".suspension .a", function () {
        var _this = $(this);
        var s = $(".suspension");
        var isService = _this.hasClass("a-service");
        var isServicePhone = _this.hasClass("a-service-phone");
        var isQrcode = _this.hasClass("a-qrcode");
        if (isService) {
            s.find(".d-service").show().siblings(".d").hide();
        }
        if (isServicePhone) {
            s.find(".d-service-phone").show().siblings(".d").hide();
        }
        if (isQrcode) {
            s.find(".d-qrcode").show().siblings(".d").hide();
        }
    });
    $(document).on("mouseleave", ".suspension, .suspension .a-top", function () {
        $(".suspension").find(".d").hide();
    });
    $(document).on("mouseenter", ".suspension .a-top", function () {
        $(".suspension").find(".d").hide();
    });
    $(document).on("click", ".suspension .a-top", function () {
        $("html,body").animate({scrollTop: 0});
    });
    $(window).scroll(function () {
        var st = $(document).scrollTop();
        var $top = $(".suspension .a-top");
        if (st > 400) {
            $top.css({display: 'block'});
        } else {
            if ($top.is(":visible")) {
                $top.hide();
            }
        }
    });

    /* little 轮播 */
    var little_c = 0;
    var timerrr = setInterval(function () {
        $(".little-bo ul li").css("opacity", 0);
        $(".little-bo ul li").eq(little_c).css("opacity", 1);
        little_c = (little_c + 1) % 3;
        // console.log(little_c);
    }, 2000);

    $(".little-bo ul li img").hover(function () {
        clearInterval(timerrr);
    }, function () {
        timerrr = setInterval(function () {
            $(".little-bo ul li").eq((little_c - 1) % 3).css("opacity", 0);
            $(".little-bo ul li").eq(little_c).css("opacity", 1);
            little_c = (little_c + 1) % 3;

        }, 1000);
    });

    var little_c2 = 0;
    var timerrrr = setInterval(function () {
        $("#little-bo2 ul li img").css("opacity", 0);
        $("#little-bo2 ul li img").eq(little_c).css("opacity", 1);
        little_c = (little_c + 1) % 3;

    }, 2000);

    $("#little-bo2 ul li img").hover(function () {
        clearInterval(timerrrr);
    }, function () {
        timerrrr = setInterval(function () {
            $("#little-bo2 ul li img").css("opacity", 0);
            $("#little-bo2 ul li img").eq(little_c).css("opacity", 1);
            little_c = (little_c + 1) % 3;

        }, 2000);
    });

    /*网站提示*/

    /*红包*/
    function hb() {
        /* Define the number of leaves to be used in the animation */
        var NUMBER_OF_LEAVES = 80;

        /*
         Called when the "Falling Leaves" page is completely loaded.
         */
        function init() {
            /* Get a reference to the element that will contain the leaves */
            var container = document.getElementById('petalbox');

            /* Fill the empty container with new leaves */
            try {
                for (var i = 0;
                     i < NUMBER_OF_LEAVES;

                     i++) {
                    container.appendChild(createALeaf());
                }
            } catch (e) {
            }
        }

        /*
         Receives the lowest and highest values of a range and
         returns a random integer that falls within that range.
         */
        function randomInteger(low, high) {
            return low + Math.floor(Math.random() * (high - low));
        }

        /*
         Receives the lowest and highest values of a range and
         returns a random float that falls within that range.
         */
        function randomFloat(low, high) {
            return low + Math.random() * (high - low);
        }

        /*
         Receives a number and returns its CSS pixel value.
         */
        function pixelValue(value) {
            return value + 'px';
        }

        /*
         Returns a duration value for the falling animation.
         */
        function durationValue(value) {
            return value + 's';
        }

        /*
         Uses an img element to create each leaf. "Leaves.css" implements two spin
         animations for the leaves: clockwiseSpin and counterclockwiseSpinAndFlip. This
         function determines which of these spin animations should be applied to each leaf.

         */
        function createALeaf() {
            /* Start by creating a wrapper div, and an empty img element */
            var leafDiv = document.createElement('div');
            var image = document.createElement('img');

            /* Randomly choose a leaf image and assign it to the newly created element */
            image.src = 'img/hb/petal' + randomInteger(1, 10) + '.png';

            /* Position the leaf at a random location along the screen */
            leafDiv.style.top = pixelValue(randomInteger(-200, -100));
            leafDiv.style.left = pixelValue(randomInteger(0, 1920));

            /* Randomly choose a spin animation */
            var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';        /* Set the -webkit-animation-name property with these values */
            leafDiv.style.webkitAnimationName = 'fade, drop';
            leafDiv.style.animationName = 'fade, drop';
            image.style.webkitAnimationName = spinAnimationName;
            image.style.animationName = spinAnimationName;

            /* 随机下落时间 */
            var fadeAndDropDuration = durationValue(randomFloat(1.2, 8.2));

            /* 随机旋转时间 */
            var spinDuration = durationValue(randomFloat(3, 4));

            leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
            leafDiv.style.animationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

            // 随机delay时间
            var leafDelay = durationValue(randomFloat(0, 2));

            leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
            leafDiv.style.animationDelay = leafDelay + ', ' + leafDelay;
            image.style.webkitAnimationDuration = spinDuration;
            image.style.animationDuration = spinDuration;
            leafDiv.appendChild(image);
            return leafDiv;
        }

        init();
    }

    $.ajax({
        url: "/getSave",
        method: "post",
        dataType: "text",
        success: function (data) {
            if (data == "true") {
                var txt = `
						1.
						网站由于数据过少原因， 首页的商品只有<span style="color: red">手机</span>可以进行点击， 除了有特定功能的a标签以外， 
						其他的a标签点击会跳转到<span style="color: red">固定的商品</span>详情页面
						<br>
						2.
						网站实现的页面(功能)有：<span style="color: red">首页、登录、注册、商品详情页、
						 商品购买页、查看用户订单、确认收货、评价商品、购物车、商品物流、
						 个人信息修改， 收货地址管理、商品搜索页</span>
						 <br>
						 3.登录后将不再显示该提示框
						 <br>
						 4.支付宝付款账号和密码
						 <span style="color: blue">
						 <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账号&nbsp;&nbsp; tokgaq8273@sandbox.com <br>&nbsp;&nbsp;&nbsp;&nbsp; 密码 &nbsp;&nbsp;111111
                         </span>
                         <br>
                         5.后台管理系统网址 <a href="http://www.handsomehuang.cn:8080">www.handsomehuang.cn:8080</a>
					`;
                window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.info);
                hb();
            } else if (data == "once") {
                hb();
            }

        },
        error: function (data) {
            alert("判断是否登录失败");
        }
    });

})