package com.krejto.server.exceptions;

public class ServiceNotFound extends RuntimeException {
    public final String message;
    public ServiceNotFound(String message) {
        this.message = message;
        super(message);
    }
}
