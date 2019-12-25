package vn.com.nara.quanlynhansu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.com.nara.quanlynhansu.entity.Career;
import vn.com.nara.quanlynhansu.services.CareerService;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "career")
public class CareerController {

    @Autowired
    private CareerService careerService;

    @GetMapping(value = "")
    private ResponseEntity<Page<Career>> findAll(@RequestParam(value = "page", defaultValue = "0") int pageIdx,
                                                 @RequestParam(value = "size", defaultValue = "5") int pageSize,
                                                 @RequestParam(value = "propertieSort", defaultValue = "null") String propertieSort,
                                                 @RequestParam(value = "typeSort", defaultValue = "true") String typeSort) {
        boolean boolTypeSort = "true".equals(typeSort) ? true : false;
        return ResponseEntity.ok(careerService.findAll(pageIdx, pageSize, propertieSort, boolTypeSort));
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<Career> findById(@PathVariable("id") String id) {
        return ResponseEntity.ok(this.careerService.findById(id));
    }

    @PostMapping("")
    private ResponseEntity<Career> cretae(@Valid @RequestBody Career career) {
        return ResponseEntity.ok(this.careerService.create(career));
    }

    @PutMapping(value = "/{id}")
    private ResponseEntity<Career> update(@PathVariable("id") String id, @Valid @RequestBody Career career) {
        Career careerFromDB = this.careerService.findById(id);
        careerFromDB.setName(career.getName());
        return ResponseEntity.ok(this.careerService.update(id, career));
    }

    @DeleteMapping(value = "/{id}")
    private ResponseEntity<Object> delete(@PathVariable("id") String id) {
        this.careerService.findById(id);
        this.careerService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/search")
    public ResponseEntity<Page<Career>> findAll(@RequestParam("keywords") String keywords,
                                                  @RequestParam(value = "page", defaultValue = "0") int pageIdx,
                                                  @RequestParam(value = "size", defaultValue = "5") int pageSize) {
        if (keywords != null) {
            keywords = keywords.trim();
        }
        return ResponseEntity.ok(this.careerService.findByNameLike(pageIdx, pageSize, keywords));
    }
}
