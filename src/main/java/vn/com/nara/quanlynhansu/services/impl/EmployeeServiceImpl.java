package vn.com.nara.quanlynhansu.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
	public Page<Employee> findAll(int pageIdx, int pageSize, String propertieSort, boolean typeSort) {
		if (!"firstName".equals(propertieSort) && !"age".equals(propertieSort) && "sex".equals(propertieSort)
				&& "email".equals(propertieSort)) {
			return this.employeeRepository.findAll(PageRequest.of(pageIdx, pageSize));
		}
		if (typeSort == true) {
			return this.employeeRepository
					.findAll(PageRequest.of(pageIdx, pageSize, Sort.by(propertieSort).ascending()));
		}
		return this.employeeRepository.findAll(PageRequest.of(pageIdx, pageSize, Sort.by(propertieSort).descending()));

	}

	@Override
	public Employee findById(String id) {
		return this.employeeRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employee with id = " + id + " not found!"));
	}

	@Override
	public Employee create(Employee employee) {
		return this.employeeRepository.save(employee);
	}

	@Override
	public Employee update(String id, Employee employee) {
		return this.employeeRepository.save(employee);
	}

	@Override
	public void delete(String id) {
		this.employeeRepository.deleteById(id);
	}

	@Override
	public Page<Employee> findByLasrNameLike(int pageIdx, int pageSize, String lastName) {
//		return this.employeeRepository.findByLastName(pageIdx, pageSize, lastName);
		return null;
	}

}
