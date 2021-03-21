package com.example.controller;

import com.alibaba.fastjson.JSON;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.example.config.AlipayConfig;
import com.example.dao.TradePayDao;
import com.example.dao.UserDao;
import com.example.pojo.PayRequest;
import com.example.pojo.TradeOrder;
import com.example.utils.Mybatis;
import com.fasterxml.jackson.datatype.jsr310.ser.YearSerializer;
import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.message.StringFormattedMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.*;

@Controller
@RequestMapping("/alipay")
public class AlipayController {

    private String getOutTradeNo() {
        Calendar calendar = Calendar.getInstance();
        StringBuilder res = new StringBuilder();
        //获取当前年份
        res.append(calendar.get(Calendar.YEAR)).append(calendar.get(Calendar.MONTH))
                .append(calendar.get(Calendar.MONTH) + 1).append(calendar.get(Calendar.DATE))
                .append(calendar.get(Calendar.HOUR_OF_DAY)).append(calendar.get(Calendar.MINUTE))
                .append(calendar.get(Calendar.SECOND)).append(calendar.get(Calendar.MILLISECOND));
        return String.valueOf(res);
    }

    @RequestMapping("/payPage")
    public String toPayPage() {
        return "tradePay/testPay";
    }

    //获得初始化的AlipayClient
    private AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, AlipayConfig.app_id, AlipayConfig.merchant_private_key, "json", AlipayConfig.charset, AlipayConfig.alipay_public_key, AlipayConfig.sign_type);

    /**
     * 支付页面，测试成功
     *
     * @param request
     * @return
     * @throws UnsupportedEncodingException
     * @throws AlipayApiException
     */
    @RequestMapping("/payment")
    @ResponseBody
    public String pay(HttpServletRequest request, HttpSession httpSession) throws UnsupportedEncodingException, AlipayApiException {

        //设置请求参数
        AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
        alipayRequest.setReturnUrl(AlipayConfig.return_url);
        alipayRequest.setNotifyUrl(AlipayConfig.notify_url);

        //时间戳生成订单号
        String out_trade_no = getOutTradeNo();
        //单价
        String price = new String(request.getParameter("price").getBytes("UTF-8"), "UTF-8");
        //商品数量
        String quantity = new String(request.getParameter("WIDquantity").getBytes("UTF-8"), "UTF-8");

        int a = Integer.parseInt(quantity);
        double b = Double.parseDouble(price);
        //商品总金额
        String total_amount = String.valueOf(a * b);
        //订单名称，必填
        String subject = new String(request.getParameter("WIDsubject").getBytes("UTF-8"), "UTF-8");
        //商品Id
        String goodId = new String(request.getParameter("goods_id").getBytes("UTF-8"), "UTF-8");
        String addressId = new String(request.getParameter("addressId").getBytes("UTF-8"), "UTF-8");
        //System.out.println(addressId);
        /**
         * 请求参数位置，传入请求
         */
        Integer id = (Integer) httpSession.getAttribute("id");
        String prams = goodId + "#" + price + "#" + quantity + "#" + id + "#" + addressId;
        //System.out.println(prams);
        String passback = URLEncoder.encode(prams);
        PayRequest payRequest = new PayRequest(out_trade_no, total_amount, subject, goodId, quantity, price, "FAST_INSTANT_TRADE_PAY", passback);
        String pay = JSON.toJSONString(payRequest);
        //System.out.println(pay);
        alipayRequest.setBizContent(pay);

        //请求
        String result = alipayClient.pageExecute(alipayRequest).getBody();
        return result;
    }

    @RequestMapping(value = "/returnUrl")
    public String toReturnUrl(HttpServletRequest request, Model model, HttpSession httpSession) throws UnsupportedEncodingException, AlipayApiException {
        //获取支付宝GET过来反馈
        Map<String, String> params = new HashMap<String, String>();
        Map<String, String[]> requestParams = request.getParameterMap();
        for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用
            valueStr = new String(valueStr.getBytes("UTF-8"), "utf-8");
            params.put(name, valueStr);
        }

        boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset, AlipayConfig.sign_type); //调用SDK验证签名

        //——请在这里编写您的程序（以下代码仅作参考）——
        if (signVerified) {
            /**
             * returnUrl中主要的信息，这时候这是在数据库中创建相应的订单，待支付宝发送异步通知是在修改订单状态
             */
            //商户订单号
            String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("UTF-8"), "UTF-8");
            //支付宝交易号
            String trade_no = new String(request.getParameter("trade_no").getBytes("UTF-8"), "UTF-8");
            //付款金额
            String total_amount = new String(request.getParameter("total_amount").getBytes("UTF-8"), "UTF-8");

            model.addAttribute("out_trade_no", out_trade_no);
            model.addAttribute("trade_no", trade_no);
            model.addAttribute("total_amount", total_amount);
        } else {
            System.out.println("验签失败");
        }
        //同步页面，用于提供支付后的数据去渲染页面，可用于展示支付后的订单
        return "page/paysuccess";
    }

    @RequestMapping(value = "/notifyUrl")
    @ResponseBody
    public void notifyUrl(HttpServletRequest request) throws UnsupportedEncodingException, AlipayApiException {
        Map<String, String> params = new HashMap<String, String>();
        Map<String, String[]> requestParams = request.getParameterMap();
        for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr = "";
            for (int i = 0; i < values.length; i++) {
                valueStr = (i == values.length - 1) ? valueStr + values[i]
                        : valueStr + values[i] + ",";
            }
            //乱码解决，这段代码在出现乱码时使用
            valueStr = new String(valueStr.getBytes("utf-8"), "utf-8");
            params.put(name, valueStr);
        }

        boolean signVerified = AlipaySignature.rsaCheckV1(params, AlipayConfig.alipay_public_key, AlipayConfig.charset, AlipayConfig.sign_type);


        //——请在这里编写您的程序（以下代码仅作参考）——

	/* 实际验证过程建议商户务必添加以下校验：
	1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
	2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
	3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
	4、验证app_id是否为该商户本身。
	*/
        //System.out.println("验签前输出，仅用于测试");
        //for (String s : requestParams.keySet()) {
        //System.out.println(s+"="+ Arrays.toString(requestParams.get(s)));
        // }
        //System.out.println("参数输出完成------------------------------");
        if (signVerified) {//验证成功
            //商户订单号
            String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("UTF-8"), "UTF-8");
            //支付宝交易号
            String trade_no = new String(request.getParameter("trade_no").getBytes("UTF-8"), "UTF-8");
            //交易状态
            String trade_status = new String(request.getParameter("trade_status").getBytes("UTF-8"), "UTF-8");
            if ("TRADE_FINISHED".equals(trade_status)) {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //退款日期超过可退款期限后（如三个月可退款），支付宝系统发送该交易状态通知
            } else if ("TRADE_SUCCESS".equals(trade_status)) {
                /**
                 * 判断订单是否被处理过
                 */
                String status;
                try (SqlSession sqlSession = Mybatis.getSqlSession()) {
                    TradePayDao mapper = sqlSession.getMapper(TradePayDao.class);
                    status = mapper.findStatus(trade_no);
                }
                if (status == null || status.length() == 0) {
                    String passbackParams = new String(request.getParameter("passback_params").getBytes("UTF-8"), "UTF-8");
                    //商品Id
                    //System.out.println(passbackParams);
                    String[] split = URLDecoder.decode(passbackParams).split("#");
                    /**
                     * 获取请求时的参数
                     */
                    Integer goodId = Integer.parseInt(split[0]);
                    Double price = Double.parseDouble(split[1]);
                    Integer quantity = Integer.parseInt(split[2]);
                    Integer userId = Integer.parseInt(split[3]);
                    String subject = new String(request.getParameter("subject").getBytes("UTF-8"), "UTF-8");
                    Double totalAmount = Double.parseDouble(new String(request.getParameter("total_amount").getBytes("UTF-8"), "UTF-8"));
                    String gmtCreate = new String(request.getParameter("gmt_create").getBytes("UTF-8"), "UTF-8");
                    String gmt_paymnet = new String(request.getParameter("gmt_payment").getBytes("UTF-8"), "UTF-8");
                    TradeOrder tradeOrder = new TradeOrder(out_trade_no, trade_no, goodId, subject, price, quantity, totalAmount, userId, trade_status, gmtCreate, gmt_paymnet, 1, 1);
                    try (SqlSession sq = Mybatis.getSqlSession()) {
                        TradePayDao mapper = sq.getMapper(TradePayDao.class);

                        Integer addressId = Integer.parseInt(split[4]);
                        tradeOrder.setAddressId(addressId);

                        int i = mapper.insertOrder(tradeOrder);
                        int orderNum = mapper.getOrderNum(userId);
                        int backNum = mapper.updateUserOrder(orderNum, userId);
                        sq.commit();
                    }
                }
            }
            System.out.println("success");

        } else {//验证失败
            System.out.println("fail");
            //调试用，写文本函数记录程序运行情况是否正常
            //String sWord = AlipaySignature.getSignCheckContentV1(params);
            //AlipayConfig.logResult(sWord);
        }
    }
}
