package vn.com.nara.quanlynhansu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vn.com.nara.quanlynhansu.entity.Career;

@Repository
public interface CareerRepository extends MongoRepository<Career, String> {

    Page<Career> findCareerByNameLike(String name, Pageable pageable);
}
