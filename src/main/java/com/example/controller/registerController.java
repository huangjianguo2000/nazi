package com.example.controller;

import com.example.utils.SendSms;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class registerController {

    @ResponseBody
    @RequestMapping("/getRisterCode")
    public String getCode(@RequestParam("phoneNum") String number,
                          @RequestParam("code") String code) {

//        System.out.println(number);
        //      System.out.println(code);

        SendSms.sendCode(number, code);

        return "success";
    }
}
