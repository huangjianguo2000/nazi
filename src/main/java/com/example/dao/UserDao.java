package com.example.dao;

import com.example.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserDao {
    User getUser(int id);

    List<User> getUserList2(String name);

    void inserUser(@Param("username") String id, @Param("password") String password, @Param("phonenumber") String phonenumber, @Param("personName") String personName);

    int uploadUserImg(@Param("url") String url, @Param("id") Integer userId);

    String getUserImg(Integer id);

    void updataInfo(@Param("userId") int id, @Param("name") String name);
}