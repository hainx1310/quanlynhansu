package vn.com.nara.quanlynhansu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.com.nara.quanlynhansu.entity.Employee;

import javax.validation.constraints.NotNull;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

	Page<Employee> findEmployeeByFirstNameLike(String firstName, Pageable pageable);
}
