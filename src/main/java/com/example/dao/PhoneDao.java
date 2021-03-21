package com.example.dao;

import com.example.pojo.Phone;

import java.util.List;

public interface PhoneDao {
    Phone getPhoneList(Integer memberId);

    List<Phone> getPhoneList2(Integer memberId);

    List<Phone> getPhoneList3(String name);
    List<Phone> getPhoneList4();

}
