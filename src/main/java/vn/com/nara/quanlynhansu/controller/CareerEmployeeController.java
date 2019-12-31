package vn.com.nara.quanlynhansu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.com.nara.quanlynhansu.entity.Career;
import vn.com.nara.quanlynhansu.entity.Employee;
import vn.com.nara.quanlynhansu.services.CareerService;
import vn.com.nara.quanlynhansu.services.EmployeeService;

import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/careerEmployee")
public class CareerEmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private CareerService careerService;

    @PostMapping("/addEmployees/{careerId}/{employeeIds}")
    private ResponseEntity<Career> addEmployeeForCareer(@PathVariable("careerId") String careerId, @PathVariable("employeeIds") String[] employeeIds) {

        Career career = careerService.findById(careerId); // throw ex neu id ko ton tai
        List<Employee> listEmployee = new ArrayList<Employee>();
        List<Employee> listEmployeeCurrent = career.getEmployeeIds();
        Employee employee;
        boolean employeeExist;
        for (String employeeId : employeeIds) {
            employeeExist = false;
            employee = employeeService.findById(employeeId); // throw ex neu id ko ton tai
            if (listEmployeeCurrent != null && listEmployeeCurrent.size() > 0) {
                for (Employee emp : listEmployeeCurrent) {
                    if (emp.getId().equals(employee.getId())) {
                        employeeExist = true;
                        break;
                    }
                }
            }

            if (!employeeExist) {
                listEmployee.add(employee);
            }
        }

        if (career.getEmployeeIds() != null) {
            career.getEmployeeIds().addAll(listEmployee);
        } else {
            career.setEmployeeIds(listEmployee);
        }

        Career result = careerService.update(career);
        if (result != null) {
            // insert career to list employee
            for (Employee emp : listEmployee) {
                if (emp.getCarrerIds() != null) {
                    emp.getCarrerIds().add(career);
                } else {
                    emp.setCarrerIds(Arrays.asList(career));
                }
                employeeService.update(emp.getId(), emp);
            }
        }

        return ResponseEntity.ok(result);
    }

    boolean abc() {
        System.out.println("aaaa");
        return true;
    }


    @PostMapping("/deleteEmployees/{careerId}/{employeeIds}")
    private ResponseEntity<Career> deleteEmployeeCareer(@PathVariable("careerId") String careerId, @PathVariable("employeeIds") String[] employeeIds) {

        Career career = this.careerService.findById(careerId);
        List<Employee> listEmployeeCurrent = career.getEmployeeIds();
        List<Employee> listEmployees = new ArrayList<Employee>();
        Employee employee;
        boolean employeeExists;
        for (String employeeId : employeeIds) {
            employee = this.employeeService.findById(employeeId);
            employeeExists = false;
            for (Employee empCurrent : listEmployeeCurrent) {
                if (empCurrent.getId().equals(employee.getId())) {
                    employeeExists = true;
                    break;
                }
            }
            if (!employeeExists) {
                listEmployees.add(employee);
            }
        }
        career.getEmployeeIds().removeAll(listEmployees);
        return ResponseEntity.ok(careerService.update(career));
    }

    /**
     * API find all employee add to career
     *
     * @return
     */
    @GetMapping(value = "getListEmployeeToCareer")
    public ResponseEntity<Page<Employee>> findAllEmployeeAddToCareer(@RequestParam("careerId") String careerId, @RequestParam(value = "page", defaultValue = "0") int pageIdx,
                                                  @RequestParam(value = "size", defaultValue = "5") int pageSize,
                                                  @RequestParam(value = "propertieSort", defaultValue = "null") String propertieSort,
                                                  @RequestParam(value = "typeSort", defaultValue = "true") String typeSort) {
        Career career = this.careerService.findById(careerId);
        List<Career> careerIds = new ArrayList<Career>();
        careerIds.add(career);
        boolean boolTypeSort = "true".equals(typeSort) ? true : false;
        return ResponseEntity.ok(this.employeeService.findEmployeesByCarrerIdsNotIn(pageIdx, pageSize, propertieSort, boolTypeSort, careerIds));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<Page<Employee>> findAll(@RequestParam("keywords") String keywords,
                                                  @RequestParam(value = "page", defaultValue = "0") int pageIdx,
                                                  @RequestParam(value = "size", defaultValue = "5") int pageSize,
                                                  @RequestParam(value = "careerId") String careerId) {
        Career career = this.careerService.findById(careerId);
        List<Career> careers = Arrays.asList(career);
        if (keywords != null) {
            keywords = keywords.trim();
        }
        return ResponseEntity.ok(this.employeeService.findByFirstNameLikeAndCareerNotIn(pageIdx, pageSize, keywords, careers));
    }

    @GetMapping(value = "getListEmployeeByCareerId")
    public ResponseEntity<Page<Employee>> findEmployeeByCareerIds(@RequestParam("careerId") String careerId, @RequestParam(value = "page", defaultValue = "0") int pageIdx,
                                                                     @RequestParam(value = "size", defaultValue = "5") int pageSize,
                                                                     @RequestParam(value = "propertieSort", defaultValue = "null") String propertieSort,
                                                                     @RequestParam(value = "typeSort", defaultValue = "true") String typeSort) {
        Career career = this.careerService.findById(careerId);
        List<Career> careerIds = new ArrayList<Career>();
        careerIds.add(career);
        boolean boolTypeSort = "true".equals(typeSort) ? true : false;
        return ResponseEntity.ok(this.employeeService.findEmployeeByCareerIds(pageIdx, pageSize, propertieSort, boolTypeSort, careerIds));
    }

    @GetMapping(value = "/search1")
    public ResponseEntity<Page<Employee>> searchEmployeeByCareerIds(@RequestParam("keywords") String keywords,
                                                  @RequestParam(value = "page", defaultValue = "0") int pageIdx,
                                                  @RequestParam(value = "size", defaultValue = "5") int pageSize,
                                                  @RequestParam(value = "careerId") String careerId) {
        Career career = this.careerService.findById(careerId);
        List<Career> careers = Arrays.asList(career);
        if (keywords != null) {
            keywords = keywords.trim();
        }
        return ResponseEntity.ok(this.employeeService.findByFirstNameLikeAndCareerNotIn(pageIdx, pageSize, keywords, careers));
    }
}
