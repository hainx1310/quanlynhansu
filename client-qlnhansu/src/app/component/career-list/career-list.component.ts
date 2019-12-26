import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, PageEvent, MatSort, MatDialog } from '@angular/material';
import { Career } from 'src/app/model/Career';
import { SelectionModel } from '@angular/cdk/collections';
import { CareerService } from 'src/app/services/career.service';
import { ToastrService } from 'ngx-toastr';
import { CareerModalComponent } from '../career-modal/career-modal.component';
import { CareerConfirmDeleteComponent } from '../career-confirm-delete/career-confirm-delete.component';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {

  // khai bao bien
  private tittle: string = 'Danh sách nghề nghiệp';
  private dataSource = new MatTableDataSource([]);
  private displayedColumns: string[] = ['name', 'action'];
  private selection = new SelectionModel<Career>(true, []);
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
    @Inject(CareerService) private careerService: CareerService,
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
    this.careerService.getPageCareer(0, this.pageSizeOptions[1]).subscribe(
      res => {
        console.log(res);
        
        this.totalRecords = res.totalElements;
        this.pageSize = res.size;
        this.sizeOfPage = res.content.length;
        this.dataSource = new MatTableDataSource<Career>(res.content);
        this.dataSource.sort = this.sort;
      },
      error => {
        if (error) {
          console.log(error);
        }
      });
  }

  reloadData() {
    this.careerService.getPageCareer(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Career>(res.content);
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
    this.careerService.getPageCareerSorted(this.pageEvent.pageIndex, this.pageEvent.pageSize, propertiesSort, typeSort).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Career>(res.content);
        this.pageSize = res.size;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      }
    )
  }

  openModalCreateCareer(): void {
    const dialogRef = this.dialog.open(CareerModalComponent, {
      width: '450px',
      data: { tittle: 'Thêm mới nghề nghiệp', career: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isCreatedOrUpdateSucess == true) {
        this.totalRecords += 1;
        this.reloadData();
        this.toastr.success("Thêm nghề nghiệp thành công!");
        if (this.sizeOfPage == this.pageSize) {
          this.pageEvent.pageIndex += 1;
          this.pageEvent.previousPageIndex += 1;
        }
      }
    });
  }

  openModalUpdateCareer(career: Career) {
    let id: string = career.id;
    const dialogRef = this.dialog.open(CareerModalComponent, {
      width: '450px',
      data: { tittle: 'Sửa nghề nghiệp', career: career }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isCreatedOrUpdateSucess == true) {
        this.reloadData();
        this.toastr.success("Cập nhật nghề nghiệp thành công!");
      }
    });
  }

  openModalConfirmDeleteCareer(id: string, name: string) {
    const dialogRef = this.dialog.open(CareerConfirmDeleteComponent, {
      width: '450px',
      data: { tittle: 'Xác nhận xóa', name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isDelete === true) {
        this.deleteCareer(id);
      }
    });
  }

  deleteCareer(id: string) {
    this.careerService.deleteCareer(id).subscribe(response => {
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
        this.toastr.success("Xóa nghề nghiệp thành công!");
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
        this.careerService.getPageCareer(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
          res => {
            this.dataSource = new MatTableDataSource<Career>(res.content);
            this.sizeOfPage = res.content.length;
          }, error => {
            console.log(error);
          }
        )
      } else if (this.sorted == true && this.search == false) {
        this.sortData(this.propertieSort, this.typeSort);
      } else if (this.search == true) {
        this.searchCareerByName();
      }
    }
  }

  searchCareerByName() {
    this.search = true;
    this.careerService.searchCareerByName(this.pageEvent.pageIndex, this.pageEvent.pageSize, this.keywordSearch).subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Career>(res.content);
        this.sizeOfPage = res.content.length;
        this.totalRecords = res.totalElements;
      }, error => {
        this.toastr.error("Có lỗi xảy ra!")
      }
    )
  }

}
