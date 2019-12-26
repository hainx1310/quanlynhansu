import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/model/Employee';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  // khai bao bien
  private employee: Employee;
  private employeeId;

  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(ActivatedRoute) private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.initData();
  }

  initData() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(res => {
      this.employee = res;
    }, error => {

    });
  }
}
