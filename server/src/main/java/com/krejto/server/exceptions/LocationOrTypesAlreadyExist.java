package com.krejto.server.exceptions;

public class LocationOrTypesAlreadyExist extends RuntimeException {
    public final String message;
    public LocationOrTypesAlreadyExist(String message) {
        this.message = message;
        super(message);
    }
}
