package com.krejto.server.exceptions;

public class RoleNotFound extends RuntimeException {
    public final String message;
    public RoleNotFound(String message) {
        this.message = message;
        super(message);
    }
}
