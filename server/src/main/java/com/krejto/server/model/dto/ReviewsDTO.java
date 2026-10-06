package com.krejto.server.model.dto;

import java.util.UUID;

public class ReviewsDTO {
    public record GetSiteReview(UUID reviewId, UserDTO.GetUserResponse userDTO, String reviewMessage, int rating) {}
    public record PostSiteReview(String reviewMessage, int rating) {}

}
