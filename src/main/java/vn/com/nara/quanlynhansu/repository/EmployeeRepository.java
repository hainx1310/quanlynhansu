package vn.com.nara.quanlynhansu.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.com.nara.quanlynhansu.entity.Employee;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Integer> {

}
