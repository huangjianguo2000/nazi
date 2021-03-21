var f1 = false;
var f2 = false;
var f3 = false;

$(function () {

    $("#inputEmail3").bind("input change", function () {
        var keyWord = $(this).val();
        $("#inputEmail3").focus(function () {
            $("#inputEmail3").removeClass("error");
        });
        setTimeout(function () {
            if (keyWord != "") {
                $.ajax({
                    url: "/getRemindUser",
                    method: "post",
                    data: {
                        keyWord: keyWord
                    },
                    dataType: "text",
                    success: function (data) {
                        // console.log(data);
                        if (data == "false") {
                            $("#inputEmail3").addClass("error");
                            $("#check-once").html("用户已经存在");

                            f1 = false;
                        } else {
                            f1 = true;
                            $("#check-once").html("");
                        }

                    },
                    error: function (data) {
                        alert("得到用戶名提示语句错误");
                    }
                });
            }
        }, 1000)

    });

//    判断两次密码是不是一样
    var pa1;
    var pa2;
    $("#inputPassword2").bind("input change", function () {
        pa1 = $("#inputPassword2").val();
    });

    $("#inputPassword6").focus(function () {
        $("#inputPassword6").removeClass("error");
        $("#paissame").css("display", "none");
    });
    $("#inputPassword6").on("change", function () {
        pa2 = $("#inputPassword6").val();
        if (pa1 != pa2) {
            console.log("falsel");
            $("#inputPassword6").addClass("error");
            $("#paissame").css("display", "inline-block");
            f2 = false;
        } else {
            $("#inputPassword6").removeClass("error");
            $("#paissame").css("display", "none");
            f2 = true;
        }
    });
});
var numcode;
$(function () {
    var show_num = [];
    draw(show_num);
    $("#canvas").on("click", function () {
        draw(show_num);
    });
    $("#yzcode").focus(function () {
        $("#yzcode").removeClass("error");
        $("#themsgerror").text("");
    });
    if ($(".btn").text() == "获得验证码") {
        $(".btn").on("click", function () {
            console.log("执行发短信");
            var val = $("#yzcode").val().toLowerCase();
            var num = show_num.join("");
            if (val == "") {
                draw(show_num);
                $("#yzcode").addClass("error");

                $("#themsgerror").text("内容为空");

            } else if (val == num) {
                //图片验证成功 使用短信验证
                $("#yzcode").removeClass("error");

                $("#themsgerror").text("");
                numcode = Math.random();
                numcode *= 1000000;
                numcode = parseInt(numcode);
                numcode = numcode + "";
                var PhoneNumber = $("#getNumber").val();
                // console.log(numcode);
                // console.log(PhoneNumber);

                if (PhoneNumber.length == 11) {
                    var cnt = 60;
                    var timer = setInterval(function () {
                        $(".setIntervalBtn").text(cnt + "S");
                        cnt--;
                        if (cnt <= 0) {
                            console.log(cnt);
                            clearInterval(timer);
                            $(".setIntervalBtn").text("获得验证码");
                        }
                    }, 1000)
                    $.ajax({
                        url: "/getRisterCode",
                        method: "post",
                        data: {
                            phoneNum: PhoneNumber,
                            code: numcode
                        },
                        dataType: "text",
                        success: function (data) {
                        },
                        error: function (data) {
                            alert("发送验证码失败");
                        }
                    });

                } else {
                    $("#themsgerror").text("手机号码格式错误");
                }

                // draw(show_num);
            } else {
                draw(show_num);
                $("#themsgerror").text("验证码错误");
                $(".input-val").val("");
                $("#yzcode").addClass("error");
                // draw(show_num);
            }
        });
    }


    $("#inputPassword1").on("change", function () {
        var checknum = parseInt($("#inputPassword1").val());
        // console.log(checknum);
        // console.log(numcode);
        if (checknum == numcode) {
            f3 = true;
        } else {
            f3 = false;
        }
    });
    $("#inputPassword1").focus(function () {
        $("#phonecodeerror").css("display", "noone");
        $("#inputPassword1").removeClass("error");
    });
    $("#checkFinall").on("click", function () {
        if (f1 && f2 && f3) {
            $(".toast--green").fadeIn("fast");
            setTimeout(function () {
                $("#allsubmit").submit();
            }, 4000)

        }
        if (!f3) {
            $("#phonecodeerror").css("display", "inline-block");
            $("#inputPassword1").addClass("error");
        }
    });

});


//生成并渲染出验证码图形
function draw(show_num) {
    var canvas_width = $("#canvas").width();
    var canvas_height = $("#canvas").height();
    var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
    var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode =
        "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length; //获取到数组的长度
    for (var i = 0; i < 4; i++) {
        //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        // var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var deg = Math.random() - 0.5; //产生一个随机弧度
        var txt = aCode[j]; //得到随机的一个内容
        show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";
        context.translate(x, y);
        context.rotate(deg);
        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);
        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++) {
        //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(
            Math.random() * canvas_width,
            Math.random() * canvas_height
        );
        context.lineTo(
            Math.random() * canvas_width,
            Math.random() * canvas_height
        );
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) {
        //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
}

//得到随机的颜色值
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
