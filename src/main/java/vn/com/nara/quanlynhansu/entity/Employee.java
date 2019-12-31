package vn.com.nara.quanlynhansu.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.security.Timestamp;
import java.util.List;

@Document("employee")
public class Employee {

    @Id
    private String id;
    @NotBlank(message = "First name not blank!")
    private String firstName;
    @NotBlank(message = "Last name not blank!")
    private String lastName;
    private int age;
    @NotBlank(message = "Email not blank!")
    private String email;
    @NotBlank(message = "Sex not blank!")
    private String sex;
    private Timestamp dateOfBirth;
    @DBRef(lazy = true)
    @JsonIgnore
    private List<Career> carrerIds;

    public Employee() {

    }

    public Employee(String id, @NotBlank(message = "First name not blank!") String firstName, @NotBlank(message = "Last name not blank!") String lastName, int age, @NotBlank(message = "Email not blank!") String email, @NotBlank(message = "Sex not blank!") String sex, Timestamp dateOfBirth, List<Career> carrerIds) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.carrerIds = carrerIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Timestamp getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Timestamp dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<Career> getCarrerIds() {
        return carrerIds;
    }

    public void setCarrerIds(List<Career> carrerIds) {
        this.carrerIds = carrerIds;
    }
}
