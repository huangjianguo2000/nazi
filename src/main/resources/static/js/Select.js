$(function () {

    /*自动以滚动条*/



    var arr1 = document.getElementsByClassName("choose1");
    var arr2 = document.getElementsByClassName("choose22");
    var arr3 = document.getElementsByClassName("choose3");
    var arr4 = document.getElementsByClassName("choose4");

    var the_good_id;
    var check = function (s1, s2) {
        for (var i = 0; i < s1.length; i++) {
            if (s1[i] == s2[0]) {
                var f = true;
                for (var j = 0; j < 6; j++) {
                    if (s1[i + j] != s2[j])
                        f = false;
                }
                if (f)
                    return true;
            }
        }
        return false;
    }
    var clear = function () {
        for (var i = 0; i < 3; i++) {
            var s = arr1[i].className;
            if (!check(s, "locked"))
                arr1[i].className = "choose1";
        }
    }
    var clear2 = function () {
        for (var i = 0; i < 3; i++) {
            var s = arr2[i].className;
            if (!check(s, "locked"))
                arr2[i].className = "choose22";
        }
    }
    var clear3 = function () {
        for (var i = 0; i < 2; i++) {
            var s = arr3[i].className;
            if (!check(s, "locked"))
                arr3[i].className = "choose3";
        }
    }
    var clear4 = function () {
        for (var i = 0; i < 3; i++) {
            arr4[i].className = "choose4";
        }
    }

    $(".choose1").on('click', function () {
        clear();
        $(this).addClass("selected");
    });
    $(".choose22").on('click', function () {
        clear2();
        $(this).addClass("selected");
    });
    $(".choose3").on('click', function () {
        clear3();
        $(this).addClass("selected");
    });
    $(".choose4").on('click', function () {
        clear4();
        $(this).addClass("selected");
    });


    var id = parseInt($("#ineedthistogetid").text());

    $.ajax({
        url: "searchById",
        method: "post",
        data: {
            memberId: id
        },
        dataType: "json",
        success: function (data) {
            var us = data.imageUrl;
            var brand = data.phoneBrand;
            var phoneName = data.phoneName;
            var phonePrice = data.phonePrice;
            var phoneRam = data.phoneRam;
            var phoneRom = data.phoneRom;
            var phoneId = data.phoneId;
            var ans = us.split("#");
            console.log(data);
            var num = parseInt($(".itxt").val());
            console.log(phoneId);
            $("#good_idddd").val(phoneId);
            $("#subject").val(phoneName);
            $("#price").val(phonePrice);
            $("#quantity").val(num);

            var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
            $("#the-parts1").children("div").children("img").attr("src", t);
            $("#the-parts1").children("em").html("￥" + phonePrice);
            $(".jqzoom").children("img").attr("src", t);
            $("#IWantTo li").each(function (index) {
                var t = "http://www.handsomehuang.cn:8081/img/" + ans[index];
                $(this).children("img").attr("src", t);
                $(this).children("img").attr("bimg", t);
            })
            t = "http://www.handsomehuang.cn:8081/img/" + ans[10];
            $(".intro-detail").children(".im1").attr("src", t);
            t = "http://www.handsomehuang.cn:8081/img/" + ans[11];
            $(".intro-detail").children(".im2").attr("src", t);
            t = "http://www.handsomehuang.cn:8081/img/" + ans[12];
            $(".intro-detail").children(".im3").attr("src", t);
            $(".itemInfo-wrap .sku-name h4").html(phoneName);
            $(".summary .price em").html(phonePrice.toFixed(2));
        },
        error: function (data) {
            alert("wrong");
        }
    });

    $.ajax({
        url: "searchByNotId",
        method: "post",
        data: {
            memberId: id
        },
        dataType: "json",
        success: function (data) {
            //console.log(data);
            // console.log(data);
            var ta = data;
            var j = 0;
            var len = data.length;
            for (var i = 0; i < ta.length; i++) {
                var x = Math.random();
                x *= 10;
                x = Math.floor(x);
                if (x >= 5) {
                    data[j++] = ta[i];
                } else {
                    data[--len] = ta[i];
                }
            }


            var cnt = 0;
            $(".box-bu ul li").each(function (index) {
                // console.log(data[index]);
                // console.log(index);
                var phoneId = data[index].phoneId;
                var us = data[index].imageUrl;
                var brand = data[index].phoneBrand;
                var phoneName = data[index].phoneName;
                var phonePrice = data[index].phonePrice;
                var phoneRam = data[index].phoneRam;
                var phoneRom = data[index].phoneRom;
                var ans = us.split("#");
                var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
                $(this).children(".img").children("a").children("img").attr("src", t);
                $(this).children(".decri").children(".de").children("a").html(phoneName);
                $(this).children(".decri").children(".price").children("h").text(phonePrice);
                var ur = "/toShow?id=" + phoneId;
                $(this).children(".img").children("a").attr("href", ur);
                $(this).children(".decri").children(".de").children("a").attr("href", ur);
                cnt = index;
            })
            //下面的那一排手机
            $(".box-bu2 ul li").each(function (index) {
                var phoneId = data[index].phoneId;
                var us = data[cnt].imageUrl;
                var brand = data[cnt].phoneBrand;
                var phoneName = data[cnt].phoneName;
                var phonePrice = data[cnt].phonePrice;
                var phoneRam = data[cnt].phoneRam;
                var phoneRom = data[cnt].phoneRom;
                var ans = us.split("#");
                var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
                $(this).children(".img").children("a").children("img").attr("src", t);
                $(this).children(".decri").children(".de").children("a").html(phoneName);
                $(this).children(".decri").children(".price").children("h").text(phonePrice);
                var ur = "/toShow?id=" + phoneId;
                $(this).children(".img").children("a").attr("href", ur);
                $(this).children(".decri").children(".de").children("a").attr("href", ur);
                cnt++;
                if (cnt >= data.length)
                    cnt = 0;
            })
            //console.log(data)

        },
        error: function (data) {
            alert("wrongdasd");
        }
    });
    $.ajax({
        url: "searchParts",
        method: "post",
        data: {
            memberId: id
        },
        dataType: "json",
        success: function (data) {

            //console.log(data);
            $("#the-parts2 li").each(function (index) {
                var i = index;
                var id = data[i].id;
                var name = data[i].name;
                var description = data[i].description;
                var price = data[i].price;
                var url = data[i].url;
                var t = "http://www.handsomehuang.cn:8081/img/" + url;
                $(this).children("div").children("img").attr("src", t);
                $(this).children("i").html(description);
                $(this).children("p").html("¥" + price);

            })

        },
        error: function (data) {
            alert("wrong");
        }
    });

    //商品页面跳转
    //加入购物车

    $(".addToCarts").on("click", function () {
        $.ajax({
            url: "addCarts",
            method: "post",
            data: {
                memberId: id,
            },
            dataType: "text",
            success: function (data) {
                if (data == "true") {
                    $(".toast--green").fadeIn("slow");
                    setTimeout(function () {
                        $(".toast--green").fadeOut("slow");
                    }, 2000)
                } else {
                    $(".toast--yellow").fadeIn("slow");
                    setTimeout(function () {
                        $(".toast--yellow").fadeOut("slow");
                    }, 2000)
                }

            },
            error: function (data) {
                alert("w");
            }
        });
    });


    //选着
    $(".checkbox-pretty").on("click", function () {

    })

    /*放大镜效果*/
//购买数量
    var num = 1;
    $(".control-group .controls .plus").on("click", function () {
        num++;
        $(".control-group .controls input").val(num);
        $("#quantity").val(num);
    })
    $(".control-group .controls .mins").on("click", function () {
        num--;
        if (num <= 0)
            num = 1;
        $(".control-group .controls input").val(num);
        $("#quantity").val(num);
    })

//=====================全局函数========================
//Tab控制函数
    function tabs(tabId, tabNum) {
        //设置点击后的切换样式
        $(tabId + " .tab li").removeClass("curr");
        $(tabId + " .tab li").eq(tabNum).addClass("curr");
        //根据参数决定显示内容
        $(tabId + " .tabcon").hide();
        $(tabId + " .tabcon").eq(tabNum).show();
    }

//=====================全局函数========================

//==================图片详细页函数=====================
//鼠标经过预览图片函数

    console.log("sa");
    $("#IWantTo li").hover(function () {
        $("#preview .jqzoom img").attr("src", $(this).children("img").attr("src"));

    }, function () {

    })

    function preview(img) {
        console.log($(img).attr("src"));
        $("#preview .jqzoom img").attr("src", $(img).attr("src"));
        $("#preview .jqzoom img").attr("jqimg", $(img).attr("bimg"));
    }


//图片预览小图移动效果,页面加载时触发
    $(function () {
        var tempLength = 0; //临时变量,当前移动的长度
        var viewNum = 5; //设置每次显示图片的个数量
        var moveNum = 2; //每次移动的数量
        var moveTime = 300; //移动速度,毫秒
        var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
        var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
        var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
        var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度

        //下一张
        $(".spec-scroll .next").bind("click", function () {
            if (tempLength < countLength) {
                if ((countLength - tempLength) > moveLength) {
                    scrollDiv.animate({left: "-=" + moveLength + "px"}, moveTime);
                    tempLength += moveLength;
                } else {
                    scrollDiv.animate({left: "-=" + (countLength - tempLength) + "px"}, moveTime);
                    tempLength += (countLength - tempLength);
                }
            }
        });
        //上一张
        $(".spec-scroll .prev").bind("click", function () {
            if (tempLength > 0) {
                if (tempLength > moveLength) {
                    scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
                    tempLength -= moveLength;
                } else {
                    scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
                    tempLength = 0;
                }
            }
        });
    });
//页面跳转
    $(".operate .myIdd").on('click', function () {

        var idd = $(this).parent().parent().parent().children(".setId").text();
        console.log(idd);
        // export const id = idd;
        var id = parseInt(idd);
        this.href = "/toShow?id=" + id;
    })
    setTimeout(function () {
        $(".addToCartss").on("click", function () {
            var id = $(this).parent().parent().parent().children(".setId").html();
            id = parseInt(id);
            $.ajax({
                url: "addCarts",
                method: "post",
                data: {
                    memberId: id,
                },
                dataType: "text",
                success: function (data) {
                    if (data == "true")
                        alert("添加成功");
                    else alert("添加失败， 该商品已经在购物车中了");

                },
                error: function (data) {
                    alert("w");
                }
            });
        });
    }, 1000)

    $("#buyNow").on("click", function () {
        this.href = "/goTheBuyPage?good_id=" + id;
    })


    //评论代码
    $.ajax({
        url: "/getEvaluate",
        data: {
            goodId: id
        },
        method: "post",
        dataType: "json",
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var text = data[i].text;
                var userName = data[i].userName;
                $("#addEvaluate").append(`
<tr>
                                <td class="liuyan">
                                    <div class="box01">
                                        <div class="de">` + text + `</div>
                                        <div class="time">11.09</div>
                                        <div class="jieshi">商家回复：浮世三千，吾爱有三，日月与卿。日为朝，月为暮，卿为朝朝暮暮</div>
                                    </div>
                                </td>
                                <td>
                                    <div class="sku">
                                        <p>
                                            <span>网络类型:</span>
                                            SA/NSA双模(5G)
                                        </p>
                                        <p>
                                            <span>机身颜色:</span>
                                            P40Pro【亮黑色】
                                        </p>
                                        <p>
                                            <span>套餐类型:</span>
                                            官方标配
                                        </p>
                                        <p>
                                            <span>存储容量:</span>
                                            8+128GB
                                        </p>

                                    </div>
                                </td>
                                <td>
                                    <div class="name">
                                        ` + userName + `
                                    </div>
                                </td>
                            </tr>
`);
            }
        },
        error: function (data) {
            alert("请求评论失败");
        }
    });
});

$(function () {

    function setNo() {
        for (var i = 1; i <= 4; i++) {
            var s = ".big-box" + i;
            $(s).css("display", "none");
        }
    }

    $(".right-box .head ul li").on("click", function () {
        var index = $(this).index();

        setNo();
        index++;
        $(".right-box .head ul li").removeClass("active");
        $(this).addClass("active");
        var s = ".big-box" + index;
        $(s).css("display", "block");
    });

    $(".box4 .head2 .he li").hover(function () {
        var index2 = $(this).index();
        $(".box4 .head2 .he li").removeClass("f1");
        $(this).addClass("f1");
        $(".head2 .box-bu").css("display", "none");
        $(".head2 .box-bu2").css("display", "none");
        if (index2 == 0)
            $(".head2 .box-bu").css("display", "block");
        else
            $(".head2 .box-bu2").css("display", "block");
    });
});