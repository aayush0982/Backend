package com.cg.recommendation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.recommendation.entity.RecommendationEntity;
import com.cg.recommendation.service.RecommendationServImpl;

@RestController
@RequestMapping("/recommendation")
public class RecommendationController {

    private final RecommendationServImpl recommendationService;

    public RecommendationController(RecommendationServImpl recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/getRecommendationByCategory")
    public ResponseEntity<List<RecommendationEntity>> getRecommendationByCategory(
            @RequestParam String categoryName) {
        return ResponseEntity.ok(recommendationService.getRecommendationByCategory(categoryName));
    }

}
