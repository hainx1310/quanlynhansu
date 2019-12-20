import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
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
  private dataSource = new MatTableDataSource<any>();
  private displayedColumns: string[] = ['select', 'fullName', 'age', 'sex', 'email', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private selection = new SelectionModel<Employee>(true, []);
  private employee: Employee;
  private pageSize: number;
  private pageIndex: number;

  constructor(
    @Inject(EmployeeService) private employeeService: EmployeeService,
    @Inject(NgbModal) private modalService: NgbModal,
    @Inject(ToastrService) private toastr: ToastrService,
    @Inject(MatDialog) private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.employeeService.getAllEmployees().subscribe(
      res => {
        this.dataSource = new MatTableDataSource<any>(res);
        console.log("this.dataSource");
        console.log(this.dataSource);
        this.pageSize = res.content.length;
        console.log(this.pageSize);
        console.log("this.dataSource.paginator");
        console.log(this.dataSource.paginator);
        
        this.dataSource.paginator = this.paginator;
      },
      error => {
        if (error) {
          console.log(error);
        }
      });
  }

  openModalCreateEmployee(): void {
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '450px',
      data: { tittle: 'Thêm mới nhân viên', employee: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveEmployee(result);
    });
  }

  openModalUpdateEmployee(emp: Employee) {
    let id: string = emp.id;
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '450px',
      data: { tittle: 'Sửa nhân viên', employee: emp }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateEmployee(id, result);
    });
  }

  openModalConfirmDeleteEmployee(id: string, firstName: string, lastName: string) {

    const dialogRef = this.dialog.open(EmployeeModalConfirmDeleteComponent, {
      width: '450px',
      data: { tittle: 'Xác nhận xóa', name: lastName + ' ' + firstName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isDelete === true) {
        console.log('call delete');
        this.deleteEmployee(id);
      }
    });
  }

  saveEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe(response => {
      if (response) {
        this.reloadData();
        this.toastr.success("Thêm nhân viên thành công!");
      }
    }, error => {
      console.log(error);

    })
  }

  updateEmployee(id: string, employee: Employee) {
    this.employeeService.updateEmployee(id, employee).subscribe(response => {
      if (response) {
        this.reloadData();
        this.toastr.success("Cập nhật nhân viên thành công!");
      }
    }, error => {
      console.log(error);

    })
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(response => {
      if (response) {
        this.reloadData();
        this.toastr.success("Xóa nhân viên thành công!");
      }
    }, error => {
      console.log(error);

    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.pageSize;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.dataSource.data.length + 1}`;
  }
}
