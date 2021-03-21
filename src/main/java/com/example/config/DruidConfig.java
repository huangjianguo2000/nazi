package com.example.config;


import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

//@Configuration
public class DruidConfig {

//    @ConfigurationProperties(prefix = "spring.datasource")
//    @Bean
//    public DataSource dataSource() {
//        return new DruidDataSource();
//    }
//
//    //后台监控
//    @Bean
//    public ServletRegistrationBean statViewServlet() {
//        ServletRegistrationBean<StatViewServlet> bean = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
//
//        //账号密码管理
//        HashMap<String, String> initParameters = new HashMap<>();
//        //增加配置
//        initParameters.put("loginUsername", "admin");
//        initParameters.put("loginPassword", "123456");
//
////        //允许谁可以访问
////        initParameters.put("allow", "");
////        //静止谁能访问
////        initParameters.put("kuang", "");
//
//
//        bean.setInitParameters(initParameters);
//        return bean;
//    }
//
//    public FilterRegistrationBean webSatFilter() {
//        FilterRegistrationBean bean = new FilterRegistrationBean();
//        bean.setFilter(new WebStatFilter());
//
//        //可以过滤哪些请求
//        Map<String, String> initParameters = new HashMap<>();
//
//        //这些东邪不进行统计
//        initParameters.put("exclusions", "*.js, *.css, /druid/*");
//        bean.setInitParameters(initParameters);
//        return bean;
//    }

}
