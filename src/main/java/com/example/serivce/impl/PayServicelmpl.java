package com.example.serivce.impl;

import com.alipay.api.AlipayApiException;
import com.example.bean.AlipayBean;
import com.example.config.Alipay;
import com.example.serivce.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
class PayServiceImpl implements PayService {

    @Autowired
    private Alipay alipay;

    @Override
    public String aliPay(AlipayBean alipayBean) throws AlipayApiException {
        return alipay.pay(alipayBean);
    }

}
