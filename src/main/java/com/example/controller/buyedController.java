package com.example.controller;

import com.alibaba.fastjson.JSON;
import com.example.dao.PhoneDao;
import com.example.dao.buyedDao;
import com.example.dao.cartDao;
import com.example.pojo.Buyed;
import com.example.pojo.Phone;
import com.example.utils.Mybatis;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class buyedController {

    @ResponseBody
    @RequestMapping("/buyedGoods")
    public String getBuyedGoods(@RequestParam("userId") Integer id) {
        SqlSession sqlSession = Mybatis.getSqlSession();
        buyedDao mapper = sqlSession.getMapper(buyedDao.class);
        List<Buyed> buyedList = mapper.getBuyedList(id);
        sqlSession.close();
        return JSON.toJSONString(buyedList);
    }

    @ResponseBody
    @RequestMapping("/hello")
    public String hello() {
        System.out.println("123");
        return "index";
    }
}
