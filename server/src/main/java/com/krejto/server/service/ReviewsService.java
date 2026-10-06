package com.krejto.server.service;

import com.krejto.server.exceptions.ReviewsNotFound;
import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.model.dto.ReviewsDTO;
import com.krejto.server.model.dto.UserDTO;
import com.krejto.server.model.entity.Review;
import com.krejto.server.model.entity.User;
import com.krejto.server.repository.ReviewsRepository;
import com.krejto.server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewsService {
    private final ReviewsRepository reviewsRepository;
    private final UserRepository userRepository;

    public ReviewsService(ReviewsRepository reviewsRepository, UserRepository userRepository) {
        this.reviewsRepository = reviewsRepository;
        this.userRepository = userRepository;
    }

    public List<ReviewsDTO.GetSiteReview> getSiteReviews() {
        List<Review> reviews = reviewsRepository.findAll();
        if (reviews.isEmpty()) {
            throw new ReviewsNotFound("No reviews found");
        }
        List<ReviewsDTO.GetSiteReview> reviewsDTOList = new ArrayList<>();

        reviews.forEach(review -> {
            UserDTO.GetUserResponse getUserResponse = new UserDTO.GetUserResponse(review.getUser().getId(), review.getUser().getFullName(), review.getUser().getEmail(), review.getUser().getPhoneNumber(), review.getUser().getCreatedAt());
            reviewsDTOList.add(new ReviewsDTO.GetSiteReview(review.getId(), getUserResponse, review.getComment(), review.getStars()));
        });

        return reviewsDTOList;
    }

    public ReviewsDTO.GetSiteReview postSiteReview(ReviewsDTO.PostSiteReview postSiteReview, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow(() -> new UserNotFound("User not found"));

        if (reviewsRepository.findByUser(user).isPresent()) {
            throw new ReviewsNotFound("This user has already left a review");
        }

        Review review = new Review(user, postSiteReview.rating(), postSiteReview.reviewMessage());
        reviewsRepository.save(review);

        UserDTO.GetUserResponse getUserResponse = new UserDTO.GetUserResponse(review.getUser().getId(), review.getUser().getFullName(), review.getUser().getEmail(), review.getUser().getPhoneNumber(), review.getUser().getCreatedAt());

        return new ReviewsDTO.GetSiteReview(review.getId(), getUserResponse, review.getComment(), review.getStars());
    }
}
