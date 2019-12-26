package vn.com.nara.quanlynhansu.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.com.nara.quanlynhansu.entity.Career;
import vn.com.nara.quanlynhansu.exception.EntityNotFoundException;
import vn.com.nara.quanlynhansu.repository.CareerRepository;
import vn.com.nara.quanlynhansu.services.CareerService;

@Service
public class CareerServiceImpl implements CareerService {

    @Autowired
    private CareerRepository careerRepository;

    @Override
    public Page<Career> findAll(int pageIdx, int pageSize, String propertieSort, boolean typeSort) {
        if (!"name".equals(propertieSort)) {
            return this.careerRepository.findAll(PageRequest.of(pageIdx, pageSize));
        }
        if (typeSort == true) {
            return this.careerRepository
                    .findAll(PageRequest.of(pageIdx, pageSize, Sort.by(propertieSort).ascending()));
        }
        return this.careerRepository.findAll(PageRequest.of(pageIdx, pageSize, Sort.by(propertieSort).descending()));
    }

    @Override
    public Page<Career> findByNameLike(int pageIdx, int pageSize, String lastName) {
        return this.careerRepository.findCareerByNameLike(lastName, PageRequest.of(pageIdx, pageSize));
    }

    @Override
    public Career findById(String id) {
        return this.careerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Career with id = %s not found!", id)));
    }

    @Override
    public Career create(Career career) {
        return this.careerRepository.save(career);
    }

    @Override
    public Career update(Career career) {
        return this.careerRepository.save(career);
    }

    @Override
    public void delete(String id) {
        this.careerRepository.deleteById(id);
    }
}
