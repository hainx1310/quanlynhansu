import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-modal-confirm-delete',
  templateUrl: './employee-modal-confirm-delete.component.html',
  styleUrls: ['./employee-modal-confirm-delete.component.css']
})
export class EmployeeModalConfirmDeleteComponent {

  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
  ) { }

  submit(): void {
    console.log(this.data);
    this.dialogRef.close({ isDelete: true });
  }

  cancel(): void {
    this.dialogRef.close({ isDelete: false });
  }
}
