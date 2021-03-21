package com.example.dao;

import com.example.pojo.Remaind;

import java.util.List;

public interface remaindDao {
    public List<Remaind> getRemaindList(String text);
}
