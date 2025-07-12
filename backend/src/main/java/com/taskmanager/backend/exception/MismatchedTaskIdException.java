package com.taskmanager.backend.exception;

public class MismatchedTaskIdException extends RuntimeException {
    public MismatchedTaskIdException(String message) {
        super(message);
    }
}
