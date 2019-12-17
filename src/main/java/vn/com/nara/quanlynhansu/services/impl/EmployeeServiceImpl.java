package vn.com.nara.quanlynhansu.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.com.nara.quanlynhansu.entity.Employee;
import vn.com.nara.quanlynhansu.exception.EntityNotFoundException;
import vn.com.nara.quanlynhansu.repository.EmployeeRepository;
import vn.com.nara.quanlynhansu.services.EmployeeService;

@Service
@Configurable
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public List<Employee> findAll() {
		return this.employeeRepository.findAll();
	}

	@Override
	public Employee findById(int id) {
		return this.employeeRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employee with id = " + id + " not found!"));
	}

	@Override
	public Employee create(Employee employee) {
		return this.employeeRepository.save(employee);
	}

	@Override
	public Employee update(int id, Employee employee) {
		return this.employeeRepository.save(employee);
	}

	@Override
	public void delete(int id) {
		this.employeeRepository.deleteById(id);
	}

}
