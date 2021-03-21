/*根据id获取对象*/
function getId(str) {
    return document.getElementById(str);
}

var addrShow = getId('addr-show');
var btn = document.getElementsByClassName('met1')[0];
var prov = getId('prov');
var city = getId('city');
var country = getId('country');


/*用于保存当前所选的省市区*/
var current = {
    prov: '',
    city: '',
    country: ''
};

/*自动加载省份列表*/
(function showProv() {
    btn.disabled = true;
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov.appendChild(provOpt);
    }
})();

/*根据所选的省份来显示城市列表*/
function showCity(obj) {
    var val = obj.options[obj.selectedIndex].value;
    if (val != current.prov) {
        current.prov = val;
        addrShow.value = '';
        btn.disabled = true;
    }
    //console.log(val);
    if (val != null) {
        city.length = 1;
        var cityLen = provice[val]["city"].length;
        for (var j = 0; j < cityLen; j++) {
            var cityOpt = document.createElement('option');
            cityOpt.innerText = provice[val]["city"][j].name;
            cityOpt.value = j;
            city.appendChild(cityOpt);
        }
    }
}

/*根据所选的城市来显示县区列表*/
function showCountry(obj) {
    var val = obj.options[obj.selectedIndex].value;
    current.city = val;
    if (val != null) {
        country.length = 1; //清空之前的内容只留第一个默认选项
        var countryLen = provice[current.prov]["city"][val].districtAndCounty.length;
        if (countryLen == 0) {
            addrShow.value = provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name;
            return;
        }
        for (var n = 0; n < countryLen; n++) {
            var countryOpt = document.createElement('option');
            countryOpt.innerText = provice[current.prov]["city"][val].districtAndCounty[n];
            countryOpt.value = n;
            country.appendChild(countryOpt);
        }
    }
}

/*选择县区之后的处理函数*/
function selecCountry(obj) {
    current.country = obj.options[obj.selectedIndex].value;
    if ((current.city != null) && (current.country != null)) {
        btn.disabled = false;
    }
}

/*点击确定按钮显示用户所选的地址*/


function showads() {
    return provice[current.prov].name + '-' + provice[current.prov]["city"][current.city].name + '-' + provice[current.prov]["city"][current.city].districtAndCounty[current.country];
}

$(function () {
    $.ajax({
        url: "/getAddress",
        method: "post",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            for (var i = 0; i < data.length; i++) {
                var realName = data[i].realName;
                var emailCode = data[i].emailCode;
                var phoneNumber = data[i].phoneNumber;
                var shoppingAddress = data[i].shoppingAddress;
                var clearAddress = data[i].clearAddress;
                var state = data[i].state;
                var addressId = data[i].addressId;
                $("#add-addresss").append(`<tr>
      <td style="line-height: 33px;">` + realName + `</td>
      <td style="width: 130px;">` + shoppingAddress + `</td>
      <td style="width: 150px;">` + clearAddress + `</td>
      <td style="line-height: 33px;">` + emailCode + `</td>
      <td style="line-height: 33px;">` + phoneNumber + `</td>
       <td style="line-height: 33px;"><a href="/toaddress">修改</a>|<a href="/delectAddress?address_id=` + addressId + `">删除</a></td>
       <td style="line-height: 33px;" class="` + state + `"><a href="/updateAddress?address_id=` + addressId + `">默认地址</a></td>
        </tr>`);
            }
        },
        error: function () {
            alert("得到收货地址失败");
        }

    });

    $("#button-show").on("click", function () {
        alert();
        var big_address = showads();
        var clear_address = $("#inputEmail5").val();
        var emailCode = $("#inputEmail4").val();
        var phoneNumber = $("#inputEmail3").val();
        var name = $("#inputEmail6").val();


        if (big_address != "" && clear_address != "" && emailCode != "" && phoneNumber != "" && name != "") {
            $.ajax({
                url: "/addAddress",
                method: "post",
                data: {
                    big_address: big_address,
                    clear_address: clear_address,
                    emailCode: emailCode,
                    phoneNumber: phoneNumber,
                    name: name,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    for (var i = data.length - 1; i < data.length; i++) {
                        var realName = data[i].realName;
                        var emailCode = data[i].emailCode;
                        var phoneNumber = data[i].phoneNumber;
                        var shoppingAddress = data[i].shoppingAddress;
                        var clearAddress = data[i].clearAddress;
                        var state = data[i].state;
                        $("#add-addresss").append(`<tr>
      <td style="line-height: 33px;">` + realName + `</td>
      <td style="width: 130px;">` + shoppingAddress + `</td>
      <td style="width: 150px;">` + clearAddress + `</td>
      <td style="line-height: 33px;">` + emailCode + `</td>
      <td style="line-height: 33px;">` + phoneNumber + `</td>
       <td style="line-height: 33px;"><a href="">修改</a>|<a href="">删除</a></td>
       <td style="line-height: 33px;" class="` + state + `"><a href="">默认地址</a></td>
        </tr>`);
                    }
                },
                error: function () {
                    alert("得到收货地址失败");
                }

            });
        } else alert("请把信息填写完整");

    })

})
