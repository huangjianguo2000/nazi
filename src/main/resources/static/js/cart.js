$(function () {


    var id = parseInt($("#userid").text());
    console.log(id);
    $.ajax({
        url: "getCartsById",
        method: "post",
        data: {
            memberId: id,
        },
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var goodid = data[i].goodId;
                var goodnum = data[i].goodNums;

                $.ajax({
                    url: "searchById",
                    method: "post",
                    data: {
                        memberId: goodid,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        var phoneId = data.phoneId;
                        var us = data.imageUrl;
                        var brand = data.phoneBrand;
                        var phoneName = data.phoneName;
                        var phonePrice = data.phonePrice;
                        var phoneRam = data.phoneRam;
                        var phoneRom = data.phoneRom;
                        var ans = us.split("#");

                        var price = phonePrice.toFixed(2);
                        var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
                        $(".cart-main").append(`<div class="cart-item-list" style="background-color: #fff">
					<div class="cart-body">
						<div class="cart-list" >
							<ul class="goods-list yui3-g">
								<li class="yui3-u-1-24">
									<input class="choose-one" type="checkbox" name="chk_list" />
								</li>
								<li class="yui3-u-6-24">
									<div class="good-item">
										<div class="item-img"><img src="` + t + `" /></div>
										<div class="item-msg" style="font-size: 12px;">` + phoneName + `</div>
									</div>
								</li>
								<li class="yui3-u-5-24">
									<div class="item-txt" style="font-size: 12px;">` + phoneName + `</div>
								</li>
								<li class="yui3-u-1-8"><span class="price" >` + price + `</span></li>
								<li class="yui3-u-1-8" style="margin-left: 40px;">
									<a href="#" class="boder mins" style="width: 24px; text-decoration: none;">-</a><input type="text" value="1" class="itxt" style="height: 35.78px; width: 30px; "/><a href="#" class="boder plus"style="width: 25px; text-decoration: none;">+</a>
								</li>
								<li class="yui3-u-1-8" style="margin-left: 10px;"><span class="sum">` + price + `</span></li>
								<li class="yui3-u-1-88">
									<a class="delectOneGoddFromCarts" style="color:#f40">删除</a><br />
									<a href="#none" style="color:#f40">移到收藏</a>
									<span style="display: none"> ` + phoneId + `</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
`);

                    },
                    error: function (data) {
                        alert("getCartsWrongOfgood");
                    }
                });
            }

        },
        error: function (data) {
            alert("getCartsWrong");
        }
    });


    //渲染之后的价格改变操作

    setTimeout(function () {
        var sum = 0;
        var arr = document.getElementsByClassName("sum")
        var arr2 = document.getElementsByClassName("choose-one")

        $(".summoney").html("¥" + sum.toFixed(2));

        function updata() {
            var sum = 0;
            var cnt = 0;
            for (var i = 0; i < arr.length; i++) {
                var s = parseInt(arr[i].innerHTML);
                if (arr2[i].checked == true)
                    sum += s, cnt++;
            }
            $(".summoney").html("¥" + sum.toFixed(2));
            $(".money-box .chosed span").html(cnt);
        }

        $(".choose-one").on("click", function () {
            updata();
        });
        if ($(".chooseAll").on("click", function () {
            if ($(".chooseAll")[0].checked == true) {
                $(".yui3-u-1-24 input").prop("checked", true);
            } else {

                $(".yui3-u-1-24 input").prop("checked", false);
            }
            updata();
        })) ;

        //每个商品的数量

        $(".mins").on("click", function () {

            var cnt = parseInt($(this).next().val());
            console.log(cnt);
            cnt--;
            if (cnt <= 0)
                cnt = 1;
            $(this).next().val(cnt);
            var price = parseInt($(this).parent().prev().children("span").text());
            price = price * cnt;
            $(this).parent().next().children("span").html(price.toFixed(2));
            updata();
        })

        $(".plus").on("click", function () {
            var cnt = parseInt($(this).prev().val());
            cnt++;
            if (cnt <= 0)
                cnt = 1;
            $(this).prev().val(cnt);

            var price = parseInt($(this).parent().prev().children("span").text());
            price = price * cnt;
            $(this).parent().next().children("span").html(price.toFixed(2));
            updata();
        })

        //    删除
        $(".delectOneGoddFromCarts").on("click", function () {
            var phoneId = parseInt($(this).next().next().next().text());
            console.log(phoneId);
            //this.href="/delectOneGoddFromCarts?id="+phoneId;
            var d;
            $.ajax({
                url: "/delectOneGoddFromCarts",
                method: "post",
                data: {
                    memberId: phoneId
                },
                dataType: "text",
                success: function (data) {
                    d = data;
                },
                error: function (data) {
                    alert("wrongsdaddddd");
                }
            });

            $(this).parent().parent().parent().parent().empty();

        })

    }, 1000);


})