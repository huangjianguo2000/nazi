package com.example.controller;

import com.example.dao.UserDao;
import com.example.dao.cartDao;
import com.example.pojo.User;
import com.example.pojo.cart;
import com.example.utils.Mybatis;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;
import java.util.List;

@Controller
public class loginController {

    private Integer num;

    private String imgUrl = null;

    @RequestMapping("/login")
    public String toLogin() {
        return "page/login";
    }

    @RequestMapping("/index")
    public String goIndex() {
        return "index";
    }

    @ResponseBody
    @RequestMapping("/index2")
    public String goIndex2() {
        return "index";
    }


    @RequestMapping("/WeChat")
    public String WeChat(){
        return "page/WeChat";
    }
    @RequestMapping("/miaosha")
    public String miaosha(@RequestParam("id") String id, Model model) {
        model.addAttribute("id", id);
        return "page/miaosha";
    }

    public boolean check(String name, String password, HttpSession session) throws NoSuchAlgorithmException {
        //得到sqlSession
        session.setAttribute("password", password);
        SqlSession sqlSession = Mybatis.getSqlSession();

        UserDao mapper = sqlSession.getMapper(UserDao.class);
        List<User> userList = mapper.getUserList2(name);

        User user1 = null;
        user1 = userList.get(0);
//        md5加密
//        MessageDigest md = MessageDigest.getInstance("MD5");
//        md.update(password.getBytes());
//        String str = new BigInteger(1, md.digest()).toString(16);
//        System.out.println(str);
//SHA加密
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(password.getBytes());
        String str = new BigInteger(md.digest()).toString(32);
//        System.out.println(str);
        password = str;
        //System.out.println(name + "2");
       /* for (User user : userList) {

            System.out.println(JSON.toJSONString(user));
            String ans = user.getPersonName();
          *//*  System.out.println(ans + " 3");*//*
            if(ans.equals(name))
            {
                user1 = user;
            }
        }*/
        /*System.out.println("check");
        System.out.println(JSON.toJSONString(user1));*/
        if (user1 == null) {
            return false;
        }
        num = user1.getNum();
        int user_id = user1.getId();
        String names = user1.getPersonName();

        session.setAttribute("loginUser", names);
        session.setAttribute("id", user_id);
        imgUrl = user1.getImgUrl();

        sqlSession.close();
        String password1 = user1.getPassword();
       /* System.out.println(password1);
        System.out.println(user1.getPassword());*/
        if (password1.equals(password))
            return true;
        return false;
    }

    @RequestMapping("/logout")
    public String Logout(HttpSession session) {
        session.invalidate();
        return "index";

    }

    @RequestMapping("/goCart")
    public String GoCart(Model model, HttpServletRequest request) {

        Object loginUser = request.getSession().getAttribute("loginUser");
        if (loginUser == null) {

            return "page/login";
        } else
            return "page/cart";
    }

    @RequestMapping("/toShow")
    public String toShow(@RequestParam("id") String id, Model model) {
        model.addAttribute("id", id);
        return "page/item";
    }


    @RequestMapping("/user/login")
    public String Login(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        Model model, HttpSession session) throws NoSuchAlgorithmException {


        /* System.out.println(username + "1");*/
        if (check(username, password, session)) {


            session.setAttribute("sum", num);
            session.setAttribute("url", imgUrl);
            return "index";
        } else {
            model.addAttribute("msg", "用户名或者密码错误");
            return "page/login";
        }
    }

    @RequestMapping("/register")
    public String register(@RequestParam("username") String username,
                           @RequestParam("password") String password,
                           @RequestParam("phonenumber") String phonenumber,
                           @RequestParam("personName") String personName) throws NoSuchAlgorithmException {
//        System.out.println(username);
//        System.out.println(password);
//        System.out.println(phonenumber);

        SqlSession sqlSession = Mybatis.getSqlSession();
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(password.getBytes());
        String str = new BigInteger(md.digest()).toString(32);
//        System.out.println(str);
        password = str;
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        List<User> listUser = mapper.getUserList2(username);
        if (listUser.size() > 0)
            return "page/login";
        mapper.inserUser(username, password, phonenumber, personName);
        sqlSession.commit();
        sqlSession.close();
        return "page/login";
    }

