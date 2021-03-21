package com.example.controller;

import com.alibaba.fastjson.JSON;
import com.example.dao.TradePayDao;
import com.example.dao.cartDao;
import com.example.pojo.TradeOrder;
import com.example.pojo.cart;
import com.example.utils.Mybatis;
import com.mysql.cj.x.protobuf.MysqlxCrud;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class cartController {

    @ResponseBody
    @PostMapping("getCartsById")
    public String getCarts(@RequestParam("memberId") Integer memberId) {

        //System.out.println(memberId);
        SqlSession sqlSession = Mybatis.getSqlSession();
        cartDao mapper = sqlSession.getMapper(cartDao.class);
        List<cart> cartList = mapper.getCartList(memberId);
        sqlSession.close();
        return JSON.toJSONString(cartList);
    }

    @ResponseBody
    @RequestMapping("/delectOneGoddFromCarts")
    public String delectCart(@RequestParam("memberId") Integer id) {
        // System.out.println(id);
        SqlSession sqlSession = Mybatis.getSqlSession();
        cartDao mapper = sqlSession.getMapper(cartDao.class);
        mapper.deCart(id);
        sqlSession.commit();
        sqlSession.close();

        return "true";
    }

    @ResponseBody
    @RequestMapping("/getOradeList")
    public String getOradeList(HttpSession session) {
        int id = (int) session.getAttribute("id");
        SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
        List<TradeOrder> OL = mapper.getTradeOrder(id);
        sqlSession.close();
        return JSON.toJSONString(OL);
    }


}
