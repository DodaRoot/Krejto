package com.krejto.server.exceptions;

public class RoleNotFound extends RuntimeException {
  public RoleNotFound(String message) {
    super(message);
  }
}
