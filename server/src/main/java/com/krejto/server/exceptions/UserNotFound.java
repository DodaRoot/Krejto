package com.krejto.server.exceptions;

public class UserNotFound extends RuntimeException {
    public String message;

    public UserNotFound() {}

    public UserNotFound(String message) {
        super(message);
        this.message = message;
    }
}
