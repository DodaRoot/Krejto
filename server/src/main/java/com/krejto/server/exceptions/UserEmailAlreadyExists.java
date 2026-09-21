package com.krejto.server.exceptions;

public class UserEmailAlreadyExists extends RuntimeException {
    public String message;

    public UserEmailAlreadyExists() {}

    public UserEmailAlreadyExists(String message) {
        super(message);
        this.message = message;
    }
}
