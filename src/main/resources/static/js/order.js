$(function () {

    var id = parseInt($("#userid").text());
    $.ajax({
        url: "/getOraderList",
        method: "post",
        data: {
            id: id
        },
        dataType: "json",
        success: function (data) {
            // console.log(data);

            for (var i = data.length - 1; i >= 0; i--) {
                var good_id = data[i].goodsId; //商品的id
                var riqi = data[i].gmtPayment; //购买商品的日期
                var state = data[i].goodsStatus; //商品的状态
                var orderNum = data[i].outTradeNo; //订单号
                var gmtPayment = data[i].gmtPayment;
                gmtPayment = gmtPayment.slice(0, 10);
                // console.log(gmtPayment);
                getList(good_id, orderNum, state, gmtPayment);
            }
        },
        error: function (data) {
            alert("获得订单数据失败");
        }
    });


//    获得商品的信息 封装为函数
    function getList(good_id, orderNum, state, gmtPayment) {
        console.log(gmtPayment);
        var ur = new Array();
        var name = new Array();
        ur[1] = "/sure?ord=" + orderNum;
        ur[2] = "/toPingJia?ord=" + orderNum;
        ur[3] = "#";
        name[1] = "确认收货";
        name[2] = "去评价";
        name[3] = "去追评"
        // console.log(good_id);
        $.ajax({
            url: "searchById",
            method: "post",
            data: {
                memberId: good_id
            },
            dataType: "json",
            success: function (data) {
                //   console.log((data));
                var us = data.imageUrl;  //商品图片链接
                var brand = data.phoneBrand; //商品品牌
                var phoneName = data.phoneName; //商品名字
                var phonePrice = data.phonePrice; //商品价格
                var phoneRam = data.phoneRam; //内存
                var phoneRom = data.phoneRom; //内存
                var phoneId = data.phoneId; //商品id
                var ans = us.split("#");
                var t = "http://www.handsomehuang.cn:8081/img/" + ans[0]; //第一张图片的链接
                // console.log(state);
                if (state != 3)
                    $(".Right-body").append(`<div class="right-body-shouhuo">
						<div class="right-body-choosetitle">
							<table>
								<tbody>
									<tr>
										<td style="width: 367px;margin-right: 0px;">
											<label style="margin-left: 15px;margin-top: 8px;">
												<input type="checkbox" style="margin-right: 4px;"><span
													class="right-body-choosetitle-checkbox-time">` + gmtPayment + `</span>
											</label>
											<span class="right-body-choosetitle-checkbox-number">订单号:
												` + orderNum + `</span>
										</td>
										<td>
											<span class="right-body-choosetitle-sale">
												<a href="">` + brand + `</a>
											</span>
										</td>
										<td>
											<span class="right-body-choosetitle-connect">
												<a href="">和我联系</a>
											</span>
										</td>
										<td>
											<div class="right-body-choosetitle-trash">
												<a href=""><span class="glyphicon glyphicon-trash"></span></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<table class="r-body-sh">
							<tr>
								<td width="35%">
									<div class="sh-b">
										<div class="sh-b-img">
											<a href="">
												<img src="` + t + `" style="height: 80px; width: 80px;">
											</a>
										</div>
										<div class="sh-b-text">
											<a href="/toShow?id=` + phoneId + `">
												<p>
													` + phoneName + `
												</p>
											</a>
										</div>
									</div>
								</td>
								<td width="5%" class="">
									<ul class="r-money">
										<li class="older-price"><span>￥</span>28.45</li>
										<li><span>￥</span>` + phonePrice + `</li>
									</ul>
								</td>
								<td width="5%" class="">1</td>
								<td width="8%" class="">
									<ul class="r-caozuo">
										<li><a href="">退款/退货</a></li>
										<li><a href="">投诉卖家</a></li>
										<li><a href="">退运保险</a></li>
									</ul>
								</td>
								<td width="10%" class="">
									<ul class="r-money">
										<li><span>￥</span>` + phonePrice + `</li>
										<li><span>(含运费:￥</span>0<span>)</span></li>
										<li><a href=""><img src="/img/sjdd.png" alt=""></a></li>
									</ul>
								</td>
								<td width="10%" class="">
									<ul class="r-jyzt">
										<li>物流派件中</li>
										<li><a href="">订单详情</a></li>
										<li><a href = "/towuliu">查看物流</a></li>
									</ul>
								</td>
								<td width="10%" class="" style="display:">
									<div class="glyphicon glyphicon-time"><span class="r-shyshj">还剩7天16时</span></div>
									<div class="Iwanttosetthehover"><button type="submit" class="r-center-an"><a href="` + ur[state] + `" style="color: #f40; text-decoration: none">` + name[state] + `</a></button></div>
								</td>
							</tr>
						</table>
					</div>`);
                else
                    $(".Right-body").append(
                        `
<div class="right-body-fahuo">
						<div class="right-body-choosetitle01">
							<table>
								<tbody>
									<tr>
										<td style="width: 367px;margin-right: 0px;">
											<label style="margin-left: 15px;margin-top: 8px;">
												<input type="checkbox" style="margin-right: 4px;"><span
													class="right-body-choosetitle-checkbox-time">` + gmtPayment + `</span>
											</label>
											<span class="right-body-choosetitle-checkbox-number">订单号:
												` + orderNum + `</span>
										</td>
										<td>
											<span class="right-body-choosetitle-sale">
												<a href="">` + brand + `</a>
											</span>
										</td>
										<td>
											<span class="right-body-choosetitle-connect">
												<a href="">和我联系</a>
											</span>
										</td>
										<td>
											<div class="right-body-choosetitle-trash">
												<a href=""><span class="glyphicon glyphicon-trash"></span></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<table class="r-body-sh">
							<tr>
								<td width="35%">
									<div class="sh-b">
										<div class="sh-b-img">
											<a href="">
												<img src=" ` + t + `" style="height: 80px; width: 80px;">
											</a>
										</div>
										<div class="sh-b-text">
											<a href="/toShow?id=` + phoneId + `">
												<p>
													` + phoneName + `
												</p>
											</a>
										</div>
									</div>
								</td>
								<td width="5%" class="">
									<ul class="r-money">
										<li class="older-price"><span>￥</span>70.00</li>
										<li><span>￥</span>` + phonePrice + `</li>
									</ul>
								</td>
								<td width="5%" class="">1</td>
								<td width="8%" class="">
									<ul class="r-caozuo">
										<li><a href="">退款/退货</a></li>
										<li><a href="">投诉商家</a></li>
									</ul>
								</td>
								<td width="10%" class="">
									<ul class="r-money">
										<li><span>￥</span>` + phonePrice + `</li>
										<li><span>(含运费:￥</span>0.00<span>)</span></li>
										<li><a href=""><img src="./img/sjdd.png" alt=""></a></li>
									</ul>
								</td>
								<td width="10%" class="">
									<ul class="r-jyzt">
										<li>买家已付款</li>
										<li><a href="">订单详情</a></li>
										<li><a href="">查看账单</a></li>
									</ul>
								</td>
								<td width="10%" class="">
									<ul class="r-jyzt">
										<li><a href="">申请开票</a></li>
									</ul>
								</td>
							</tr>
						</table>
					</div>

`);
            },
            error: function (data) {
                alert("商品的数据");
            }
        });
    }

    setTimeout(function () {
        $(".Iwanttosetthehover button").hover(function () {
                $(this).children("a").css("color", "#fff");
            },
            function () {
                $(this).children("a").css("color", "#f40");
            });
    }, 2000)

})