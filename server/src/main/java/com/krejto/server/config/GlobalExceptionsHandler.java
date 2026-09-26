package com.krejto.server.config;

import com.krejto.server.exceptions.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionsHandler {
    @ExceptionHandler(value = LocationOrTypesAlreadyExist.class)
    public @ResponseBody ResponseEntity<String> handleLocationOrTypesAlreadyExist(LocationOrTypesAlreadyExist e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = LocationsOrTypesNonExistent.class)
    public @ResponseBody ResponseEntity<String> handleLocationsOrTypesNonExistent(LocationsOrTypesNonExistent e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = RoleNotFound.class)
    public @ResponseBody ResponseEntity<String> handleRoleNotFound(RoleNotFound e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = ServiceNotFound.class)
    public @ResponseBody ResponseEntity<String> handleServiceNotFound(ServiceNotFound e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = UserEmailAlreadyExists.class)
    public @ResponseBody ResponseEntity<String> handleUserEmailAlreadyExists(UserEmailAlreadyExists e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = UserNotFound.class)
    public @ResponseBody ResponseEntity<String> handleUserNotFound(UserNotFound e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = UserServiceExists.class)
    public @ResponseBody ResponseEntity<String> handleUserServiceExists(UserServiceExists e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    public @ResponseBody ResponseEntity<String> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data provided");
    }
}
