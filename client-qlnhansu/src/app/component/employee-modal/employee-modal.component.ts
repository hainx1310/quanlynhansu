import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/Employee';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  private form: FormGroup;
  private isCreatedOrUpdateSucess = false;
  private validFirstName = true;
  private validLastName = true;
  private validAge = true;
  private validSex = true;
  private validEmail = true;
  private msgValidFirstName;
  private msgValidLastName;
  private msgValidAge;
  private msgValidSex;
  private msgValidEmail;
  private isUpdate = false;
  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(EmployeeService) private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    if (this.data.employee) {
      this.isUpdate = true;
    }
    this.form = this.formBuilder.group({
      firstName: [this.data.employee ? this.data.employee.firstName : '', Validators.required],
      lastName: [this.data.employee ? this.data.employee.lastName : '', Validators.required],
      age: [this.data.employee ? this.data.employee.age : ''],
      sex: [this.data.employee ? this.data.employee.sex : ''],
      email: [this.data.employee ? this.data.employee.email : '', Validators.required]
    });
  }

  submit(): void {
    if (this.isUpdate == false) {
      this.saveEmployee(this.form.value);
    } else {
      this.updateEmployee(this.data.employee.id, this.form.value);
    }
  }

  onNoClick(): void {
    this.isCreatedOrUpdateSucess = false;
    this.dialogRef.close({ isCreatedOrUpdateSucess: this.isCreatedOrUpdateSucess });
  }

  saveEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe(response => {
      if (response) {
        this.isCreatedOrUpdateSucess = true;
        this.dialogRef.close({ isCreatedOrUpdateSucess: this.isCreatedOrUpdateSucess });
      }
    }, error => {
      if (error.error.lastName) {
        this.validLastName = false;
        this.msgValidLastName = error.error.lastName;

      }
      if (error.error.firstName) {
        this.validFirstName = false;
        this.msgValidFirstName = error.error.firstName;
      }
      if (error.error.email) {
        this.validEmail = false;
        this.msgValidEmail = error.error.email;

      }
      if (error.error.sex) {
        this.validSex = false;
        this.msgValidSex = error.error.sex;
      }
      if (error.error.age) {
        this.validAge = false;
        this.msgValidAge = error.error.age;
      }
    })
  }

  updateEmployee(id: string, employee: Employee) {
    this.employeeService.updateEmployee(id, employee).subscribe(response => {
      if (response) {
        this.isCreatedOrUpdateSucess = true;
        this.dialogRef.close({ isCreatedOrUpdateSucess: this.isCreatedOrUpdateSucess });
      }
    }, error => {
      if (error.error.lastName) {
        this.validLastName = false;
        this.msgValidLastName = error.error.lastName;
      }
      if (error.error.firstName) {
        this.validFirstName = false;
        this.msgValidFirstName = error.error.firstName;
      }
      if (error.error.email) {
        this.validEmail = false;
        this.msgValidEmail = error.error.email;
      }
      if (error.error.sex) {
        this.validSex = false;
        this.msgValidSex = error.error.sex;
      }
      if (error.error.age) {
        this.validAge = false;
        this.msgValidAge = error.error.age;
      }
    })
  }
}