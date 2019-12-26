package vn.com.nara.quanlynhansu.services;

import org.springframework.data.domain.Page;
import vn.com.nara.quanlynhansu.entity.Career;

public interface CareerService {
    /**
     * Find all Career
     *
     * @return
     */
    Page<Career> findAll(int pageIdx, int pageSize, String propertieSort, boolean typeSort);

    /**
     * Search like name
     *
     * @param pageIdx
     * @param pageSize
     * @param lastName
     * @return
     */
    Page<Career> findByNameLike(int pageIdx, int pageSize, String lastName);

    /**
     * Find Career by id
     *
     * @param id
     * @return
     */
    Career findById(String id);

    /**
     * Add a new Career
     *
     * @param career
     * @return
     */
    Career create(Career career);

    /**
     * Update Career
     *
     * @param career
     * @return
     */
    Career update(Career career);

    /**
     * Delete career
     *
     * @param id
     */
    void delete(String id);
}
