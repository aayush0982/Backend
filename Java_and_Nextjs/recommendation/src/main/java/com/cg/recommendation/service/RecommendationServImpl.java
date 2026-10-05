package com.cg.recommendation.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cg.recommendation.entity.RecommendationEntity;
import com.cg.recommendation.modal.Product;

@Service 
public class RecommendationServImpl implements RecommendationService {

    private final RestTemplate restTemplate;

    public RecommendationServImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<RecommendationEntity> getRecommendationByCategory(String categoryName) {
        String categoryUrl = "http://localhost:8086/category/productsCategoryWise"
                + "?categoryName=" + categoryName;

        Product[] products = restTemplate.getForObject(
                categoryUrl,
                Product[].class);

        List<RecommendationEntity> result = new ArrayList<>();

        if (products != null) {

            for (Product p : products) {

                RecommendationEntity recommendation = new RecommendationEntity();

                recommendation.setProductId(p.getProductId());
                recommendation.setProductName(p.getProductName());
                recommendation.setProductPrice(p.getProductPrice());

                result.add(recommendation);
            }
        }

        return result;
    }

}
