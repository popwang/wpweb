package com.environment.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * 类描述：配置swagger2信息   创建时间：2017年7月28日 上午10:03:29
 * 
 * @version 1.0
 */
@Configuration // 让Spring来加载该类配置
//@EnableWebMvc 启用Mvc，非springboot框架需要引入注解@EnableWebMvc
@EnableSwagger2 // 启用Swagger2
public class Swagger2Config {
	@Bean
	public Docket createRestApi() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
				// 扫描指定包中的swagger注解
				// .apis(RequestHandlerSelectors.basePackage("com.xia.controller"))
				// //扫描所有有注解的api，用这种方式更灵活
				.apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class)).paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("test")
				.description("test")
				.termsOfServiceUrl("http://xiachengwei5.coding.me").contact("nc").version("1.0.0").build();
	}
}
