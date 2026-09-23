package com.krejto.server.exceptions;

public class UserServiceExists extends RuntimeException {
    public String message;

    public UserServiceExists() {}

    public UserServiceExists(String message) {
        super(message);
        this.message = message;
    }
}
