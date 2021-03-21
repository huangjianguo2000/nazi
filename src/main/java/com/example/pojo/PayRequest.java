package com.example.pojo;

public class PayRequest {
    /**
     * 商户订单号
     */
    private String out_trade_no;
    /**
     * 订单总金额
     */
    private String total_amount;
    /**
     * 订单标题
     */
    private String subject;
    /**
     * 商品编号
     */
    private String goods_id;
    /**
     * 数量
     */
    private String quantity;
    /**
     * 单价
     */
    private String price;
    /**
     *
     */
    private String product_code;

    /**
     * 回参
     */
    private String passback_params;

    public PayRequest() {
    }

    public PayRequest(String out_trade_no, String total_amount, String subject, String goods_id, String quantity, String price, String product_code, String passback_params) {
        this.out_trade_no = out_trade_no;
        this.total_amount = total_amount;
        this.subject = subject;
        this.goods_id = goods_id;
        this.quantity = quantity;
        this.price = price;
        this.product_code = product_code;
        this.passback_params = passback_params;
    }

    public String getPassback_params() {
        return passback_params;
    }

    public void setPassback_params(String passback_params) {
        this.passback_params = passback_params;
    }

    public String getOut_trade_no() {
        return out_trade_no;
    }

    public void setOut_trade_no(String out_trade_no) {
        this.out_trade_no = out_trade_no;
    }

    public String getTotal_amount() {
        return total_amount;
    }

    public void setTotal_amount(String total_amount) {
        this.total_amount = total_amount;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(String goods_id) {
        this.goods_id = goods_id;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getProduct_code() {
        return product_code;
    }

    public void setProduct_code(String product_code) {
        this.product_code = product_code;
    }
}
