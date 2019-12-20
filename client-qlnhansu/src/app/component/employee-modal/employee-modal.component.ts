import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.data.employee ? this.data.employee.firstName : '', Validators.required],
      lastName: [this.data.employee ? this.data.employee.lastName : '', Validators.required],
      age: [this.data.employee ? this.data.employee.age : ''],
      sex: [this.data.employee ? this.data.employee.sex : ''],
      email: [this.data.employee ? this.data.employee.email : '', Validators.required]
    });
  }

  submit(): void {
    console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}