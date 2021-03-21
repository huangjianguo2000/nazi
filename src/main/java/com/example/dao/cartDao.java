package com.example.dao;

import com.example.pojo.cart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface cartDao {
    List<cart> getCartList(int userId);

    void insertCart(@Param("userId") int userId, @Param("goodId") int goodId, @Param("goodNums") int goodNum);

    void deCart(Integer id);
}
