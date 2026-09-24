package com.krejto.server.exceptions;

public class LocationsOrTypesNonExistent extends RuntimeException {
    public final String message;

    public LocationsOrTypesNonExistent(String message) {
        this.message = message;
        super(message);
    }
}
