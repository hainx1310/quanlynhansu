import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
  ) { }

  ngOnInit(): void {
    // this.form = new FormGroup({
    //   'firstName': new FormControl(this.data.firstName, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   'lastName': new FormControl(this.data.lastName, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   'age': new FormControl(this.data.age),
    //   'sex': new FormControl(this.data.sex),
    //   'email': new FormControl(this.data.email),
    // });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}