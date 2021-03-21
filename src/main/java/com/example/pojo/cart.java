package com.example.pojo;

public class cart {
    private int userId;
    private int goodId;
    private int goodNums;

    public cart() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getGoodId() {
        return goodId;
    }

    public void setGoodId(int goodId) {
        this.goodId = goodId;
    }

    public int getGoodNums() {
        return goodNums;
    }

    public void setGoodNums(int goodNums) {
        this.goodNums = goodNums;
    }
}
