package com.krejto.server.service;

import com.krejto.server.exceptions.ReviewsNotFound;
import com.krejto.server.exceptions.UserNotFound;
import com.krejto.server.model.dto.ReviewsDTO;
import com.krejto.server.model.entity.Role;
import com.krejto.server.model.entity.SiteReview;
import com.krejto.server.model.entity.User;
import com.krejto.server.repository.ReviewsRepository;
import com.krejto.server.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SiteReviewsServiceTests {
    @Mock
    private ReviewsRepository reviewsRepository;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private SiteReviewsService service;

    @Test
    void getSiteReviewsThrowsWhenThereAreNoReviews() {
        when(reviewsRepository.findAll()).thenReturn(List.of());

        assertThrows(ReviewsNotFound.class, service::getSiteReviews);
    }

    @Test
    void postSiteReviewSavesReviewForAuthenticatedUser() {
        User user = new User("Taylor Doe", "taylor@example.com", "hash", "555-0100", new Role("USER"));
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(reviewsRepository.findByUser(user)).thenReturn(Optional.empty());
        ReviewsDTO.PostSiteReview request = new ReviewsDTO.PostSiteReview("Great experience", 5);

        ReviewsDTO.GetSiteReview response = service.postSiteReview(request, () -> user.getEmail());

        ArgumentCaptor<SiteReview> reviewCaptor = ArgumentCaptor.forClass(SiteReview.class);
        verify(reviewsRepository).save(reviewCaptor.capture());
        assertAll(
                () -> assertSame(user, reviewCaptor.getValue().getUser()),
                () -> assertEquals(5, reviewCaptor.getValue().getRating()),
                () -> assertEquals("Great experience", reviewCaptor.getValue().getReview()),
                () -> assertEquals("taylor@example.com", response.userDTO().email()),
                () -> assertEquals("Great experience", response.reviewMessage()),
                () -> assertEquals(5, response.rating())
        );
    }

    @Test
    void postSiteReviewFailsWhenUserDoesNotExist() {
        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> service.postSiteReview(
                new ReviewsDTO.PostSiteReview("Review", 4), () -> "missing@example.com"));

        verifyNoInteractions(reviewsRepository);
    }

    @Test
    void postSiteReviewRejectsSecondReviewFromSameUser() {
        User user = new User("Taylor Doe", "taylor@example.com", "hash", "555-0100", new Role("USER"));
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(reviewsRepository.findByUser(user)).thenReturn(Optional.of(new SiteReview(user, 4, "Existing")));

        assertThrows(ReviewsNotFound.class, () -> service.postSiteReview(
                new ReviewsDTO.PostSiteReview("Another", 5), () -> user.getEmail()));

        verify(reviewsRepository, never()).save(any(SiteReview.class));
    }
}
