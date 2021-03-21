package com.example.demo;

import com.alibaba.fastjson.JSON;
import com.example.dao.PhoneDao;
import com.example.pojo.Phone;
import com.example.utils.Mybatis;
import org.apache.ibatis.session.SqlSession;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.common.xcontent.XContentType;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@SpringBootTest
class DemoApplicationTests {
//    @Autowired
//    private RestHighLevelClient restHighLevelClient;
//
//    @Test
//    void testCreateIndex() throws IOException {
//        CreateIndexRequest request = new CreateIndexRequest("nazi03");
//        CreateIndexResponse createIndexResponse =
//                restHighLevelClient.indices().create(request, RequestOptions.DEFAULT);
//        System.out.println(createIndexResponse);
//    }

//    @Test
//    void testExistIndex() throws IOException {
//        GetIndexRequest request = new GetIndexRequest("huang");
//        boolean exist = client.indices().exists(request, RequestOptions.DEFAULT);
//        System.out.println(exist);
//
//
//    }

//    @Autowired
//    private BlogMapper blogMapper;
//    @Autowired
//    private VideoMapper videoMapper;
//    @Autowired
//    private DiscussMapper discussMapper;

//    @Test
//    void test01() throws IOException {
////        List<Blog> ans = blogMapper.selectList(null);
////        //创建请求
////        IndexRequest indexRequest = new IndexRequest("dream-fly-video");
////        indexRequest.id("1");
////        indexRequest.timeout("10s");
////        Blog blog1 = new Blog();
////        for (Blog blog : ans) {
////            blog1 = blog;
////        }
////        indexRequest.source(JSON.toJSONString(blog1), XContentType.JSON);
//        //发送请求 获取请求的结果
//
////        restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
//    }
//
//    @Test
//    void test001() throws IOException {
////        List<Blog> ans = blogMapper.selectList(null);
////        BulkRequest bulkRequest = new BulkRequest();
////        for (Blog blog : ans){
////            bulkRequest.add(new IndexRequest("dream-fly-blog")
////                    .source(JSON.toJSONString(blog), XContentType.JSON));
////        }
////        BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, RequestOptions.DEFAULT);
//    }
//    @Test
//    void test002() throws IOException {
////        List<Video> ans = videoMapper.selectList(null);
////        BulkRequest bulkRequest = new BulkRequest();
////        for (Video video : ans){
////
////            bulkRequest.add(new IndexRequest("dream-fly-video")
////                    .source(JSON.toJSONString(video), XContentType.JSON));
////        }
////        BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, RequestOptions.DEFAULT);
//    }
//    @Test
//    void test003() throws IOException {
//        SqlSession sqlSession = Mybatis.getSqlSession();
//        PhoneDao mapper = sqlSession.getMapper(PhoneDao.class);
//        List<Phone> phoneList = mapper.getPhoneList4();
//        System.out.println(phoneList);
//        sqlSession.close();
//        BulkRequest bulkRequest = new BulkRequest();
//        for (Phone discuss : phoneList){
//            bulkRequest.add(new IndexRequest("nazi03")
//                    .source(JSON.toJSONString(discuss), XContentType.JSON));
//        }
//        BulkResponse bulk = restHighLevelClient.bulk(bulkRequest, RequestOptions.DEFAULT);
//    }
////
//    @Test
//    void delete() throws IOException {
//        DeleteRequest deleteRequest = new DeleteRequest("dream-fly-discuss", "1");
//        restHighLevelClient.delete(deleteRequest, RequestOptions.DEFAULT);
//    }
//    @Autowired
//    RabbitTemplate rabbitTemplate;
//    @Test
//    void helloWorld(){
//        rabbitTemplate.convertAndSend("seckill", "hello world");
//    }
//


}
