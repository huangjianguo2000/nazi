package com.example.dao;

import com.example.pojo.TradeOrder;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TradePayDao {
    /**
     * 查询订单是否被处理过
     *
     * @param tradeNo
     * @return
     */
    String findStatus(String tradeNo);

    /**
     * 创建订单
     *
     * @param tradeOrder
     * @return
     */
    int insertOrder(TradeOrder tradeOrder);

    /**
     * 获取用户订单数量
     *
     * @param userId
     * @return
     */
    int getOrderNum(Integer userId);

    /**
     * 更新用户订单数量
     *
     * @param nums
     * @return
     */
    int updateUserOrder(@Param("nums") int nums, @Param("id") int userId);

    List<TradeOrder> getTradeOrder(int user_id);

    TradeOrder getTradeOrder2(String ord);

    /**
     * 获取地址ID
     *
     * @param id
     * @return
     */
    Integer getAddressId(Integer id);

    public int selectGoodId(String ord);

    public void setState(String ord);

    public void setState2(String ord);
}
