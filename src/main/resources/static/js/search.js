$(function () {
    var word = $("#getTheWords").text();
    if (word != "")
        $.ajax({
            url: "/searchPhone",
            method: "post",
            data: {
                name: word
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var phoneId = data[i].phoneId;
                    var us = data[i].imageUrl;
                    var brand = data[i].phoneBrand;
                    var phoneName = data[i].phoneName;
                    var phonePrice = data[i].phonePrice;
                    var phoneRam = data[i].phoneRam;
                    var phoneRom = data[i].phoneRom;
                    var ans = us.split("#");
                    var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
                    $("#theAnswerOfSearch").append(`<li class="yui3-u-1-5" style="margin-right: 0px;">
							<div class="list-wrap">
							    
								<div class="p-img">
									<img src="` + t + `" />
								</div>
								<div class="price">
									<strong>
										<em>¥</em>
										<i>` + phonePrice + `</i>
									</strong>
								</div>
								<div class="attr">
									<a target="_blank" href=""
										title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
										style="font-size: 13px;" myId="` + phoneId + `" class="getPhoneId">` + phoneName + `</a>
								</div>
								<div class="commit">
									<i class="command">已有<span>2000</span>人评价</i>
								</div>
								<div class="operate" style="margin: 5px 10px;">
									<a target="_blank"
									class="addtoCart" style="text-decoration: none;" myId="` + phoneId + `" >加入购物车</a>
									<a href=""  class="addTolove" style="text-decoration: none;">收藏</a>
								</div>
							</div>
						</li>`);

                }

            },
            error: function (data) {
                alert("拿数据失败， 服务器太卡了");
            }
        });

    setTimeout(function () {
        $(".getPhoneId").on('click', function () {
            var idd = $(this).attr("myId");

            this.href = "/toShow?id=" + idd;
        });
        $(".addtoCart").on("click", function () {
            var id = $(this).attr("myId");
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
                    alert("卡了卡了");
                }
            });
        });
    }, 2000)

})