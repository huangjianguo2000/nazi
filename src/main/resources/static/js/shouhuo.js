$(function () {
    $("#sure").on("click", function () {
        var s = $("#getPa").val();
        $.ajax({
            url: "/checkSure",
            data: {
                password: s
            },
            dataType: "text",
            method: "post",
            success: function (data) {
                // console.log(data);
                if (data == "true") {
                    // console.log("true");
                    $("#sure").attr("href", "/submitSure");
                    $("#sure")[0].click();
                } else {
                    $(".tix").text("密码错误");
                    $(".tix").css("color", "red");
                }
            },
            error: function () {
                alert("请求密码错误");
            }
        })
    })

    var ord = $("#ord").text();

    $.ajax({
        url: "/getGoodSure",
        method: "post",
        data: {
            ord: ord,
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            var us = data.imageUrl;
            var brand = data.phoneBrand;
            var phoneName = data.phoneName;
            var phonePrice = data.phonePrice;
            var ans = us.split("#");

            phoneName = phoneName.slice(0, 40);
            var t = "http://www.handsomehuang.cn:8081/img/" + ans[3];
            $("#sureImg").attr("src", t);
            $("#sureDec").text(phoneName);
            $(".price").text(phonePrice);
            $("#allp").text(phonePrice);
            $("#relP").text(phonePrice);
            $(".brand").text(brand);
        },
        error: function (data) {
            alert("获得商品信息失败");
        }
    })

    $.ajax({
        url: "/getOrd",
        method: "post",
        data: {
            ord: ord,
        },
        dataType: "json",
        success: function (data) {
            //  console.log(data);
            var tradeNo = data.tradeNo;
            var gmtPayment = data.gmtPayment;
            var addressId = data.addressId;
            $(".jiaoyihao").text(tradeNo);
            $(".dingdanhao").text(ord);
            $(".time").text(gmtPayment);
            $.ajax({
                url: "/getAddress2",
                method: "post",
                data: {
                    addressId: addressId
                },
                dataType: "json",
                success: function (data) {
                    //   console.log(data);
                    var shoppingAddress = data.shoppingAddress;
                    var realName = data.realName;
                    var clearAddress = data.clearAddress;
                    var phoneNumber = data.phoneNumber;
                    var emailCode = data.emailCode;
                    ans = shoppingAddress + "-" + clearAddress;
                    $("#address").text(ans);
                    $("#name").text(realName);
                    $("#phone").text(phoneNumber);
                    $("#email").text(emailCode);
                },
                error: function (data) {
                    alert("收货地址失败");
                }
            })
        },
        error: function (data) {
            alert("获得订单信息失败");
        }
    })

})