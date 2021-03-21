package com.example.pojo;

import java.util.Date;

public class TradeOrder {
    /**
     * 商户订单号
     */
    private String outTradeNo;
    /**
     * 支付宝交易号
     */
    private String tradeNo;
    /**
     * 商品ID
     */
    private Integer goodsId;
    /**
     * 订单名称，也就是商品名称
     */
    private String subject;
    /**
     * 单价
     */
    private Double price;
    /**
     * 数量
     */
    private Integer quantity;
    /**
     * 订单总金额
     */
    private Double totalAmount;
    /**
     * 用户ID
     */
    private Integer userId;
    /**
     * 订单状态
     */
    private String tradeStatus;
    /**
     * 订单创建时间
     */
    private String gmtCreate;
    /**
     * 订单支付时间
     */
    private String gmtPayment;

    /**
     * 商品状态
     */
    private Integer goodsStatus;

    /**
     * 收货地址ID
     */
    private Integer addressId;

    private Integer logisticsMode;

    public TradeOrder() {
    }

    public TradeOrder(String outTradeNo, String tradeNo, Integer goodsId, String subject, Double price, Integer quantity, Double totalAmount, Integer userId, String tradeStatus, String gmtCreate, String gmtPayment, Integer goodsStatus, Integer logistics_mode) {
        this.outTradeNo = outTradeNo;
        this.tradeNo = tradeNo;
        this.goodsId = goodsId;
        this.subject = subject;
        this.price = price;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.userId = userId;
        this.tradeStatus = tradeStatus;
        this.gmtCreate = gmtCreate;
        this.gmtPayment = gmtPayment;
        this.goodsStatus = goodsStatus;
        this.logisticsMode = logistics_mode;
    }

    public Integer getGoodsStatus() {
        return goodsStatus;
    }

    public void setGoodsStatus(Integer goodsStatus) {
        this.goodsStatus = goodsStatus;
    }

    public String getOutTradeNo() {
        return outTradeNo;
    }

    public void setOutTradeNo(String outTradeNo) {
        this.outTradeNo = outTradeNo;
    }

    public String getTradeNo() {
        return tradeNo;
    }

    public void setTradeNo(String tradeNo) {
        this.tradeNo = tradeNo;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTradeStatus() {
        return tradeStatus;
    }

    public void setTradeStatus(String tradeStatus) {
        this.tradeStatus = tradeStatus;
    }

    public String getGmtCreate() {
        return gmtCreate;
    }

    public void setGmtCreate(String gmtCreate) {
        this.gmtCreate = gmtCreate;
    }

    public String getGmtPayment() {
        return gmtPayment;
    }

    public void setGmtPayment(String gmtPayment) {
        this.gmtPayment = gmtPayment;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Integer getLogistics_mode() {
        return logisticsMode;
    }

    public void setLogistics_mode(Integer logistics_mode) {
        this.logisticsMode = logistics_mode;
    }

    @Override
    public String toString() {
        return "TradeOrder{" +
                "outTradeNo='" + outTradeNo + '\'' +
                ", tradeNo='" + tradeNo + '\'' +
                ", goodsId=" + goodsId +
                ", subject='" + subject + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", totalAmount=" + totalAmount +
                ", userId=" + userId +
                ", tradeStatus='" + tradeStatus + '\'' +
                ", gmtCreate='" + gmtCreate + '\'' +
                ", gmtPayment='" + gmtPayment + '\'' +
                ", goodsStatus=" + goodsStatus +
                ", addressId=" + addressId +
                ", logistics_mode=" + logisticsMode +
                '}';
    }
}
