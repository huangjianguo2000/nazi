$(function () {
    var goodId = parseInt($("#goodId").text());
    var s = "/submitEvaluate?goodId=" + goodId;
    $("#From").attr("action", s);
    $("#submit").removeAttr("href");
    $("#submit").on("click", function () {
        var s = $(".textinput-textarea").val();
        // console.log(s);
        if (s != "") {
            $("#From").submit();
        }
    });

    $.ajax({
        url: "searchById",
        method: "post",
        data: {
            memberId: goodId
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            var us = data.imageUrl;
            var brand = data.phoneBrand;
            var phoneName = data.phoneName;
            var phonePrice = data.phonePrice;
            var phoneRam = data.phoneRam;
            var phoneRom = data.phoneRom;
            var phoneId = data.phoneId;
            var ans = us.split("#");
            var num = parseInt($(".itxt").val());
            var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
            phoneName = phoneName.slice(0, 30);
            $("#gooddec").text(phoneName);
            $("#maijia").text(brand);
            $("#img").attr("src", t);
        },
        error: function (data) {
            alert("wrong");
        }
    });

    var dec = new Array();
    var dec2 = new Array();
    dec[0] = "亲，好评无法修改和删除，请验货后再对商品和购物感受做出评论";
    dec[1] = "亲，很抱歉没能给您带来良好的购物体验，如有不满，您可联系卖家协商或发起售后维权。";
    dec[2] = "亲，很抱歉没能给您带来良好的购物体验，如有不满，您可联系卖家协商或发起售后维权。";
    dec2[0] = "亲，请评论该商品的内容及质量";
    dec2[1] = "咳咳，你给卖家打了中评哦，需要说明原因哦。";
    dec2[2] = "咳咳，你给了差评哦，亲可以先联系卖家沟通一下售后哦~";
    $(":radio").click(function () {
        var index = $(this).val();
        index = parseInt(index);
        // console.log(index);
        $(".rate-good-score").css("display", "none");
        $(".rate-normal-score").css("display", "none");
        $(".rate-bad-score").css("display", "none");
        $(this).parent().parent().children("span").css("display", "inline-block");
        $("#decripition").html(dec[index]);
        $(".textinput-textarea").attr("placeholder", dec2[index]);
    });

    /*评分那一栏*/
    var p1 = new Array();
    var p2 = new Array();
    var p3 = new Array();
    p1[0] = "- 差得太离谱，与卖家描述的严重不符，非常不满";
    p1[1] = " - 部分有破损，与卖家描述的不符，不满意";
    p1[2] = " - 质量一般，没有卖家描述的那么好";
    p1[3] = " - 质量不错，与卖家描述的基本一致，还是挺满意的";
    p1[4] = " - 质量非常好，与卖家描述的完全一致，非常满意";
    p2[0] = "- 卖家态度很差，还骂人、说脏话，简直不把顾客当回事";
    p2[1] = " - 卖家有点不耐烦，承诺的服务也兑现不了";
    p2[2] = " - 卖家回复问题很慢，态度一般，谈不上沟通顺畅";
    p2[3] = " - 卖家服务挺好的，沟通挺顺畅的，总体满意";
    p2[4] = " - 卖家的服务太棒了，考虑非常周到，完全超出期望值";
    p3[0] = "- 到货速度严重延误，货物破损，派件员态度恶劣";
    p3[1] = " - 到货速度慢，外包装严重变形，派件员不耐烦，态度差";
    p3[2] = " - 到货速度一般，外包装变形，派件员态度一般";
    p3[3] = " - 到货速度及时，派件员态度较好";
    p3[4] = "- 到货速度非常快，商品完好无损，派件员态度很好";
    var goods = "./img/pingjia/goodstar.png";
    var bads = "./img/pingjia/badstar.png";
    var blanks = "./img/pingjia/blankstar.png";
    $(".stars-simple img").on("click", function () {
        // alert();
        var index = $(this).index();
        //console.log(index);
        var fen = index + 1;
        $(".stars-tips strong").text(fen + "分");
        $(".stars-tips span").text(p1[index]);
        if (index <= 1) {
            for (var i = 0; i <= index; i++) {
                $(".stars-simple img").eq(i).attr("src", bads);
            }
            for (var i = index + 1; i <= 4; i++) {
                $(".stars-simple img").eq(i).attr("src", blanks);
            }
        } else {
            for (var i = 0; i <= index; i++) {
                $(".stars-simple img").eq(i).attr("src", goods);
            }
            for (var i = index + 1; i <= 4; i++) {
                $(".stars-simple img").eq(i).attr("src", blanks);
            }
        }
    })
    $(".stars-simple2 img").on("click", function () {
        // alert();
        var index = $(this).index();
        //console.log(index);
        var fen = index + 1;
        $(".stars-tips2 strong").text(fen + "分");
        $(".stars-tips2 span").text(p1[index]);
        if (index <= 1) {
            for (var i = 0; i <= index; i++) {
                $(".stars-simple2 img").eq(i).attr("src", bads);
            }
            for (var i = index + 1; i <= 4; i++) {
                $(".stars-simple2 img").eq(i).attr("src", blanks);
            }
        } else {
            for (var i = 0; i <= index; i++) {
                $(".stars-simple2 img").eq(i).attr("src", goods);
            }
            for (var i = index + 1; i <= 4; i++) {
                $(".stars-simple2 img").eq(i).attr("src", blanks);
            }
        }
    })
    $(".stars-simple3 img").on("click", function () {
        // alert();
        var index = $(this).index();
        //console.log(index);
        var fen = index + 1;
        $(".stars-tips3 strong").text(fen + "分");
        $(".stars-tips3 span").text(p1[index]);
        if (index <= 1) {
            for (var i = 0; i <= index; i++) {
                $(".stars-simple3 img").eq(i).attr("src", bads);
            }
            for (var i = index + 1; i <= 4; i++) {
                $(".stars-simple3 img").eq(i).attr("src", blanks);
            }
        } else {
            for (var i = 0; i <= index; i++) {
                $(".stars-simple3 img").eq(i).attr("src", goods);
            }
            for (var i = index + 1; i <= 4; i++) {
                $(".stars-simple3 img").eq(i).attr("src", blanks);
            }
        }
    })
});
