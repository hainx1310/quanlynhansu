package vn.com.nara.quanlynhansu.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;

import vn.com.nara.quanlynhansu.common.CommonConst;

public class ResponseException {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = CommonConst.DATE_TIME_FORMAT)
	private LocalDateTime timestamp;
	private HttpStatus status;
	private String message;

	public ResponseException(Throwable notFoundEx, HttpStatus status) {
		super();
		this.status = status;
		this.message = notFoundEx.getMessage();
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ResponseException() {
		this.timestamp = LocalDateTime.now();
	}

	public ResponseException(HttpStatus status) {
		this();
		this.status = status;
	}
}
