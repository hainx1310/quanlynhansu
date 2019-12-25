package vn.com.nara.quanlynhansu.services;

import org.springframework.data.domain.Page;

import vn.com.nara.quanlynhansu.entity.Employee;

public interface EmployeeService {

	/**
	 * Find all employee
	 * 
	 * @return
	 */
	Page<Employee> findAll(int pageIdx, int pageSize, String propertieSort, boolean typeSort);

	/**
	 * Search like last name
	 * 
	 * @param pageIdx
	 * @param pageSize
	 * @param lastName
	 * @return
	 */
	Page<Employee> findByFirstNameLike(int pageIdx, int pageSize, String lastName);

	/**
	 * Find employee by id
	 * 
	 * @param id
	 * @return
	 */
	Employee findById(String id);

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
	Employee update(String id, Employee employee);

	/**
	 * Delete employee
	 * 
	 * @param id
	 */
	void delete(String id);
}
