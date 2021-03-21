$(function () {

    var userid = parseInt($("#getUserId").text());
    console.log(userid);

    if (userid >= 1) {
        $.ajax({
            url: "/getOraderList",
            method: "post",
            data: {
                id: userid
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                var sum = data.length;
                var s1 = 0;
                var s2 = 0;
                for (var i = 0; i < data.length; i++) {
                    var goodsStatus = data[i].goodsStatus;
                    if (goodsStatus == 1)
                        s1++;
                    else if (goodsStatus == 2)
                        s2++;
                }
                $("#state1").text(s1);
                $("#state2").text(s2);
                $("#allBuyed").text(sum);
            },
            error: function () {
                alert("getBuyedError")
            }
        });
    }
})