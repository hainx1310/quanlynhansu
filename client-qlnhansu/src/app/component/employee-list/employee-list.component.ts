import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  // khai bao bien
  private tittle: string = 'Danh sách nhân viên';
  private dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['select', 'fullName', 'age', 'sex', 'email'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Employee>(true, []);
  employee: Employee;

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
        this.dataSource = new MatTableDataSource<Employee>(res);
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
      width: '250px',
      data: { tittle: 'Thêm mới nhân viên', employee: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.employee = result;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
