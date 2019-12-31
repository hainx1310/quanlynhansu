package vn.com.nara.quanlynhansu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import vn.com.nara.quanlynhansu.entity.Career;
import vn.com.nara.quanlynhansu.entity.Employee;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.List;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

	Page<Employee> findEmployeeByFirstNameLike(String firstName, Pageable pageable);
	Page<Employee> findEmployeeByFirstNameLikeAndCarrerIdsNotIn(String firstName, List<Career> carrerIds, Pageable pageable);
	Page<Employee> findEmployeesByCarrerIdsNotIn(List<Career> carrerIds, Pageable pageable);
	Page<Employee> findEmployeesByCarrerIdsIn(List<Career> carrerIds, Pageable pageable);
}
