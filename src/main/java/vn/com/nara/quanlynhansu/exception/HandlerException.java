package vn.com.nara.quanlynhansu.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HandlerException {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<Object> handleNotFoundException(EntityNotFoundException ex) {
		return builResponseException(new ResponseException(ex, HttpStatus.NOT_FOUND));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<Object> builResponseException(ResponseException re) {
		return new ResponseEntity<>(re, re.getStatus());
	}
}
