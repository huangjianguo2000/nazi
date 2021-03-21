package com.example.dao;

import com.example.pojo.evaluate;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface evaluateDao {

    public List<evaluate> getEvaluateList(int goodId);

    public void insertEvaluate(@Param("userId") int userId,
                               @Param("goodId") int goodId,
                               @Param("userName") String userName,
                               @Param("text") String text);
}
