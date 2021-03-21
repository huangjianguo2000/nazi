package com.example.controller;


import com.alibaba.fastjson.JSON;
import com.example.dao.PhoneDao;
import com.example.dao.partsDao;
import com.example.pojo.Phone;
import com.example.pojo.parts;
import com.example.utils.Mybatis;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;


@Controller
public class itemController {

    //    渲染手机页面
//    通过手机的id查找手机信息
    @ResponseBody
    @PostMapping("searchById")
    public String getMemberById(@RequestParam("memberId") Integer memberId) {
        //  System.out.println(memberId);
        SqlSession sqlSession = Mybatis.getSqlSession();
        PhoneDao mapper = sqlSession.getMapper(PhoneDao.class);
        Phone phoneList = mapper.getPhoneList(memberId);

        sqlSession.close();
        return JSON.toJSONString(phoneList);
    }


    @ResponseBody
    @PostMapping("searchByNotId")
    public String getMemberByNotId(@RequestParam("memberId") Integer memberId) {
//        System.out.println(memberId);
        SqlSession sqlSession = Mybatis.getSqlSession();
        PhoneDao mapper = sqlSession.getMapper(PhoneDao.class);
        List<Phone> phoneList = mapper.getPhoneList2(memberId);

        sqlSession.close();
        return JSON.toJSONString(phoneList);
    }

    //    配件
    @ResponseBody
    @PostMapping("searchParts")
    public String getParts() {
        SqlSession sqlSession = Mybatis.getSqlSession();
        partsDao mapper = sqlSession.getMapper(partsDao.class);
        List<parts> partsList = mapper.getPartsList();
        sqlSession.close();
        return JSON.toJSONString(partsList);
    }

    @RequestMapping("/goTheBuyPage")
    public String GoTheBuyPage(@RequestParam("good_id") int good_id,
                               Model model, HttpSession session) {
        model.addAttribute("good_id", good_id);
        if (session.getAttribute("id") != null)
            return "page/ddym";
        else return "page/login";

    }


}
