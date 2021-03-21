package com.example.serivce;

import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queuesToDeclare = @Queue("seckill")) //代表没有队列 去声明一个队列
public class Test {

    @RabbitHandler
    public void receive(String message){
        System.out.println(message);
    }

}
