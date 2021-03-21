$(function () {
    if ($(".msg").text() != "") {
        $(".toast--yellow").fadeIn("slow");
    }
    $(".sbumit").on("click", function () {
        $(".toast--yellow").css("display", "none");
        if ($(".msg").text() != "") {
            $(".toast--yellow").fadeIn("slow");
        } else {
            $(".msg").text("");
            $(".toast--green").fadeIn("slow");
        }

    })

    $("#exampleInputEmail1").val("jake");
    $("#exampleInputPassword1").val("123456");

    $(".toast__close").on("click", function () {
        $(".add-margin").fadeOut("slow");
    })
    $(".toast--blue").fadeIn("slow");
});