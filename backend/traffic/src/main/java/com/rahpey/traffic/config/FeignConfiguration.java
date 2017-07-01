package com.rahpey.traffic.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.rahpey.traffic")
public class FeignConfiguration {

}
