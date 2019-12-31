import { Component, OnInit, Inject, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Career } from 'src/app/model/Career';
import { CareerService } from 'src/app/services/career.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, PageEvent, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.css']
})
export class CareerDetailsComponent implements OnInit {

  // khai bao bien
  private career: Career;
  private careerId;
  private isShow = false;
  private tittle: string = 'Danh sách nhân viên';
  private dataSource = new MatTableDataSource([]);
  private displayedColumns: string[] = ['fullName', 'age', 'sex', 'email', 'action'];
  private selection = new SelectionModel<Employee>(true, []);
  private pageSize: number = 0;
  private sizeOfPage: number = 0;
  private pageIndex: number = 0;
  private pageSizeOptions: number[] = [2, 5, 10, 15];
  private pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
    previousPageIndex: 0
  };
  private totalRecords: number = 0;
  private sorted = false;
  private typeSort: string = "true";
  private propertieSort = "null";
  private search = false;
  private keywordSearch = "";
  @ViewChild(MatSort) sort: MatSort;
  @Input() btnAddEmployeeClick: EventEmitter<boolean>;

  constructor(
    @Inject(CareerService) private careerService: CareerService,
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(ActivatedRoute) private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.careerId = this.route.snapshot.paramMap.get('id');
    this.initData();
  }

  initData() {
    this.careerService.getCareerById(this.careerId).subscribe(res => {
      console.log('1')
      this.pageSize = this.pageSizeOptions[1];
      this.career = res;
      this.employeeService.getPageEmployeeByCareerIds(0, this.pageSize, this.careerId).subscribe(resEmp => {
        this.totalRecords = resEmp.totalElements;
        console.log('asasasas');
        console.log(resEmp);
        this.sizeOfPage = resEmp.numberOfElements;
        this.dataSource = new MatTableDataSource<Employee>(resEmp.content);
        this.dataSource.sort = this.sort;
      });
    }, error => {

    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  swapPage(event) {
    if (event) {
      this.pageEvent = event;
      if (this.sorted === false && this.search == false) {
        this.employeeService.getPageEmployeeByCareerIds(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.career.id).subscribe(
          res => {
            this.dataSource = new MatTableDataSource<Employee>(res.content);
            this.sizeOfPage = res.content.length;
          }, error => {
            console.log(error);
          }
        )
      } else if (this.sorted == true && this.search == false) {
        // this.sortData(this.propertieSort, this.typeSort);
      } else if (this.search == true) {
        // this.searchEmployeeByFirstNameAddToCareer();
      }
    }
  }
}
