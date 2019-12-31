import { Component, OnInit, ViewChild, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, PageEvent, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { EmployeeModalConfirmDeleteComponent } from '../employee-modal-confirm-delete/employee-modal-confirm-delete.component';
import { CareerService } from 'src/app/services/career.service';

@Component({
  selector: 'app-employee-list-add-to-career',
  templateUrl: './employee-list-add-to-career.component.html',
  styleUrls: ['./employee-list-add-to-career.component.css']
})
export class EmployeeListAddToCareerComponent implements OnInit {

  // khai bao bien
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
  private careerIds: string = "5e04213b0472403c5cfb9bac";
  @ViewChild(MatSort) sort: MatSort;
  @Input() careerId: string;
  @Output() btnAddEmployeeClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(ToastrService) private toastr: ToastrService,
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(CareerService) private careerService: CareerService,
  ) { }

  ngOnInit() {
    this.initData();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  initData() {
    this.employeeService.getPageEmployeeAddToCareer(0, this.pageSizeOptions[1], this.careerId).subscribe(
      res => {
        this.totalRecords = res.totalElements;
        this.pageSize = res.size;
        this.sizeOfPage = res.content.length;
        this.dataSource = new MatTableDataSource<Employee>(res.content);
        this.dataSource.sort = this.sort;
      },
      error => {
        if (error) {
          console.log(error);
        }
      });
  }

  reloadData() {
    this.employeeService.getPageEmployeeAddToCareer(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.careerId).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res.content);
        this.pageSize = res.size;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    )
  }

  sortData(propertiesSort: string, typeSort: string) {
    this.sorted = true;
    this.propertieSort = propertiesSort;
    this.employeeService.getPageEmployeeSortedAddToCareer(this.pageEvent.pageIndex, this.pageEvent.pageSize, propertiesSort, typeSort, this.careerId).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res.content);
        this.pageSize = res.size;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    )
  }

  openModalConfirmDeleteEmployee(id: string, firstName: string, lastName: string) {
    const dialogRef = this.dialog.open(EmployeeModalConfirmDeleteComponent, {
      width: '450px',
      data: { tittle: 'Xác nhận xóa', name: lastName + ' ' + firstName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isDelete === true) {
        this.deleteEmployee(id);
      }
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(response => {
      if (response) {
        if (this.sizeOfPage == 1 && this.pageEvent.pageIndex > 0) {
          this.pageEvent.pageIndex -= 1;
          if (this.pageEvent.previousPageIndex > 0) {
            this.pageEvent.previousPageIndex -= 1;
          }
        }
        this.pageEvent.length -= 1;
        this.totalRecords -= 1;
        this.swapPage(this.pageEvent);
        this.toastr.success("Xóa nhân viên thành công!");
      }
    }, error => {
      console.log(error);

    })
  }

  swapPage(event) {
    if (event) {
      this.pageEvent = event;
      console.log(this.pageEvent);
      console.log('this.sorted');
      console.log(this.search);
      
      if (this.sorted === false && this.search == false) {
        console.log(this.pageEvent.pageSize);
        
        this.employeeService.getPageEmployeeAddToCareer(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.careerId).subscribe(
          res => {
            this.dataSource = new MatTableDataSource<Employee>(res.content);
            this.sizeOfPage = res.content.length;
          }, error => {
            console.log(error);
          }
        )
      } else if (this.sorted == true && this.search == false) {
        this.sortData(this.propertieSort, this.typeSort);
      } else if (this.search == true) {
        this.searchEmployeeByFirstNameAddToCareer();
      }
    }
  }

  searchEmployeeByFirstNameAddToCareer() {
    this.search = true;
    this.employeeService.searchEmployeeByFirstNameAddToCareer(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.keywordSearch, this.careerId).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res.content);
        this.sizeOfPage = res.content.length;
        this.totalRecords = res.totalElements;
      }, error => {
        this.toastr.error("Có lỗi xảy ra!")
      }
    )
  }

  addEmployeeToCareer(employeeId: string) {
    console.log(employeeId);
    this.careerService.addEmployeeToCareer(employeeId, this.careerId).subscribe(res => {
      this.btnAddEmployeeClick.emit(true);
      this.initData();
      this.toastr.success("Thêm thành công!");
    });
  }
}
