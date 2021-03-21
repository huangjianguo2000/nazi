package com.example.controller;

import com.alibaba.fastjson.JSON;
import com.example.dao.*;
import com.example.pojo.Phone;
import com.example.pojo.TradeOrder;
import com.example.pojo.address;
import com.example.pojo.evaluate;
import com.example.utils.Mybatis;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class getOrderController {

    @RequestMapping("/ToOradeList")
    public String ToOrade(HttpSession session) {
        if (session.getAttribute("id") != null)
            return "page/myCart";
        else return "page/login";
    }

    @RequestMapping("/toMap")
    public String toMap() {
        return "page/Map";
    }

    @ResponseBody
    @CrossOrigin
    @RequestMapping("/getOraderList")
    public String getOraderList(@RequestParam("id") int id, HttpSession session) {

        SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
        List<TradeOrder> ansList = mapper.getTradeOrder(id);
        sqlSession.close();
        return JSON.toJSONString(ansList);
    }

    /*
    * @ResponseBody
        @RequestMapping("/getOraderList")
        public String getOraderList(@RequestParam("id") int id,HttpSession session) {

            SqlSession sqlSession = Mybatis.getSqlSession();
            TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
            List<TradeOrder> ansList = mapper.getTradeOrder(id);
            PhoneDao mapper2 =  sqlSession.getMapper(PhoneDao.class);

            List<Phone> phoneList = null;
            for(TradeOrder to:ansList){
                int goodid = to.getGoodsId();
                Phone phone =  mapper2.getPhoneList(goodid);
                String gmtPayment = to.getGmtPayment();
                int goodsStatus = to.getGoodsStatus();
                String outTradeNo = to.getOutTradeNo();
               phone.setGmtPayment(gmtPayment);
               phone.setGoodsStatus(goodsStatus);
               phone.setOutTradeNo(outTradeNo);
                phoneList.add(phone);
            }
            sqlSession.close();
            return JSON.toJSONString(phoneList);
        }
    * */
    @ResponseBody
    @RequestMapping("/getOrd")
    public String getOrd(@RequestParam("ord") String ord) {

        SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
        TradeOrder ans = mapper.getTradeOrder2(ord);
        sqlSession.close();
        return JSON.toJSONString(ans);
    }


    @RequestMapping("/towuliu")
    public String toWuLiu(HttpSession session) {
        if (session.getAttribute("id") != null)
            return "page/logistics";
        else return "page/login";
    }

    @ResponseBody
    @RequestMapping("/getGoodSure")
    public String getGoodSure(@RequestParam("ord") String ord) {
        SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper1 = sqlSession.getMapper(TradePayDao.class);
        int PhoneId = mapper1.selectGoodId(ord);
        PhoneDao mapper2 = sqlSession.getMapper(PhoneDao.class);
        Phone ans = mapper2.getPhoneList(PhoneId);
        sqlSession.close();
        return JSON.toJSONString(ans);
    }

    @RequestMapping("/sure")
    public String sureToGodds(@RequestParam("ord") String ord, HttpSession session) {
        session.setAttribute("ord", ord);
      /*  SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper2 = sqlSession.getMapper(TradePayDao.class);
        mapper2.setState2(ord);
        sqlSession.close();*/
        if (session.getAttribute("id") != null)
            return "page/shouhuo";
        else return "page/login";

    }

    @ResponseBody
    @RequestMapping("/checkSure")
    public String checkSure(@RequestParam("password") String password, HttpSession session) {
        String password2 = (String) session.getAttribute("password");
        /*System.out.println(password);
        System.out.println(password2);*/
        if (password.equals(password2))
            return "true";
        else return "false";
    }

    @RequestMapping("/submitSure")
    public String submitSure(HttpSession session) {
        String ord = (String) session.getAttribute("ord");
        SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
        mapper.setState2(ord);
        sqlSession.close();
        if (session.getAttribute("id") != null)
            return "page/myCart";
        else return "page/login";

    }

    @RequestMapping("/toPingJia")
    public String toPingJia(@RequestParam("ord") String ord, Model model, HttpSession session) {
        SqlSession sqlSession = Mybatis.getSqlSession();
        TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
        int PhoneId = mapper.selectGoodId(ord);
        sqlSession.close();
        model.addAttribute("goodId", PhoneId);
        session.setAttribute("ord", ord);
        if (session.getAttribute("id") != null)
            return "page/pingjia";
        else return "page/login";

    }

    @RequestMapping("/submitEvaluate")
    public String submitEvaluate(@RequestParam("goodId") int goodId,
                                 @RequestParam("content") String content,
                                 HttpSession session) {
        int userId = (int) session.getAttribute("id");
        String userName = (String) session.getAttribute("loginUser");
       /* System.out.println(goodId);
        System.out.println(content);
        System.out.println(userId);
        System.out.println(userName);*/
        SqlSession sqlSession = Mybatis.getSqlSession();
        evaluateDao mapper = sqlSession.getMapper(evaluateDao.class);
        mapper.insertEvaluate(userId, goodId, userName, content);
        sqlSession.commit();
        /*改变订单状态*/
        String ord = (String) session.getAttribute("ord");
        TradePayDao mapper2 = sqlSession.getMapper(TradePayDao.class);
        mapper2.setState(ord);
        sqlSession.close();
        if (session.getAttribute("id") != null)
            return "page/myCart";
        else return "page/login";

    }

    @ResponseBody
    @RequestMapping("/getEvaluate")
    public String getEvaluate(@RequestParam("goodId") int goodId) {
        SqlSession sqlSession = Mybatis.getSqlSession();
        evaluateDao mapper = sqlSession.getMapper(evaluateDao.class);
        List<evaluate> ansList = mapper.getEvaluateList(goodId);
        sqlSession.close();

        return JSON.toJSONString(ansList);
    }
}
