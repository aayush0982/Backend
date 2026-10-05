package com.cg.productcatalogue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@EnableDiscoveryClient 
@SpringBootApplication
public class ProductcatalogueApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductcatalogueApplication.class, args);
		System.out.println("Product Catalogue Application is running on port 8087");
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