    //    搜索页面数据的提交以及跳转
    @RequestMapping("/searchGoods")
    public String Search(@RequestParam("findtext") String name, Model model) {
        model.addAttribute("msg", name);
        // System.out.println(name);
        return "page/search";
    }


    @ResponseBody
    @PostMapping("addCarts")
    public String addCarts(@RequestParam("memberId") Integer memberId, HttpSession session) {


        int id = (Integer) (session.getAttribute("id"));
        SqlSession sqlSession = Mybatis.getSqlSession();
        cartDao mapper = sqlSession.getMapper(cartDao.class);
        // System.out.println(memberId);
        List<cart> cartList = mapper.getCartList(id);
        //  System.out.println(JSON.toJSONString(cartList));
        boolean f = false;
        for (cart c : cartList) {

            if (c.getGoodId() == memberId) {
                f = true;
                break;
            }
        }
        if (!f) {
            mapper.insertCart(id, memberId, 1);
            sqlSession.commit();
            sqlSession.close();
            return "true";
        }

        sqlSession.close();

        return "false";
    }

    @RequestMapping("/toRegister")
    public String ToRegister() {

        return "page/register";
    }

    @ResponseBody
    @RequestMapping("/getRemindUser")
    public String GetUserRemind(@RequestParam("keyWord") String name) {
        SqlSession sqlSession = Mybatis.getSqlSession();

        UserDao mapper = sqlSession.getMapper(UserDao.class);
        List<User> userList = mapper.getUserList2(name);
        sqlSession.close();
        if (userList.size() == 0)
            return "true";
        else return "false";
    }

    @RequestMapping("/accountManager")
    public String updateImg(HttpSession session) {
        if (session.getAttribute("id") != null)
            return "page/information";
        else return "page/login";
    }

    @Value("${uploadFile.path}")
    private String uploadPath;

    @RequestMapping("/uploadImg")
    @ResponseBody
    public String uploadImg(HttpServletRequest request, HttpSession session) throws Exception {
        DiskFileItemFactory diskFileItemFactory = new DiskFileItemFactory();
        ServletFileUpload servletFileUpload = new ServletFileUpload(diskFileItemFactory);
        servletFileUpload.setHeaderEncoding("UTF-8");
        try {
            List<FileItem> fileItems = servletFileUpload.parseRequest(request);
            //System.out.println(fileItems.size());
            Iterator<FileItem> iterator = fileItems.iterator();
            while (iterator.hasNext()) {
                FileItem item = iterator.next();
                Integer id = (Integer) session.getAttribute("id");
                if (!item.isFormField()) {
                    //删除原本的照片
                    try (SqlSession sqlSession = Mybatis.getSqlSession()) {
                        UserDao mapper = sqlSession.getMapper(UserDao.class);
                        String userImg = mapper.getUserImg(id);
                        if (userImg != null) {
                            File deleteFile = new File(uploadPath, userImg);
                            boolean delete = deleteFile.delete();
                            //System.out.println("是否删除："+delete);
                        }
                    }
                    String fieldName = item.getName();
                    //System.out.println(item.getSize());
                    String suffix = fieldName.substring(fieldName.lastIndexOf("."));
                    File userImg = new File(id + suffix);
                    File savedImg = new File(uploadPath, userImg.getName());
                    item.write(savedImg);
                    try (SqlSession sqlSession = Mybatis.getSqlSession()) {
                        UserDao mapper = sqlSession.getMapper(UserDao.class);
                        int i = mapper.uploadUserImg(userImg.getName(), id);
                        sqlSession.commit();
                    }
                } else if (item.isFormField()) {
                    System.out.println("文本");
                }
            }
        } catch (FileUploadException e) {
            e.printStackTrace();
        }
        return "success";
    }


}
