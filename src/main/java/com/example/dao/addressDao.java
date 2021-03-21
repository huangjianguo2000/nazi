package com.example.dao;

import com.example.pojo.address;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface addressDao {

    List<address> getAddressList(int id);

    address getAddressList2(int id);

    void insertAddress(@Param("big_address") String big_address,
                       @Param("clear_address") String clear_address,
                       @Param("emailCode") String emailCode,
                       @Param("phoneNumber") String phoneNumber,
                       @Param("name") String name,
                       @Param("userid") int userid);


    void updataAddress(int addressId);

    void clearAddress(int userId);

    void delectAddress(int addressId);
}
