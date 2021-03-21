$(function () {

    var s = $("#user_name").text();
    //console.log(s);
    if (s != "请登录！") {
        s = s.substr(4, s.length - 4);
        //  console.log(s);
        $("#user_name").text(s);
    }
    $(".ho").hover(function () {
            if (s != "请登录！") {
                $(".MyMessage").css("display", "block");

                $(".MyMessage").hover(function () {
                    $(".MyMessage").css("display", "block");
                    $(".ho").css("background-color", "#fff");
                }, function () {
                    $(".MyMessage").css("display", "none");

                    $(".ho").css("background-color", "#f4f4f4");
                })
                $(".ho").css("background-color", "#fff");

            }
        },
        function () {
            $(".MyMessage").css("display", "none");

            $(".ho").css("background-color", "#f4f4f4");
        });

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
})