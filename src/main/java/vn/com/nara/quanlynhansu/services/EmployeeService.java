package vn.com.nara.quanlynhansu.services;

import java.util.List;

import vn.com.nara.quanlynhansu.entity.Employee;

public interface EmployeeService {

	/**
	 * Find all employee
	 * 
	 * @return
	 */
	List<Employee> findAll();

	/**
	 * Find employee by id
	 * 
	 * @param id
	 * @return
	 */
	Employee findById(int id);

	/**
	 * Add a new employee
	 * 
	 * @param employee
	 * @return
	 */
	Employee create(Employee employee);

	/**
	 * Update employee
	 * 
	 * @param id
	 * @param employee
	 * @return
	 */
	Employee update(int id, Employee employee);

	/**
	 * Delete employee
	 * 
	 * @param id
	 */
	void delete(int id);
}
