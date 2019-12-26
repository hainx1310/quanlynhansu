import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CareerService } from 'src/app/services/career.service';
import { Career } from 'src/app/model/Career';

@Component({
  selector: 'app-career-modal',
  templateUrl: './career-modal.component.html',
  styleUrls: ['./career-modal.component.css']
})
export class CareerModalComponent implements OnInit {


  private form: FormGroup;
  private isCreatedOrUpdateSucess = false;
  private validName = true;
  private msgValidName;
  private isUpdate = false;
  constructor(
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<CareerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(CareerService) private careerService: CareerService,
  ) { }

  ngOnInit(): void {
    if (this.data.career) {
      this.isUpdate = true;
    }
    this.form = this.formBuilder.group({
      name: [this.data.career ? this.data.career.name : '', Validators.required]
    });
  }

  submit(): void {
    if (this.isUpdate == false) {
      this.saveCareer(this.form.value);
    } else {
      this.updateCareer(this.data.career.id, this.form.value);
    }
  }

  onNoClick(): void {
    this.isCreatedOrUpdateSucess = false;
    this.dialogRef.close({ isCreatedOrUpdateSucess: this.isCreatedOrUpdateSucess });
  }

  saveCareer(career: Career) {
    this.careerService.createCareer(career).subscribe(response => {
      if (response) {
        this.isCreatedOrUpdateSucess = true;
        this.dialogRef.close({ isCreatedOrUpdateSucess: this.isCreatedOrUpdateSucess });
      }
    }, error => {
      if (error.error.name) {
        this.validName = false;
        this.msgValidName = error.error.name;

      }
    })
  }

  updateCareer(id: string, career: Career) {
    this.careerService.updateCareer(id, career).subscribe(response => {
      if (response) {
        this.isCreatedOrUpdateSucess = true;
        this.dialogRef.close({ isCreatedOrUpdateSucess: this.isCreatedOrUpdateSucess });
      }
    }, error => {
      if (error.error.name) {
        this.validName = false;
        this.msgValidName = error.error.name;
      }
    })
  }
}
