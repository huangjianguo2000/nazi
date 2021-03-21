$(function () {
    setTimeout(function () {
        $(".person-address-allcontainer-skr").on("click", function () {
            // alert();
            $(".person-address-allcontainer-skr").removeClass("mor");
            $(this).addClass("mor");
            var address = $(this).children(".getaddressId").text();
            console.log(address);
            $("#addressId").val(address);
        });

    }, 2000)
    var good_id = parseInt($("#ineedthistogetid").text());

    /*获得当前商品的信息*/
    $.ajax({
        url: "searchById",
        method: "post",
        data: {
            memberId: good_id
        },
        dataType: "json",
        success: function (data) {
            //  console.log(data);
            var us = data.imageUrl;
            var brand = data.phoneBrand;
            var phoneName = data.phoneName;
            var phonePrice = data.phonePrice;
            var phoneRam = data.phoneRam;
            var phoneRom = data.phoneRom;
            var phoneId = data.phoneId;
            var ans = us.split("#");
            /* console.log(data);*/
            var num = parseInt($(".itxt").val());
            /*console.log(phoneId);*/
            $("#good_idddd").val(phoneId);
            $("#subject").val(phoneName);
            $("#price").val(phonePrice);
            $(".fbup-s").text(phonePrice);
            $("#price1").text("¥" + phonePrice);
            $("#price2").text(phonePrice);
            $("#quantity").val(1);

            var t = "http://www.handsomehuang.cn:8081/img/" + ans[0];
            $(".dsd-dian-img img").attr("src", t);
            $(".dsd-dian-text .text1").text(phoneName);

        },
        error: function (data) {
            alert("wrong");
        }
    });


    $(".tjdd-right-b").removeAttr("href");
    $(".tjdd-right-b").on("click", function () {
        $("#goToBuy20").submit();
    });

    $.ajax({
        url: "/getAddress",
        method: "post",
        dataType: "json",
        success: function (data) {
            //  console.log(data);
            for (var i = 0; i < data.length; i++) {
                var clearAddress = data[i].clearAddress;
                var emailCode = data[i].emailCode;
                var phoneNumber = data[i].phoneNumber;
                var realName = data[i].realName;
                var userId = data[i].userId;
                var addressId = data[i].addressId;
                var state = data[i].state;
                var shoppingAddress = data[i].shoppingAddress;
                if (state == "mor") {
                    $("#addressId").val(addressId);
                }
                $(".person-address-allcontainer-s").append(
                    `<div class="person-address-allcontainer-skr ` + state + `">
                                        <span class="getaddressId" style="display: none">` + addressId + `</span>
										<div style="padding: 12px;">
											<div class="addr-header">
												<span>` + shoppingAddress + `</span>
												&nbsp;
												<span>(` + realName + `收)</span> 
											</div>
											<div class="addr-content">
												
												<span>` + clearAddress + `</span>
												<span>` + phoneNumber + `</span> 
											</div>
											<a href="/toaddress" class="addr-footb">修改</a>
										</div>
									</div>`
                );
            }
        },
        error: function (data) {
            alert("获得收货地址信息失败");
        }
    });
});