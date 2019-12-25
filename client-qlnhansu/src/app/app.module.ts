import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeModalComponent } from './component/employee-modal/employee-modal.component';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyNavComponent } from './my-nav/my-nav/my-nav.component';
import { APP_BASE_HREF } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCheckboxModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatPaginatorIntl, MatDatepicker, MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatTableModule, MatSortModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { EmployeeModalConfirmDeleteComponent } from './component/employee-modal-confirm-delete/employee-modal-confirm-delete.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeModalComponent,
    EmployeeDetailsComponent,
    MyNavComponent,
    EmployeeModalConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSortModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EmployeeModalComponent,
    EmployeeModalConfirmDeleteComponent
  ]
})
export class AppModule { }
