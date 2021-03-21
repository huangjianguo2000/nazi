$(function () {
    $.ajax({
        url: "/getinfo",
        method: "post",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var personName = data.personName;

            $("#inputEmail4").val(personName);
        },
        error: function () {
            alert("获得用户信息失败");
        }
    });
});