package com.example.controller;

import com.alibaba.fastjson.JSON;
import com.example.dao.UserDao;
import com.example.dao.addressDao;
import com.example.pojo.User;
import com.example.pojo.address;
import com.example.utils.Mybatis;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class informationController {

    @ResponseBody
    @RequestMapping("/getAddress")
    public String getAddressList(HttpSession session) {
        int id = (int) session.getAttribute("id");
        SqlSession sqlSession = Mybatis.getSqlSession();
        addressDao mapper = sqlSession.getMapper(addressDao.class);
        List<address> ansList = mapper.getAddressList(id);
        sqlSession.close();
        return JSON.toJSONString(ansList);
    }

    @ResponseBody
    @RequestMapping("/getAddress2")
    public String getAddressList2(@RequestParam("addressId") int addressId) {
        //  System.out.println("sdaas");
        SqlSession sqlSession = Mybatis.getSqlSession();
        addressDao mapper = sqlSession.getMapper(addressDao.class);
        address ans = mapper.getAddressList2(addressId);
        sqlSession.close();
        return JSON.toJSONString(ans);
    }

    @RequestMapping("/toaddress")
    public String toAddress(HttpSession session) {
        // System.out.println("here");
        if (session.getAttribute("id") != null)
            return "page/address";
        else return "page/login";

    }

    @ResponseBody
    @RequestMapping("/addAddress")
    public String updataAddress(@RequestParam("big_address") String big_address,
                                @RequestParam("clear_address") String clear_address,
                                @RequestParam("emailCode") String emailCode,
                                @RequestParam("phoneNumber") String phoneNumber,
                                @RequestParam("name") String name,
                                HttpSession session) {

        /*   System.out.println(big_address);*/
        int id = (int) (session.getAttribute("id"));
        SqlSession sqlSession = Mybatis.getSqlSession();
        addressDao mapper = sqlSession.getMapper(addressDao.class);
        mapper.insertAddress(big_address, clear_address, emailCode, phoneNumber, name, id);
        sqlSession.commit();
        List<address> ansList = mapper.getAddressList(id);
        sqlSession.close();
        return JSON.toJSONString(ansList);

    }

    @ResponseBody
    @RequestMapping("/updataInformation")
    public String updataInfo(@RequestParam("name") String name, HttpSession session) {
        /* System.out.println(name);*/
        int id = (int) session.getAttribute("id");
        /*System.out.println(id);*/
        SqlSession sqlSession = Mybatis.getSqlSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        mapper.updataInfo(id, name);
        sqlSession.commit();
        sqlSession.close();
        return "success";
    }

    @RequestMapping("/updateAddress")
    public String upDateAddress(@RequestParam("address_id") int id,
                                HttpSession session) {
        int userid = (int) session.getAttribute("id");
        SqlSession sqlSession = Mybatis.getSqlSession();
        addressDao mapper = sqlSession.getMapper(addressDao.class);
        mapper.clearAddress(userid);
        mapper.updataAddress(id);
        sqlSession.commit();
        sqlSession.close();
        if (session.getAttribute("id") != null)
            return "page/address";
        else return "page/login";

    }

    @RequestMapping("/delectAddress")
    public String delectAddress(@RequestParam("address_id") int id, HttpSession session) {

        SqlSession sqlSession = Mybatis.getSqlSession();
        addressDao mapper = sqlSession.getMapper(addressDao.class);
        mapper.delectAddress(id);
        sqlSession.commit();
        sqlSession.close();
        if (session.getAttribute("id") != null)
            return "page/address";
        else return "page/login";

    }

    @ResponseBody
    @RequestMapping("/getinfo")

    public String getInfo(HttpSession session) {
        int id = (int) session.getAttribute("id");
        SqlSession sqlSession = Mybatis.getSqlSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        User ans = mapper.getUser(id);
        return JSON.toJSONString(ans);
    }

    @ResponseBody
    @RequestMapping("/getSave")
    public String getSave(HttpSession session) {
        if (session.getAttribute("id") == null) {
            return "true";
        } else {
            if (session.getAttribute("once") == null) {
                session.setAttribute("once", 1);
                return "once";
            } else {
                return "false";
            }
        }
    }
}
