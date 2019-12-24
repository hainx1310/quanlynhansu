package vn.com.nara.quanlynhansu.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.com.nara.quanlynhansu.entity.Employee;
import vn.com.nara.quanlynhansu.services.EmployeeService;

@CrossOrigin(origins = "http://localhost:4200")
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
	public ResponseEntity<Page<Employee>> findAll(@RequestParam(value = "page", defaultValue = "0") int pageIdx,
			@RequestParam(value = "size", defaultValue = "5") int pageSize,
			@RequestParam(value = "propertieSort", defaultValue = "null") String propertieSort,
			@RequestParam(value = "typeSort", defaultValue = "true") String typeSort) {
		boolean boolTypeSort = "true".equals(typeSort) ? true : false;
		return ResponseEntity.ok(this.employeeService.findAll(pageIdx, pageSize, propertieSort, boolTypeSort));
	}

	/**
	 * API find employee by id
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping(value = "/{id}")
	public ResponseEntity<Employee> findById(@PathVariable("id") String id) {
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
	public ResponseEntity<Employee> update(@PathVariable("id") String id, @Valid @RequestBody Employee employee) {

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
	public ResponseEntity<Object> deleteEmployeeById(@PathVariable("id") String id) {

		// check exists
		this.employeeService.findById(id);
		// delete
		this.employeeService.delete(id);

		return new ResponseEntity<Object>("xoa thanh cong", HttpStatus.OK);
	}

	@GetMapping(value = "/search")
	public ResponseEntity<Page<Employee>> findAll(@RequestParam(value = "page", defaultValue = "0") int pageIdx,
			@RequestParam(value = "size", defaultValue = "5") int pageSize, @RequestParam("keyworks") String keywork) {
		if (keywork != null) {
			keywork = keywork.trim();
		}
		return ResponseEntity.ok(this.employeeService.findByLasrNameLike(pageIdx, pageSize, keywork));
	}
}
