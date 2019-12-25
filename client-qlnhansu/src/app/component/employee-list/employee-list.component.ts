import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatDialog, PageEvent, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { EmployeeModalConfirmDeleteComponent } from '../employee-modal-confirm-delete/employee-modal-confirm-delete.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

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
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(ToastrService) private toastr: ToastrService,
    @Inject(MatDialog) private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.initData();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  initData() {
    this.employeeService.getPageEmployee(0, this.pageSizeOptions[1]).subscribe(
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
    this.employeeService.getPageEmployee(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
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
    this.employeeService.getPageEmployeeSorted(this.pageEvent.pageIndex, this.pageEvent.pageSize, propertiesSort, typeSort).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res.content);
        this.pageSize = res.size;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    )
  }

  openModalCreateEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '450px',
      data: { tittle: 'Thêm mới nhân viên', employee: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isCreatedOrUpdateSucess == true) {
        this.totalRecords += 1;
        this.reloadData();
        this.toastr.success("Thêm nhân viên thành công!");
        if (this.sizeOfPage == this.pageSize) {
          this.pageEvent.pageIndex += 1;
          this.pageEvent.previousPageIndex += 1;
        }
      }
    });
  }

  openModalUpdateEmployee(emp: Employee) {
    let id: string = emp.id;
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '450px',
      data: { tittle: 'Sửa nhân viên', employee: emp }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isCreatedOrUpdateSucess == true) {
        this.reloadData();
        this.toastr.success("Cập nhật viên thành công!");
      }
    });
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
      if (this.sorted === false && this.search == false) {
        this.employeeService.getPageEmployee(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
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
        this.searchEmployeeByFirstName();
      }
    }
  }

  searchEmployeeByFirstName() {
    this.search = true;
    this.employeeService.searchEmployeeByFirstName(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.keywordSearch).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Employee>(res.content);
        this.sizeOfPage = res.content.length;
        this.totalRecords = res.totalElements;
      }, error => {
        this.toastr.error("Có lỗi xảy ra!")
      }
    )
  }
}
