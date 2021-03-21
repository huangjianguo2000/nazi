function uploadImg() {
    var file = document.getElementById("upload").files[0];
    if (file == null || typeof (file) == "undefined" || file === "") {
        console.log("请选择图片");
    } else {
        var formData = new FormData();
        formData.append("uploadImg", file);
        $.ajax({
            url: "/uploadImg",
            data: formData,
            type: "POST",
            cache: false,
            contentType: false, //不设置内容类型
            processData: false, //不处理数据
            success: function (data) {

            }
        })
    }
}


$(function () {
    $(".changehead img").hover(function () {
        $(".upfile").css("display", "inline-block");
    }, function () {
        $(".upfile").hover(function () {
            $(".upfile").css("display", "inline-block");
        }, function () {

            $(".upfile").css("display", "none");
        });
        $(".upfile").css("display", "none");
    });

    $("#button-show01").on("click", function () {
        uploadImg();
        var name = $("#inputEmail4").val();
        if (name == "") alert("昵称不能为空")
        else {
            $.ajax({
                url: "/updataInformation",
                method: "post",
                data: {
                    name: name
                },
                dataType: "text",
                success: function (data) {

                },
                error: function () {
                    alert("修改信息失败");
                }
            });
        }

    });
});

