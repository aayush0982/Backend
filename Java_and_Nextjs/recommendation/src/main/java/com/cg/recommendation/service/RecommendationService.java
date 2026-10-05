package com.cg.recommendation.service;

import java.util.List;

import com.cg.recommendation.entity.RecommendationEntity;

public interface RecommendationService {
    public List<RecommendationEntity> getRecommendationByCategory(String categoryName);
}
