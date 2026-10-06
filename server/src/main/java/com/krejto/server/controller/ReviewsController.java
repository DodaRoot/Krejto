package com.krejto.server.controller;

import com.krejto.server.model.dto.ReviewsDTO;
import com.krejto.server.service.ReviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v1/reviews")
public class ReviewsController {
    private final ReviewsService reviewsService;

    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @GetMapping("getSiteReviews")
    public ResponseEntity<List<ReviewsDTO.GetSiteReview>> getAllReviews() {
        List<ReviewsDTO.GetSiteReview> getSiteReviews = reviewsService.getSiteReviews();

        return ResponseEntity.ok().body(getSiteReviews);
    }

    @PostMapping("addSiteReview")
    public ResponseEntity<ReviewsDTO.GetSiteReview> addSiteReview(@RequestBody ReviewsDTO.PostSiteReview postSiteReview, Principal principal) {
        ReviewsDTO.GetSiteReview getSiteReview = reviewsService.postSiteReview(postSiteReview, principal);
        return ResponseEntity.ok().body(getSiteReview);
    }
}
