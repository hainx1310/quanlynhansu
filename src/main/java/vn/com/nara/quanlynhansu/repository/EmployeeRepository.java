package vn.com.nara.quanlynhansu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.com.nara.quanlynhansu.entity.Employee;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

	/**
	 * Find by last name like
	 * 
	 * @param pageIdx
	 * @param pageSize
	 * @param lastName
	 * @return
	 */
//	@Query("{ 'lastName' : ?0 }")
//	Page<Employee> findByLastName(int pageIdx, int pageSize, String lastName);
}
