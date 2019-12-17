package vn.com.nara.quanlynhansu.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.com.nara.quanlynhansu.entity.Employee;
import vn.com.nara.quanlynhansu.services.EmployeeService;

@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	/**
	 * API find all employee
	 * 
	 * @return
	 */
	@GetMapping(value = "")
	public ResponseEntity<List<Employee>> findAll() {
		return ResponseEntity.ok(this.employeeService.findAll());
	}

	/**
	 * API find employee by id
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/{id}")
	public ResponseEntity<Employee> findById(@PathVariable("id") int id) {
		return ResponseEntity.ok(this.employeeService.findById(id));
	}

	/**
	 * API create a new employee
	 * 
	 * @param employee
	 * @return
	 */
	@PostMapping(value = "")
	public ResponseEntity<Employee> create(@Valid @RequestBody Employee employee) {
		return ResponseEntity.ok(this.employeeService.create(employee));
	}

	/**
	 * API update employee
	 * 
	 * @param id
	 * @param employee
	 * @return
	 */
	@PutMapping(value = "/{id}")
	public ResponseEntity<Employee> update(@PathVariable("id") int id, @Valid @RequestBody Employee employee) {

		// check employee exists
		Employee employeeFromDB = this.employeeService.findById(id);

		// update
		employeeFromDB.setFirstName(employee.getFirstName());
		employeeFromDB.setLastName(employee.getLastName());
		employeeFromDB.setEmail(employee.getEmail());
		employeeFromDB.setDateOfBirth(employee.getDateOfBirth());
		employeeFromDB.setSex(employee.getSex());

		// save to db
		return ResponseEntity.ok(this.employeeService.update(id, employeeFromDB));
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<?> deleteEmployeeById(@PathVariable("id") int id) {

		// check exists
		this.employeeService.findById(id);
		// delete
		this.employeeService.delete(id);

		return ResponseEntity.ok().build();
	}
}
