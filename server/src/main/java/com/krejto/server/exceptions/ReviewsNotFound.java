package com.krejto.server.exceptions;

public class ReviewsNotFound extends RuntimeException {
    public final String message;
    public ReviewsNotFound(String message) {
        this.message = message;
        super(message);
    }
}
