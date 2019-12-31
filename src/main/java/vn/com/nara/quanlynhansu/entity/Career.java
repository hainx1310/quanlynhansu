package vn.com.nara.quanlynhansu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Document("career")
public class Career {
    @Id
    private String id;
    @NotBlank(message = "Career name not blank!")
    private String name;
    @DBRef(lazy = true)
    private List<Employee> employeeIds;

    public Career(){

    }

    public Career(String id, String name, List<Employee> employeeIds) {
        this.id = id;
        this.name = name;
        this.employeeIds = employeeIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Employee> getEmployeeIds() {
        return employeeIds;
    }

    public void setEmployeeIds(List<Employee> employeeIds) {
        this.employeeIds = employeeIds;
    }
}
