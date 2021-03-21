package com.example.controller;

import com.alibaba.fastjson.JSON;
import com.example.dao.PhoneDao;
import com.example.dao.remaindDao;
import com.example.pojo.Phone;
import com.example.pojo.Remaind;
import com.example.serivce.contentService;
import com.example.utils.Mybatis;
import org.apache.catalina.connector.Response;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

@Controller
public class searchController {
    //    搜索页面展示

    @Autowired
    contentService contentService01;

    @ResponseBody
    @RequestMapping("/searchPhone")
    public String searchPhone(@RequestParam("name") String name) throws IOException {


        return contentService01.searchPagehighlighter(name);

    }

    @ResponseBody
    @RequestMapping("/getRemaind")
    public String getRemaind(@RequestParam("keyWord") String text) {
        SqlSession sqlSession = Mybatis.getSqlSession();
        remaindDao mapper = sqlSession.getMapper(remaindDao.class);
        List<Remaind> getList = mapper.getRemaindList(text);
        sqlSession.close();
        return JSON.toJSONString(getList);
    }
}
