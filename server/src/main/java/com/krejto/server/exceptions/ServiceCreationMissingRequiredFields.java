package com.krejto.server.exceptions;

public class ServiceCreationMissingRequiredFields extends RuntimeException {
    public String message;

    public ServiceCreationMissingRequiredFields() {}

    public ServiceCreationMissingRequiredFields(String message) {
        super(message);
        this.message = message;
    }
}
